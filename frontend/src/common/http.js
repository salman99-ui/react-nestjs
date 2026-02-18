import Axios from "axios";

const ApiServer = Axios.create({
  timeout: 60000,
});

ApiServer.interceptors.request.use(
  function (config) {
    config.headers["X-USER-ID"] = "ID-999901";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

ApiServer.interceptors.response.use(function (response) {
  return response;
});

class ApiRequest {
  static post(url, reqBody) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiServer.post(
          `${process.env.REACT_APP_API_URL}${url}`,
          reqBody,
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static put(url, reqBody) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiServer.put(
          `${process.env.REACT_APP_API_URL}${url}`,
          reqBody,
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async get(url, configs) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiServer.get(
          `${process.env.REACT_APP_API_URL}${url}`,
          configs,
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ApiRequest;
