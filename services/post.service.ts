import axios from "axios";
export function postArticle(payload: any) {
    const token = window.localStorage.getItem("token");

    return axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/v1/post", payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export function getMyArticles(params: any) {
    const token = window.localStorage.getItem("token");

    return axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/v1/my-posts", {
        headers: {
            Authorization: "Bearer " + token,
        },
        params,
    });
}

export function getArticleDetail(slug: string) {
    return axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/v1/post/" + slug);
}
export function getArticleDetailID(id: string) {
    const token = window.localStorage.getItem("token");
    return axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/v1/post/" + id + "/id", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}
