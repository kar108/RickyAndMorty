import {API} from '../utils/http';

function GetEpisodes(url:String) {
  return API.get(`${url}`);
}

export {GetEpisodes};