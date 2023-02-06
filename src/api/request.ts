import { useState } from 'react';
import axios from 'axios';
import { apiMap } from './index';
const instance = axios.create({
  // baseURL:'https://service-374y6w75-1308368140.sh.apigw.tencentcs.com/release/',
  baseURL: 'http://127.0.0.1:9000',
  method: 'post',
});
const request = (path: string, params = {}) => {
  return instance.post(path, params);
};
export const useRequest = (name: keyof typeof apiMap) => {
  const [loading, setLoading] = useState(false);
  const { path } = apiMap[name];
  const run = (params) => {
    return new Promise((resolve, reject) => {
      request(path, params)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          setLoading(true);
        });
    });
  };
  return {
    run,
    loading,
  };
};
