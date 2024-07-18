import { http } from "../utils/http";
function GetNews(key: any,page:number){
    return http.get(`news/ann/recent-feeds`);
}
  
export {GetNews}