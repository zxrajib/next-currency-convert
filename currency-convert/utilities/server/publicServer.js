import axios from 'axios'

const publicServer =  axios.create({
  baseURL: process.env.SERVER_URL_V
});

export default publicServer;
