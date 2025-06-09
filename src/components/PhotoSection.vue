<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Event as EventType } from '@/types/events.ts'
// Максимальное количество изображений
const MAX_IMAGES = 6

const eventImages = defineModel<EventType['images']>()

const images = ref<
  {
    src: string
    file: File | null
  }[]
>(
  eventImages.value
    ? eventImages.value.map((el) => {
        return { src: el, file: null }
      })
    : [],
)
//
// watch(
//   () => eventImages.value,
//   () => {
//     images.value = eventImages.value
//       ? eventImages.value.map((el) => {
//           return { src: 'https://' + el, file: null }
//         })
//       : []
//   },
//   { deep: true, once: true, immediate: false },
// )

const isDragOver = ref(false)

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  const files = Array.from(event.dataTransfer?.files || []).slice(
    0,
    MAX_IMAGES - images.value.length,
  )
  files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        images.value.push({
          src: reader.result as string,
          file,
        })
        updateUploadState()
      }
      reader.readAsDataURL(file)
    }
  })
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  const files = Array.from(input.files).slice(0, MAX_IMAGES - images.value.length)

  files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        images.value.push({
          src: reader.result as string,
          file,
        })
        updateUploadState()
      }
      reader.readAsDataURL(file)
    }
  })
}

// Функция для удаления изображения
const removeImage = (index: number) => {
  images.value.splice(index, 1)
  updateUploadState()
}

// Функция для обновления состояния кнопки загрузки
const updateUploadState = () => {
  const uploadButton = document.querySelector('.form-file__upload-button') as HTMLElement
  if (images.value.length >= MAX_IMAGES) {
    uploadButton.style.opacity = '0'
    uploadButton.style.transform = 'translateY(10px)'
  } else {
    uploadButton.style.opacity = '1'
    uploadButton.style.transform = 'translateY(0)'
  }
}

watch(
  images,
  () => {
    updateUploadState()
    // Только пути (src) сохраняем в модель
    eventImages.value = images.value.map((img) => img.src)
  },
  { deep: true },
)
</script>

<template>
  <div class="content-card">
    <div class="content-card__inner">
      <div class="content-card__head">
        <h3 class="content-card__title">Фото</h3>
      </div>

      <div class="content-card__body">
        <div class="form-group">
          <div class="form-item">
            <label for="imageUpload" class="form-item__label"
              >Загрузите от 1 до 6 фотографий*</label
            >

            <!-- Превью изображений -->
            <div class="form-file__inner">
              <div
                v-for="(image, index) in images"
                :key="index"
                class="form-file__card form-file__preview"
              >
                <img :src="image.src" alt="Preview" class="form-file__preview-img" />
                <button class="form-file__delete-button" @click="removeImage(index)">
                  <img src="/icons/delete.svg" />
                </button>
              </div>

              <div v-if="images.length < 6" class="form-file">
                <div
                  class="form-file__inner"
                  @dragover.prevent="isDragOver = true"
                  @dragleave.prevent="isDragOver = false"
                  @drop.prevent="handleDrop"
                  :class="{ 'form-file--dragover': isDragOver }"
                >
                  <label class="form-file__card form-file__upload-button" for="imageUpload">
                    <input
                      class="form-file__upload-input"
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      @change="handleImageUpload"
                    />
                    <div class="form-file__icon">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.34012 25.9099L13.5858 17.6642C14.0808 17.1692 14.3283 16.9217 14.6137 16.8289C14.8648 16.7474 15.1352 16.7474 15.3863 16.8289C15.6717 16.9217 15.9192 17.1692 16.4142 17.6642L24.6049 25.8549M17.5 18.75L21.0858 15.1642C21.5808 14.6692 21.8283 14.4217 22.1137 14.3289C22.3648 14.2474 22.6352 14.2474 22.8863 14.3289C23.1717 14.4217 23.4192 14.6692 23.9142 15.1642L27.5 18.75M12.5 11.25C12.5 12.6307 11.3807 13.75 10 13.75C8.61929 13.75 7.5 12.6307 7.5 11.25C7.5 9.86929 8.61929 8.75 10 8.75C11.3807 8.75 12.5 9.86929 12.5 11.25ZM8.5 26.25H21.5C23.6002 26.25 24.6503 26.25 25.4525 25.8413C26.1581 25.4817 26.7317 24.9081 27.0913 24.2025C27.5 23.4003 27.5 22.3502 27.5 20.25V9.75C27.5 7.6498 27.5 6.5997 27.0913 5.79754C26.7317 5.09193 26.1581 4.51825 25.4525 4.15873C24.6503 3.75 23.6002 3.75 21.5 3.75H8.5C6.3998 3.75 5.3497 3.75 4.54754 4.15873C3.84193 4.51825 3.26825 5.09193 2.90873 5.79754C2.5 6.5997 2.5 7.6498 2.5 9.75V20.25C2.5 22.3502 2.5 23.4003 2.90873 24.2025C3.26825 24.9081 3.84193 25.4817 4.54754 25.8413C5.3497 26.25 6.3998 26.25 8.5 26.25Z"
                          stroke="#444145"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <span class="form-file__caption">+ Фото</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers' as *;

.form-file--dragover {
  background-color: var(--color-primary-100);
}

.content-card {
  box-shadow: 0 vw(5) vw(15) 0 rgba(39, 18, 47, 0.1);
  border-radius: vw(20);
  background: var(--color-white);

  + .content-card {
    margin-top: vw(20);
  }

  // .content-card__head

  &__head {
    padding: vw(10) vw(20);
    background: var(--color-gray-300);
    border-radius: vw(20) vw(20) 0 0;
  }

  // .content-card__title

  &__title {
    font-weight: 600;
    font-size: vw(18);
    line-height: 1.67;
    color: var(--color-gray-1000);
  }
}

.form-file {
  // .form-file__inner

  &__inner {
    display: flex;
    flex-wrap: wrap;
    gap: vw(20);
  }

  // .form-file__card

  &__card {
    border-radius: vw(10);
    width: vw(200);
    height: vw(200);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include one {
      width: vw(130);
      height: vw(130);
    }
  }

  // .form-file__previews

  // &__previews {
  //   display: flex;
  //   flex-wrap: wrap;

  //   gap: 15px;
  // }

  // .form-file__preview

  &__preview {
    position: relative;
    border: vw(1) solid var(--color-gray-300);
    background: var(--color-gray-100);
  }

  &__preview-img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  // .form-file__delete-button

  &__delete-button {
    position: absolute;
    top: vw(5);
    right: vw(5);
    width: vw(40);
    height: vw(40);
    display: flex;
    justify-content: center;
    align-items: center;
    border: vw(1) solid var(--color-gray-300);
    border-radius: vw(10);
    background: var(--color-white);
  }

  // .form-file__upload-button

  &__upload-button {
    border: vw(2) dashed var(--color-primary-300);
  }

  // .form-file__icon

  &__icon {
    svg {
      display: block;
    }
  }

  // .form-file__caption

  &__caption {
    font-weight: 500;
    font-size: vw(14);
    line-height: 1.43;
    color: var(--color-gray-900);
  }

  // .form-file__upload-input

  &__upload-input {
    display: none;
  }

  // .form-file__alert

  &__alert {
    margin-top: vw(10);
    font-size: vw(14);
    color: var(--color-danger);
  }
}

.form-group {
  padding: vw(20);

  + .form-group {
    border-top: vw(1) solid var(--color-gray-300);
  }
}
</style>
