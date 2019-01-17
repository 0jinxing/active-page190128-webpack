const axios = require("axios");

const baseURL = (process.env.NODE_ENV === "production" ? "https://server.wenliaokeji.com" : "/api");

const client = axios.create({ baseURL });