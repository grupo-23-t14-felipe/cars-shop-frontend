import axios from "axios";

export const api = axios.create({
  baseURL: "https://group23-t14-felipe.onrender.com",
  timeout: 5000
});
