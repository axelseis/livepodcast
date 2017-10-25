import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://itunes.apple.com';
const _loadingState = [];
let _loadingHandler = {};

export {
    getPodcasts,
    getPodcastData,
    getPodcastFeed,
    getEpisodeData,
    setLoadingHandler,
    setLoadingState
};

function setLoadingHandler(handler) {
    _loadingHandler = handler;
}

function setLoadingState(state) {
    state ? (
        _loadingState.push(state)
    ) : (
        _loadingState.pop()
    );

    _loadingHandler(!!_loadingState.length);
};

function setPodcastFeedLS(podcastfeedObj) {
    try {
        localStorage.setItem('podcastsFeed', podcastfeedObj)
    }
    catch (err) {
        console.log('error saving localStorage: ', err)
    }
};

function getPodcasts() {
    const url = `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
    const cachedPodcasts = JSON.parse(localStorage.getItem('podcastsFeed') || '{"timestamp":0,"entry":[]}');

    if (cachedPodcasts && moment().diff(moment(cachedPodcasts.timestamp), 'days') === 0) {
        return new Promise((resolve) => {
            resolve(cachedPodcasts.entry)
        })
    }
    else {
        setLoadingState(true)

        return (
            axios.get(url).then(
                response => {
                    const entry = response.data.feed.entry;
                    const timestamp = new Date().getTime();

                    setLoadingState(false)
                    setPodcastFeedLS(JSON.stringify({
                        entry,
                        timestamp
                    }))

                    return entry
                },
                error => {
                    console.log('error', error)
                    setLoadingState(false)
                }
            )
        )
    }
}

function setCachedPodcastData(podcastId, feedUrl, dataId) {
    const cachedPodcasts = JSON.parse(localStorage.getItem('podcastsFeed'));

    if (cachedPodcasts) {
        const timestamp = cachedPodcasts.timestamp;
        const entry = cachedPodcasts.entry;

        entry.find(
            podcast => podcast.id.attributes['im:id'] === podcastId
        )[dataId] = feedUrl;

        setPodcastFeedLS(JSON.stringify({
            entry,
            timestamp
        }));
    }
}

function getPodcastData(podcastId) {
    return getPodcasts().then(
        podcasts => podcasts.find(
            podcast => podcast.id.attributes['im:id'] === podcastId
        )
    )
}

function getPodcastFeed(podcastId) {
    const getInnerHTML = (tempEl = '') => tempEl.innerHTML || tempEl.innerHTML === '' ? tempEl.innerHTML : tempEl;
    const getFirstChild = (tempEl) => tempEl && tempEl.children ? tempEl.children[0] : '';

    const cleanHTML = (tempEl) => getInnerHTML(tempEl)
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/<img[^>]*>/g,"")
        .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        .replace(/<!--\[CDATA\[(.*?)\]\](-->|>)/g, '$1')
        .replace(/\]\]>/g, '')

    
    const getfeedUrl = (feedEl) => {
        const tempEl = feedEl || document.createElement('div');
        return tempEl.getAttribute('url') || tempEl.getAttribute('href') || '';
    };

    const formatDuration = (dateParam) => {
        const dateStr = dateParam && dateParam.innerHTML ? dateParam.innerHTML : '-';
        const pmom = moment.unix(dateStr);
        return pmom.isValid() ? pmom.format('mm:ss') : dateStr;    
    }

    const formatDate = (dateStr) => {
        const format = 'DD/MM/YYYY';
        const momDate = moment(getInnerHTML(dateStr).replace(/<span>(.*?)<\/span>/g, [moment.ISO_8601,format]))
        return momDate.isValid() ? momDate.format(format) : '-';    
    }

    return getPodcastData(podcastId).then(podcastData => {
        if (podcastData.__feed) {
            return podcastData.__feed
        }
        else {
            setLoadingState(true)

            return getPodcastFeedUrl(podcastId).then(feedUrl => {
                return axios.get(`https://cors-anywhere.herokuapp.com/${feedUrl}`).then(feedData => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = cleanHTML(feedData.data);

                    const isRSSFeed = !!tempDiv.getElementsByTagName('rss').length

                    const feedElements = Array.from(
                            isRSSFeed ? tempDiv.getElementsByTagName('item') :
                            tempDiv.getElementsByClassName('regularitem')
                        )
                        .map((element, index, arr) => {
                            return ({
                                id: arr.length - index,
                                title: cleanHTML(
                                    isRSSFeed ? element.getElementsByTagName('title')[0] :
                                    getFirstChild(element.getElementsByClassName('itemtitle')[0])
                                ),
                                description: cleanHTML(
                                    isRSSFeed ? element.getElementsByTagName('itunes:summary')[0] ||
                                    element.getElementsByTagName('description')[0] :
                                    element.getElementsByClassName('itemcontent')[0]
                                ),
                                date: formatDate(
                                    isRSSFeed ? element.getElementsByTagName('pubdate')[0] :
                                    element.getElementsByClassName('itemposttime')[0]
                                ),
                                duration: ( isRSSFeed ? 
                                    formatDuration(element.getElementsByTagName('itunes:duration')[0]) :
                                    '-'
                                ),
                                url: cleanHTML(getfeedUrl(
                                    isRSSFeed ? element.getElementsByTagName('enclosure')[0] :
                                    getFirstChild(element.getElementsByClassName('podcastmediaenclosure')[0]
                                                || element.getElementsByClassName('mediaenclosure')[0])
                                ))
                            })
                        })

                    setLoadingState(false)
                    setCachedPodcastData(podcastId, feedElements, '__feed')

                    return feedElements;
                });
            })
        }
    })
}

function getPodcastFeedUrl(podcastId) {
    const url = `${BASE_URL}/lookup?id=${podcastId}`;

    return getPodcastData(podcastId).then(podcastData => {
        if (podcastData.__feedUrl) {
            return podcastData.__feedUrl
        }
        else {
            setLoadingState(true)

            return axios.get(url).then(
                response => {
                    const feedUrl = response.data.results[0].feedUrl;

                    //setCachedPodcastData(podcastId,feedUrl,'')
                    setLoadingState(false)

                    return feedUrl;
                },
                error => {
                    console.log('error', error)
                    setLoadingState(false)
                }
            );
        }
    })
}

function getEpisodeData(podcastId, episodeId) {
    return getPodcastFeed(podcastId).then(feed => {
        return feed.find(episode => Number(episode.id) === Number(episodeId))
    })
}