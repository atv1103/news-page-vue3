<script setup lang="ts">
import { randomNumber } from "../../helpers";
import { IFilteredItems } from "../../stores/models";
import Icon from "../UI/Icon.vue";

interface Props {
  item: IFilteredItems;
}
const { item } = defineProps<Props>();

const imagePath = `/src/assets/images/news-card-bg/${randomNumber(1, 5)}.jpg`;
</script>

<template>
  <div class="card">
    <img class="card__image" :src="item.image || imagePath" alt="card image" />
    <div class="card__content content">
      <div class="content__title">{{ item.shortText }}</div>
      <div class="content__bottom">
        <Icon :type="item.svg" :fill-color="item.color || '#378b60'" />
        <span :style="{ color: item.color || '#378b60' }">
          {{ item.datePublish }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 264px;
  border-radius: 16px;
  overflow: hidden;
}
.card__image {
  display: block;
  width: 264px;
  height: 213px;
  object-fit: cover;
  object-position: top;
}
.card__content {
  min-height: 150px;
  background: #f5f5f5;
  padding: 22px;
  border-radius: 0 0 16px 16px;
}
.content__title {
  min-height: 71px;
}
.content__bottom {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
}
</style>
