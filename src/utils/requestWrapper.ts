import type { Ref } from "vue";


export function requestWrapper<T>(loadingFlag: Ref<Boolean>, request: () => Promise<T>) {
  loadingFlag.value = true
  return request()
    .catch(error => {
      const errorText = "Ошибка: " + error
      console.error(errorText);
      throw Error(errorText)
    })
    .finally(() => loadingFlag.value = false)
}
