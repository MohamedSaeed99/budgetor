import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log("this is another test")
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
  
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');

                const { data } = await api.post('/refresh', {"refresh_token": refreshToken});

                localStorage.setItem('access_token', data["access_token"]);
                api.defaults.headers.common['Authorization'] = `Bearer ${data["access_token"]}`;
                
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
  
export default api;