import axios from "axios";
import { API, baseURL } from "../axios";
import { SignInRequest, SignInResponse } from "./model";

//엑세스 토큰 발급
export const getAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post(`${baseURL}/sign/newAc`, undefined, {
    headers: {
      Authorization: refreshToken ? `Bearer ${refreshToken}` : undefined,
    },
  });

  await localStorage.setItem("accessToken", response.data.data.accessToken);

  return response.data.data.accessToken;
};

//초비상 리프레쉬 토큰 발급
export const getNewRefreshToken = async () => {
  const response = await API.post(`test`);

  return response.data;
};

// 로그인 (토큰 저장 X, 순수 API 요청만)
// export const signIn = async (data: SignInRequest) => {
//   const response = await API.post<SignInResponse>(`${rest.post.signin}`, data);
//   return response.data;
// };
