export const ERROR_CODES = {
  NO_NETWORK: 'ECONNABORTED',
  UNAUTHORIZED: 401,
  TOO_MANY_REQUESTS: 429,
  UNPROCESSABLE_CONTENT: 422,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404
} as const

export interface CommonResponseError {
  message: string;
}

export const ERRORS: Record<string | number, CommonResponseError> = {
  [ERROR_CODES.NO_NETWORK]: { message: "Отсутствует подключение к интернету" },
  [ERROR_CODES.UNAUTHORIZED]: { message: "Неавторизованн" },
  [ERROR_CODES.TOO_MANY_REQUESTS]: { message: "Слишком много запросов" },
  [ERROR_CODES.UNPROCESSABLE_CONTENT]: { message: 'Некорректный запрос' },
  [ERROR_CODES.METHOD_NOT_ALLOWED]: { message: 'Неразрешённый метод запроса' },
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: { message: 'Ошибка сервера' },
  [ERROR_CODES.NOT_FOUND]: { message: 'Ресурс не найден' }
} as const
