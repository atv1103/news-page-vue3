<script setup lang="ts">
import { randomNumber } from "../../helpers";
import { useNewsStore } from "../../stores/store";
import Icon from "./Icon.vue";
import { ButtonType, IconType } from "../../stores/models";
const store = useNewsStore();

interface Props {
  type?: ButtonType;
  icon?: IconType;
}
const { type, icon } = defineProps<Props>();

const emit = defineEmits<{
  (e: "rerenderComponent"): void;
}>();

async function getState(pageNumber: number, type?: ButtonType) {
  switch (type) {
    case "first":
      store.getNewsState(pageNumber, { color: "#378b60", svg: "pig" });
      break;
    case "second":
      store.getNewsState(pageNumber, { color: "#ff00b8", svg: "ligtning" });
      break;
    case "third":
      store.getNewsState(pageNumber, { color: "#fb9600", svg: "fire" });
      break;
    default:
      store.getNewsState(pageNumber, { color: "#fff", svg: "pig" });
  }
}
</script>

<template>
  <button
    @click="getState(randomNumber(1, 10), type)"
    class="button"
    :class="{
      first: type === 'first',
      second: type === 'second',
      third: type === 'third',
    }"
  >
    <slot></slot>
    <span v-if="icon" class="button__icon">
      <Icon v-if="icon" :type="icon" />
    </span>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  padding: 16px 32px;
  border-radius: 36px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--background);
  transition: all 0.3s ease;
  cursor: pointer;
}
.button__icon {
  margin: 0 0 0 10px;
  transform: translateY(10%);
}
.first {
  background: var(--first-btn-color);
}
.first:hover {
  background: var(--first-btn-hover-color);
}
.second {
  background: var(--second-btn-color);
}
.second:hover {
  background: var(--second-btn-hover-color);
}
.third {
  background: var(--third-btn-color);
}
.third:hover {
  background: var(--third-btn-hover-color);
}

@media (max-width: 582px) {
  .third {
    grid-column: span 2;
  }
}
</style>
