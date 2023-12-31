import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:8085";
const API_GOONG_KEY = import.meta.env.VITE_GOONG_API_KEY;

export const userSignUp = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/signup`, data);
    console.log(res);
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const sendConfirmCode = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/confirmCode`, data);
    return res;
  } catch (err) {
    return err;
  }
};

export const userSignIn = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/signin`, data);
    return res;
  } catch (err) {
    return err;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/getCurrentUser`, {
      headers: {
        Authorization: cookie.load("token"),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const updateUser = async (userId, data) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/users/${userId}/updateUser`,
      data,
      {
        headers: {
          Authorization: cookie.load("token"),
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getProvinces = async (depth: number) => {
  try {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/p/?depth=${depth}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getDistrictsByProvinceCode = async (
  provincesCode: string,
  depth: number
) => {
  try {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/p/${provincesCode}/?depth=${depth}`
    );
    return res;
  } catch (err) {
    return err;
  }
};
export const getWardsByDistrictCode = async (
  districtCode: string,
  depth: number
) => {
  try {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/d/${districtCode}/?depth=${depth}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const ForwardGeocoding = async (data: string) => {
  try {
    const res = await axios.get(
      `https://rsapi.goong.io/geocode?address=${data}&api_key=${API_GOONG_KEY}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getAllUser = async (param?: string, value?: string) => {
  try {
    let res: any;
    if (param) {
      res = await axios.get(`${BASE_URL}/api/users/?${param}=${value}`);
    } else {
      res = await axios.get(`${BASE_URL}/api/users`);
    }
    return res;
  } catch (err) {
    return err;
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getPosts = async (data?: any) => {
  try {
    let params = "";
    if (data !== null)
      for (const field in data) {
        params += field + "=" + data[field] + "&";
      }
    const res = await axios.get(`${BASE_URL}/api/posts/?${params}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getDetailPost = async (data: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/posts/${data}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const PlaceSearch = async (input: string) => {
  try {
    const res = await axios.get(
      `https://rsapi.goong.io/Place/AutoComplete?api_key=${API_GOONG_KEY}&input=${input}&limit=5`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getPlaceDetailById = async (id: string) => {
  try {
    const res = await axios.get(
      `https://rsapi.goong.io/Place/Detail?place_id=${id}&api_key=${API_GOONG_KEY}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getCommentByPost = async (postId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/comments/${postId}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const endpoints = {
  "send_notification": `/api/notifications/create/`,
  "get_notifications":(userId: string) =>  `/api//notifications/${userId}`,
  "posts_by_user": (userId: string) => `/api/posts/manage/${userId}`
}

export const authApis = () => {
  return axios.create({
     baseURL: BASE_URL,
     headers: {
      "Authorization": cookie.load("token")
     }
  })
}

export default axios.create({
  baseURL: BASE_URL
})

