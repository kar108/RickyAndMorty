import {API} from '../utils/http';

function GetLocationDetails(url:String) {
  return API.get(`${url}`);
}

export {GetLocationDetails};
