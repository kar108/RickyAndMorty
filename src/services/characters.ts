import {http} from '../utils/http';

function GetCharacters(SearchKey: string, page: number,status:string,species:string,gender:string,) {
  return http.get(`/character?name=${SearchKey}&status=${status}&species=${species}&gender=${gender}&page=${page}`);
}

export {GetCharacters};
