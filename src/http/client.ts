import { axiosClient, handleAxiosError } from "./axiost.ts"

// Типы работающие на основе схемы api
// при использовании в методах клиента можно заменить (url: string) на (url: Operations[<метод>])

// type Methods = Exclude<{
//     [K in keyof paths]: keyof paths[K]
// }[keyof paths], "parameters">


// type UrlsOfMethod<T extends Methods> = {
//     [K in keyof paths]: T extends keyof paths[K] ? (paths[K][T] extends undefined ? never : K) : never
// }[keyof paths];

// type Operations = {
//     [METHOD in Methods]: UrlsOfMethod<METHOD>
// }

const client = {
  get(url: string, params: Record<string, unknown> = {}) {
    return handleAxiosError(() => axiosClient.get(url, {
      ...params
    }).then(response => response.data))
  },
  post(url: string, body: Record<string, unknown> | FormData | Array<unknown>, headers: Record<string, string> = {}) {
    return handleAxiosError(() => axiosClient.post(url, body, {
      headers: {
      ...axiosClient.defaults.headers.common,
      ...headers,
      }}).then(response => response.data))
  },
  put(url: string, body: Record<string, unknown> | FormData | Array<unknown>, headers: Record<string, string> = {}) {
    return handleAxiosError(() => axiosClient.put(url, body, {
      headers: {
        ...axiosClient.defaults.headers.common,
        ...headers,
      }}).then(response => response.data))
  },
  patch(url: string, body: Record<string, unknown> | Array<unknown> | FormData, headers: Record<string, string> = {}) {
    return handleAxiosError(() => axiosClient.patch(url, body, {
      headers: {
        ...axiosClient.defaults.headers.common,
        ...headers,
      }}).then(response => response.data))
  },
  delete(url: string) {
    return handleAxiosError(() => axiosClient.delete(url).then(response => response.data))
  },
  addHeaders(headers: Record<string, string>) {
    Object.entries(headers).forEach(([key, value]) => {
      axiosClient.defaults.headers.common[key] = value;
    })
  },
  removeHeaders(headerKeys: string[]) {
    headerKeys.forEach((key) => {
      delete axiosClient.defaults.headers.common[key];
    });
  }
}

export default client
