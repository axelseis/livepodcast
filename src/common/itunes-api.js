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

function setCachedPodcastFeedUrl(podcastId,feedUrl){
  const cachedPodcasts = JSON.parse(localStorage.getItem('podcastsFeed') || '{"timestamp":0,"entry":[]}');
  const timestamp = cachedPodcasts.timestamp;
  const entry = cachedPodcasts.entry;
  
  entry.find(
    podcast => podcast.id.attributes['im:id'] === podcastId
  ).__feedUrl = feedUrl;
  
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
  return getPodcastFeedUrl(podcastId).then(feedUrl => {
    return axios.get(`https://cors-anywhere.herokuapp.com/${feedUrl}`).then(response => response);
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
          setCachedPodcastFeedUrl(podcastId,feedUrl)
          return feedUrl;
        },
        error => console.log('error', error)
      );
    }
  })
}

