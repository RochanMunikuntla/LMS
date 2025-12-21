import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/languages',
  headers: {
    'x-rapidapi-key': 'a21a6beb6dmshae249de830a0beep133a8bjsn110098be2aa4',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}