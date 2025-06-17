<script lang="ts" setup>
import { defineModel, defineProps, defineEmits, ref, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const model = defineModel<number | string>()

const props = defineProps<{
  placeholder?: string
  disabled?: boolean
  type?: string
  name?: string
  autocomplete?: string
  required?: boolean
  max_length?: number
  validate?: (value: string | number) => string | null
}>()

const emits = defineEmits(['input', 'error'])

const error = ref<string | null>(null)

const validateField = () => {
  if (props.validate && model.value) {
    const result = props.validate(model.value)
    error.value = result
    emits('error', result)
  }
}

// Watch on input change
watch(
  () => model.value,
  () => {
    validateField()
  },
)
</script>

<template>
  <div class="field-wrapper">
    <div class="field" :class="{ 'field--error': !!error }">
      <slot name="left-slot"></slot>
      <input
        v-bind="$attrs"
        v-model="model"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
        :placeholder="props.placeholder || ' '"
        :disabled="props.disabled"
        :type="props.type || 'text'"
        @input="emits('input')"
        @blur="validateField"
        :maxlength="props.max_length"
      />
      <slot name="right-slot"></slot>
    </div>
    <div v-if="error" class="field-error">{{ error }}</div>
  </div>
</template>

<style lang="scss" scoped>
.field-wrapper {
  width: 100%;
}

.field {
  display: inline-flex;
  gap: vw(20);
  width: 100%;
  padding: vw(10);
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

  input {
    width: 100%;
  }

  &--error {
    border-color: var(--color-danger);
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

  @media (max-width: 991px) {
    padding: vw(15, $mobile) vw(20, $mobile);
    border-radius: vw(15, $mobile);
    font-size: vw(20, $mobile);
    line-height: vw(30, $mobile);

    &--textarea {
      min-height: vw(120, $mobile);
    }
  }
}

.field-error {
  margin-top: vw(4);
  font-size: vw(14);
  color: var(--color-danger);

  @media (max-width: 991px) {
    margin-top: vw(4, $mobile);
    font-size: vw(14, $mobile);
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
