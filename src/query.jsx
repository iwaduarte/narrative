import axios from "axios";
import useSWR from "swr";
import React from "react";

const URL = "https://63869a4ee399d2e473e9e513.mockapi.io/maritime";

const methods = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, data) => axios.post(url, data).then((res) => res.data),
  put: (url, data) => axios.put(url, data).then((res) => res.data),
  destroy: (url) => axios.delete(url).then((res) => res.data),
};

const getData = (url) => {
  const { data, error } = useSWR(`${URL}${url}`, methods.get);
  return { data, hasError: error };
};
const updateData = (url, data) => {
  const update = methods.put;
  return update(`${URL}${url}`, data);
};

const createData = (url, data) => {
  const post = methods.post;
  return post(`${URL}${url}`, data);
};

const deleteData = (url) => {
  const destroy = methods.destroy;
  return destroy(`${URL}${url}`);
};
export { getData, createData, deleteData, updateData };
