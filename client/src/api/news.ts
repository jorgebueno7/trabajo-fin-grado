import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/news';

export const getAllNews = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getNewById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const postNews = async (news: any) => {
    const response = await axios.post(API_URL, news, { withCredentials: true });
    return response.data;
};

export const putNews = async (id: number, news: any) => {
    const response = await axios.put(`${API_URL}/${id}`, news);
    return response.data;
};

export const deleteNews = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}


