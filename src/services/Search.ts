import {http} from '../utils/http';

function Search(key: any, page: number) {
  return http.get(`anime/gogoanime/${key}?page=${page}`);
}

export {Search};
