import axios from 'axios';

const BASE_URL = 'https://itunes.apple.com';

export {getPodcasts, getPodcastData};

function getPodcasts() {
  const url =  `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
  return axios.get(url).then(response => response.data.feed.entry);
}

function getPodcastData(username) {
  return axios.all([
    axios.get(`${BASE_URL}/users/${username}`),
    axios.get(`${BASE_URL}/users/${username}/orgs`),
  ])
  .then(([user, orgs]) => ({
    user: user.data,
    orgs: orgs.data,
  }));
}
