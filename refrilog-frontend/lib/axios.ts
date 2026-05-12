import axios from "axios";

export const api = axios.create({
  baseURL: "https://refrigestor.onrender.com",
});
