import axios from "axios";
export default axios.create({
  baseURL: "https://guessmusic-heroku.herokuapp.com/"
});