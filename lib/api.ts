import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

interface ssrAPIProps {
  baseURL?: string;
  ctx?: any;
}
function ssrAPI({
  ctx = undefined,
  baseURL = process.env.NEXT_PUBLIC_API_URL,
}: ssrAPIProps) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: cookies['bet.token'] ? `Bearer ${cookies['bet.token']}` : '',
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (cookies['bet.token'] && error.response?.status === 401) {
        destroyCookie(undefined, 'bet.token', {
          path: '/'
        })

        delete api.defaults.headers["Authorization"];

        window.location.href = "/"
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const api = ssrAPI({});