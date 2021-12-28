import axios from "axios";

export function postLogin(payload: any) {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/v1/login", payload);
}
export function postRegister(payload: any) {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/v1/register", payload);
}
export function getSitemap() {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/v1/sitemap");
}
