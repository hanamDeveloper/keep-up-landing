// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getAccessToken, getNewRefreshToken } from "./signin/api";
// import { Platform } from "react-native";


export const baseURL = "https://api.keep-up.me";
// export const baseURL = "https://dev-api.keep-up.me";

// 토큰 만료 시간 확인 함수
const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000; // JWT exp는 초 단위
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;

    // 5초 전에 재발급
    return timeUntilExpiry < 5000;
  } catch (error) {
    return true; // 파싱 에러 시 만료된 것으로 간주
  }
};

// 토큰 자동 갱신 함수
const refreshTokenIfNeeded = async (): Promise<string | null> => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  if (isTokenExpiringSoon(token)) {
    try {
      const newToken = await getAccessToken();

      if (newToken?.data?.refreshExpiredSoon) {
        await getNewRefreshToken();
      }

      return newToken;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      return null;
    }
  }

  return token;
};

export const API = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  baseURL: baseURL,
});

// 하나의 request 인터셉터만 사용
API.interceptors.request.use(async (config) => {
  // 토큰 만료 확인 및 자동 갱신
  const token = await refreshTokenIfNeeded();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => {
    // console.log("응답 데이터", response.data);
    return response;
  },
  async (error) => {
    const { config, response } = error;
    // console.log("응답 데이터", response.data);

    // 401 에러 (토큰 만료)
    if (response?.status === 401) {
      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급

        const tokenResponse = await getAccessToken();

        if (tokenResponse?.data?.refreshExpiredSoon) {
          await getNewRefreshToken();
        }

        // 실패했던 요청의 헤더에 새 토큰 설정
        config.headers.Authorization = `Bearer ${tokenResponse}`;
        // 실패했던 요청 다시 실행s
        return API(config);
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었거나 다른 에러
        return Promise.reject(refreshError);
      }
    }

    // 406 에러 (리프레시 토큰 만료)
    if (response?.status === 406) {
      alert("로그인 세션이 만료되었습니다.");

      // userSignOut();
    }

    // toastAlert(response?.data?.message);

    return Promise.reject(error);
  }
);
