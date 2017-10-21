import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://itunes.apple.com';

export { getPodcasts, getPodcastData, getPodcastFeed };

function getPodcasts() {
  const url = `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
  const cachedPodcasts = JSON.parse(localStorage.getItem('podcastsFeed') || '{"timestamp":0,"entry":[]}');;

  if (moment().diff(moment(cachedPodcasts.timestamp), 'days') === 0) {
    return new Promise((resolve) => {
      resolve(cachedPodcasts.entry)
    })
  }
  else return axios.get(url).then(
    response => {
      const entry = response.data.feed.entry;
      const timestamp = new Date().getTime();
      
      localStorage.setItem('podcastsFeed', JSON.stringify({ entry, timestamp }));
      return entry
    },
    error => console.log('error', error)
  );
}

function setCachedPodcastData(podcastId,feedUrl,dataId){
  const cachedPodcasts = JSON.parse(localStorage.getItem('podcastsFeed') || '{"timestamp":0,"entry":[]}');
  const timestamp = cachedPodcasts.timestamp;
  const entry = cachedPodcasts.entry;
  
  entry.find(
    podcast => podcast.id.attributes['im:id'] === podcastId
  )[dataId] = feedUrl;
  
  localStorage.setItem('podcastsFeed', JSON.stringify({ entry, timestamp }));
}

function getPodcastData(podcastId) {
  return getPodcasts().then(
    podcasts => podcasts.find(
      podcast => podcast.id.attributes['im:id'] === podcastId
    )
  )
}

function getPodcastFeed(podcastId) {
  const cleanHTML = (htmlText = '') => (htmlText.innerHTML || htmlText.innerHTML == '' ? htmlText.innerHTML : htmlText)
  .replace(/<span[^>]*>(.*?)<\/span[^>]*>/g,"")
  .replace( /&lt;!\[CDATA\[(.*?)\]\]&gt;/g, '$1');

  return getPodcastData(podcastId).then(podcastData => {
      if(podcastData.__feed) {
        console.log('CACHE ¡¡¡¡ podcastData.__feed', podcastData.__feed)
      return podcastData.__feed
    }
    else {
      return getPodcastFeedUrl(podcastId).then(feedUrl => {
        return axios.get(`https://cors-anywhere.herokuapp.com/${feedUrl}`).then(feedData => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = feedData.data;
    
          const isRSSFeed = !!tempDiv.getElementsByTagName('rss').length
          console.log('isRSSFeed', isRSSFeed)
          
          const feedElements = Array.from(  
            isRSSFeed ? tempDiv.getElementsByTagName('item') :
            tempDiv.getElementsByClassName('regularitem')
          )
          .map(element => {
            console.log('element', element)
            return ({
              title: cleanHTML(
                isRSSFeed ? element.getElementsByTagName('title')[0]
                : element.getElementsByClassName('itemtitle')[0].children[0]
              ),
              date: cleanHTML(
                isRSSFeed ? element.getElementsByTagName('pubdate')[0]
                : element.getElementsByClassName('itemposttime')[0]
              ),
              duration: cleanHTML(
                isRSSFeed ? element.getElementsByTagName('itunes:duration')[0]
                : '-'
              ),
              url: cleanHTML(
                isRSSFeed ? element.getElementsByTagName('enclosure')[0].getAttribute('url')
                : element.getElementsByClassName('podcastmediaenclosure')[0].children[0].getAttribute('href')
              )
            })
          })
          
          console.log('feedElements', feedElements)
          setCachedPodcastData(podcastId,feedElements,'__feed')
          return feedElements;
        });
      })
    }
  })
}

function getPodcastFeedUrl(podcastId) {
  const url = `${BASE_URL}/lookup?id=${podcastId}`;

  return getPodcastData(podcastId).then(podcastData => {
    if(podcastData.__feedUrl) {
      return podcastData.__feedUrl
    }
    else {
      return axios.get(url).then(
        response => {
          const feedUrl = response.data.results[0].feedUrl;
          setCachedPodcastData(podcastId,feedUrl,'')
          return feedUrl;
        },
        error => console.log('error', error)
      );
    }
  })
}

