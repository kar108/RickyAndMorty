import { http } from '../utils/http';

function LoginApi(payload: any) {
    return http.post(`auth/login`, payload);
}


export { LoginApi };