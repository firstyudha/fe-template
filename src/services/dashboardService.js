import axios from "axios";

const API = 'http://188.166.231.97:8080/api/v1';
const ANALYTICS = "/analytics-data";

export const getAnalytics = async () => {
    try {
        let token = sessionStorage.getItem("auth");
        const response = await axios.get(API+ANALYTICS, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};