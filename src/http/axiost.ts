import axios from "axios";
import { AxiosError } from "axios";
import { ERRORS } from "@/configs/httpErrors";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 *
 * @returns Обработанное сообщение об ошибке
 * @param request
 */
function handleAxiosError<T>(request: () => Promise<T>) {
  return request()
    .catch((error: AxiosError) => {
      if (error.code && error.code in ERRORS)
        throw new Error(`Ошибка запроса: ${ERRORS[error.code].message}`)
      else throw new Error(`Неизвестная ошибка: ${error.code}`)
    })

}

export {
  axiosClient,
  handleAxiosError,
}
