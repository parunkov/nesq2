<script setup lang="ts">
import type { Event } from '@/types/events.ts'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from 'vue'

const title = defineModel<Event['name']>('title')

const quillEditor = ref()

const handleTextChange = () => {
  if (quillEditor.value) {
    const htmlContent = quillEditor.value.getHTML()

    console.log('🖋️ QuillEditor содержимое изменено:')
    console.log('📝 HTML:', htmlContent)
  }
}
</script>

<template>
  <div class="content-card">
    <div class="content-card__inner">
      <div class="content-card__head">
        <h3 class="content-card__title">Контент</h3>
      </div>

      <div class="content-card__body">
        <div class="form-group">
          <div class="form-block">
            <div class="form-item">
              <label for="" class="form-item__label">Название*</label>

              <input type="text" class="field" v-model="title" placeholder=" " />
            </div>
          </div>

          <div class="form-block">
            <div class="form-item">
              <label for="" class="form-item__label">Описание</label>

              <QuillEditor ref="quillEditor" @textChange="handleTextChange" placeholder="Введите описание события..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/helpers' as *;

.field {
  display: block;
  width: 100%;
  padding: vw(10) 0;
  border: vw(1) solid var(--color-gray-300);
  border-radius: vw(10);
  font-weight: 400;
  font-size: vw(18);
  line-height: 1.11;
  color: var(--color-black);
  background: var(--color-gray-100);

  transition:
    border-color 0.33s ease,
    background 0.33s ease;

  @media (max-width: 991px) {
    box-sizing: border-box;
    padding: vw(15, $mobile) vw(20, $mobile);
    border-radius: vw(15, $mobile);
    font-size: vw(20, $mobile);
    line-height: vw(30, $mobile);
    width: 100%;
  }

  &::placeholder {
    color: var(--color-gray-700);
    font-size: inherit;
  }

  &:focus,
  &:has(input:focus) {
    border-color: var(--color-primary-700);
  }

  &--textarea {
    min-height: vw(120);
  }
}

:is(input, textarea).field:not(:placeholder-shown),
.field:has(input:not(:placeholder-shown)) {
  background: var(--color-white);
}

textarea {
  outline: none;
  /* Убрать стандартную чёрную рамку */
  resize: none;
  /* Запретить растягивание */
  overflow: auto;

  &:focus,
  &:has(input:focus) {
    border-color: var(--color-primary-700);
  }
}

.content-card {
  box-shadow: 0 vw(5) vw(15) 0 rgba(39, 18, 47, 0.1);
  border-radius: vw(20);
  background: var(--color-white);

  @media (max-width: 991px) {
    border-radius: vw(20, $mobile);
  }

  +.content-card {
    margin-top: vw(20);

    @media (max-width: 991px) {
      margin-top: vw(20, $mobile);
    }
  }

  &__head {
    padding: vw(10) vw(20);
    background: var(--color-gray-300);
    border-radius: vw(20) vw(20) 0 0;

    @media (max-width: 991px) {
      padding: vw(15, $mobile) vw(20, $mobile);
      border-radius: vw(20, $mobile) vw(20, $mobile) 0 0;
      border-top: none;
    }
  }

  &__title {
    font-weight: 600;
    font-size: vw(18);
    line-height: 1.67;
    color: var(--color-gray-1000);

    @media (max-width: 991px) {
      font-size: vw(22, $mobile);
      line-height: vw(30, $mobile);
      font-weight: 600;
    }
  }
}

.form-group {
  padding: vw(20);

  @media (max-width: 991px) {
    padding: vw(20, $mobile);
  }

  +.form-group {
    border-top: vw(1) solid var(--color-gray-300);
  }
}

.form-block {
  +.form-block {
    margin-top: vw(10);
  }
}

.form-item {
  &__label {
    display: block;
    margin-bottom: vw(5);
    font-weight: 500;
    font-size: vw(16);
    line-height: 1.56;
    color: var(--color-gray-900);

    @media (max-width: 991px) {
      font-size: vw(18, $mobile);
      line-height: vw(30, $mobile);
      width: 100%;
      margin-bottom: vw(5, $mobile);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
<style lang="scss">
.ql-toolbar {
  background: var(--color-gray-100);
  border-color: var(--color-gray-300);
  border-radius: vw(10) vw(10) 0 0;

  @media (max-width: 991px) {
    border-radius: vw(10, $mobile) vw(10, $mobile) 0 0;
  }
}

.ql-container {
  background: var(--color-gray-100);
  border-color: var(--color-gray-300);
  border-radius: 0 0 vw(10) vw(10);
  height: vw(77);

  @media (max-width: 991px) {
    border-radius: 0 0 vw(10, $mobile) vw(10, $mobile);
    height: vw(160, $mobile);
  }
}

.ql-snow {
  .ql-formats:first-child {
    display: none;
  }
}

.ql-snow.ql-toolbar {
  height: vw(44);
  padding: 0;
  border: vw(1) solid var(--color-gray-300);
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    height: vw(44, $mobile);
    border: vw(1, $mobile) solid var(--color-gray-300);
  }

  button {
    width: vw(28);
    height: vw(24);

    @media (max-width: 991px) {
      width: vw(28, $mobile);
      height: vw(24, $mobile);
    }
  }
}

.ql-container.ql-snow {
  border: vw(1) solid var(--color-gray-300);

  @media (max-width: 991px) {
    border: vw(1, $mobile) solid var(--color-gray-300);
  }
}

.ql-editor {
  font-size: vw(16);
  padding: vw(12) vw(15);

  @media (max-width: 991px) {
    font-size: vw(16, $mobile);
    padding: vw(12, $mobile) vw(15, $mobile);
  }
}
</style>
