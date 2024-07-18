import { http } from "../utils/http";
function AnimePopular(key: any,page:number){
    return http.get(`anime/gogoanime/popular?page=${page}`);
}
  
function MangaPopular(key: any,page: number){
return http.get(`manga/mangapill/popular?page=${page}`);
}

export {AnimePopular,MangaPopular}
  