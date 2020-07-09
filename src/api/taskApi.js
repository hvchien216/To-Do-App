import axiosClient from "./axiosClient";

const taskApi = {
  getAll: () => {
    const url = '/todo';
    return axiosClient.get(url);
  },

  add: (data) => {
    const url = '/todo/create';
    return axiosClient.post(url, { data });
  },
  edit: (id, data) => {
    const url = `/todo/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id) => {
    const url = `/todo/${id}`;
    return axiosClient.delete(url);
  },
}

export default taskApi; 