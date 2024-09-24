<script setup lang="ts">
import { ref, watch } from "vue";
import Icon from "./Icon.vue";
import { debounce } from "../../helpers";

const searchValue = ref("");

const emit = defineEmits<{
  (e: "filter", searchValue: string): void;
}>();

const update = debounce(() => {
  emit("filter", searchValue.value);
}, 200);

watch(searchValue, () => {
  update();
});
</script>

<template>
  <div class="search">
    <input
      class="search__input"
      type="text"
      placeholder="Поиск"
      v-model="searchValue"
    />
    <span class="search__img">
      <Icon type="search" />
    </span>
  </div>
</template>

<style scoped>
.search__input {
  width: 100%;
  border: 2px solid #4d4d4d;
  border-radius: 12px;
  padding: 16px 38px 16px 18px;
  font-size: 16px;
}
.search__img {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
}
</style>
