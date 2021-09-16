import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export function axiosPost(url, data, headers) {
  return axiosInstance.post(url, data, {
    headers,
  })
    .then(response => response.data)
    .catch((err) => {
      throw err;
    });
}

export function axiosGet(url, params, headers) {
  return axiosInstance.get(url, {
    params, headers,
  })
    .then(response => response.data)
    .catch((err) => {
      throw err;
    });
}

export function axiosPut(url, data, headers) {
  return axiosInstance.put(url, data, {
    headers,
  })
    .then(response => response.data)
    .catch((err) => {
      throw err;
    });
}

export function axiosDelete(url, headers) {
  return axiosInstance.delete(url, {
    headers,
  })
    .then(response => response.data)
    .catch((err) => {
      throw err;
    });
}

export function axiosPatch(url, data, headers) {
  return axiosInstance.patch(url, data, {
    headers,
  })
    .then(response => response.data)
    .catch((err) => {
      throw err;
    });
}

export default axiosInstance;
