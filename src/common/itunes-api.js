import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://itunes.apple.com';

export {getPodcasts, getPodcastData};

function getPodcasts() {
  const url =  `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
  const cachedPodcasts = JSON.parse(localStorage.getItem('podcastsFeed')||'{"timestamp":0}');
  
  if(moment().diff(moment(cachedPodcasts.timestamp),'days') === 0){
    return new Promise((resolve) => {
      resolve(cachedPodcasts.entry)
    })
  }
  else return axios.get(url).then(
    response => {
      const entry = response.data.feed.entry;
      const timestamp = new Date().getTime();
      
      localStorage.setItem('podcastsFeed', JSON.stringify({entry,timestamp}));
      return entry
    },
    error => console.log('error', error)
  );
}

function getPodcastData(podcastId) {
  const url =  `${BASE_URL}/lookup?id=${podcastId}`;
  return axios.get(url).then(
    response => response.data.results[0],
    error => console.log('error', error)
  );
}

