import axios from 'axios';
import {http} from '../utils/http';

function Episodes(id: string) {
  return http.get(`anime/gogoanime/info/${id}`);
}
export {Episodes};

function Servers(id: string) {
  return http.get(`anime/gogoanime/servers/${id}`);
}
export {Servers};

function LiveVideo(id: string, name: string) {
  return http.get(`anime/gogoanime/watch/${id}?server=${name}`);
}
export {LiveVideo};

function Populars(id: string, name: string) {
  return http.get(`anime/gogoanime/popular`);
}
export {Populars};
