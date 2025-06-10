export async function urlToFile(url: string, index: number): Promise<File> {
  const response = await fetch(url)
  const blob = await response.blob()
  const extension = blob.type.split('/')[1] || 'jpg'
  return new File([blob], `image_url_${index}.${extension}`, { type: blob.type })
}
