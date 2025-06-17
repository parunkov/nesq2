<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import router from '@/router'
import AppInput from '@/components/AppInput.vue'

const email = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()

const login = () => {
  error.value = ''
  useAuthStore()
    .login(email.value, password.value)
    .then(() => {
      const user = useAuthStore().currentUser
      if (user?.role === 'organizer') router.push({ name: 'organizer-events' })
      else router.push({ name: 'events' })
    })
    .catch((err) => (error.value = err))
}
</script>

<template>
  <div class="content-card">
    <div class="content-card__inner">
      <form @submit.prevent="login" method="POST" class="content-card__body" autocomplete="on">
        <div class="form-group">
          <div class="form-block">
            <div class="form-item">
              <label for="" class="form-item__label">Email</label>
              <AppInput
                v-model="email"
                name="username"
                placeholder="Почта"
                type="email"
                autocomplete="username"
                required
              />
            </div>
          </div>

          <div class="form-block">
            <div class="form-item">
              <label for="" class="form-item__label">Пароль</label>
              <AppInput
                v-model="password"
                name="password"
                placeholder="Пароль"
                type="password"
                autocomplete="current-password"
                required
              />
            </div>
          </div>

          <div v-if="error" class="error">{{ error }}</div>
        </div>
        <AppButton mini class="submit" type="submit">
          {{ authStore.isLoading ? 'Вход...' : 'Войти' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.submit {
  margin-top: vw(20);
  justify-self: center;
}

.error {
  margin-top: vw(20);
  padding: vw(10);
  background-color: var(--color-error);
  border: vw(1) solid var(--color-error-borderr);
  border-radius: vw(10);
}

.content-card {
  box-shadow: 0 vw(5) vw(15) 0 rgba(39, 18, 47, 0.1);
  border-radius: vw(20);
  background: #fff;
  width: vw(460);
  min-height: vw(280);

  + .content-card {
    margin-top: vw(20);
  }

  // .content-card__inner

  &__inner {
    height: 100%;
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
    color: #242125;
  }

  // .content-card__body

  &__body {
    padding: vw(20);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
}

.form-group {
  width: 100%;

  + .form-group {
    border-top: vw(1) solid var(--color-gray-300);
  }
}

.form-item {
  // .form-block__label

  &__label {
    display: block;
    margin-bottom: vw(5);
    font-weight: 500;
    font-size: vw(16);
    line-height: 1.56;
    color: #444145;
  }
}

.dropdown {
  position: relative;

  // .dropdown__trigger

  &--active &__trigger {
    border-color: #9218c0;

    &::after {
      transform: rotate(180deg);
    }
  }

  &__trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: vw(10);
    cursor: pointer;

    &.field {
      background: #fff;
    }

    &::after {
      content: url('data:image/svg+xml,<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="%23444145" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>');
      line-height: 0;
      transition: transform 0.33s ease;
    }
  }

  // .dropdown__wrapper

  &__wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s ease-in-out;

    &[aria-hidden='false'] {
      grid-template-rows: 1fr;
    }
  }

  // .dropdown__inner

  &__inner {
    overflow: hidden;
  }

  // .dropdown__content

  &__content {
    padding-top: vw(8);
  }

  // .dropdown__select-native

  &__select-native {
    position: absolute;
    width: vw(1);
    height: vw(1);
    margin: vw(-1);
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }
}

.dropdown-list {
  border: vw(1) solid var(--color-gray-300);
  border-radius: vw(10);
  background: #fff;
  overflow: hidden;

  // .dropdown-list__item

  &__item {
    cursor: pointer;
    padding: vw(10);

    transition: background 0.33s ease;

    &:hover {
      background: #e39bfd;
    }
  }
}

:is(input, textarea).field:not(:placeholder-shown),
.field:has(input:not(:placeholder-shown)) {
  background: #fff;
}
</style>
