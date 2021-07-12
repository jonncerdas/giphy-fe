import axios from 'axios';
import { ResponseObject } from "../../common/types";
import "../../lib/env"

export function fetchTrendingGIFs(limit: number, offset: number) {
  return new Promise<{ data: ResponseObject }>(async (resolve) => {
      try {
        const response = await axios.get(
          `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=${limit}&offset=${offset}`,
          {
            timeout: 5000
          });
        resolve(response);
      } catch (err) {
        console.error(err);
      }
  });
}

export function searchGIFs(q: string, limit: number, offset: number) {
  return new Promise<{ data: ResponseObject }>(async (resolve) => {
      try {
        const response = await axios.get(
          `http://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${q}&limit=${limit}&offset=${offset}`,
          {
            timeout: 5000
          });
        resolve(response);
      } catch (err) {
        console.error(err);
      }
  });
}

export function translateGIFs(s: string, weirdness: number) {
  return new Promise<{ data: ResponseObject }>(async (resolve) => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://api.giphy.com/v1/gifs/search',
          data: {
            api_key: '',
            s: s,
            weirdness: weirdness,
          },
        });
        resolve(response);
      } catch (err) {
        console.error(err);
      }
  });
}
