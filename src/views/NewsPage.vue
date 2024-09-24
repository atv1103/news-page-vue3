<script setup lang="ts">
import { nextTick, onBeforeMount, onBeforeUpdate, ref, watch } from "vue";
import NewsCard from "../components/NewsPage/NewsCard.vue";
import Container from "../components/UI/Container.vue";
import Search from "../components/UI/Search.vue";
import Button from "../components/UI/Button.vue";
import { useNewsStore } from "../stores/store";
import { IFilteredItems } from "../stores/models";

const store = useNewsStore();

const filteredValue = ref();
const filtered = (array: IFilteredItems[]) => {
  return array.filter((el) =>
    el.shortText.toLowerCase().includes(filteredValue.value.toLowerCase())
  );
};

const rerenderComponent = ref(true);
const forceRerender = async () => {
  rerenderComponent.value = false;
  await nextTick();
  rerenderComponent.value = true;
};

onBeforeUpdate(() => {
  watch(
    () => store.NewsState.length,
    () => forceRerender()
  );
});

onBeforeMount(async () => {
  if (!store.NewsState.length) {
    await store.getNewsState(7, { color: "#378b60", svg: "pig" });
    forceRerender();
  }
});
</script>

<template>
  <Container>
    <Search @filter="(value) => (filteredValue = value)" />
    <div v-if="rerenderComponent" class="content">
      <div v-for="item in store.NewsState" class="content__page">
        <template v-if="filteredValue">
          <div v-for="news in filtered(item.pageItems)" class="content__card">
            <NewsCard :item="news" />
          </div>
          <div v-if="!filtered(item.pageItems).length">Товары не найдены</div>
        </template>
        <template v-else>
          <!-- Блок загружает товары при первоначальной загрузке страницы, т.к. !filteredValue и нельзя применить фильтр -->
          <div v-for="news in item.pageItems" class="content__card">
            <NewsCard :item="news" />
          </div>
        </template>
        <div class="content__number">Страница {{ item.page }}</div>
      </div>
    </div>
    <div class="buttons">
      <Button @rerender-component="forceRerender" type="first" icon="pig">
        Загрузить
      </Button>
      <Button @rerender-component="forceRerender" type="second" icon="ligtning">
        Загрузить
      </Button>
      <Button @rerender-component="forceRerender" type="third" icon="fire">
        Загрузить
      </Button>
    </div>
  </Container>
</template>

<style scoped>
.container {
  margin: 50px auto;
}
.content {
  margin: 48px 0 0 0;
}
.buttons {
  margin: 25px 0 0 0;
  display: flex;
  justify-content: center;
  gap: 30px;
}
.content__page {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;
}

.content__number {
  grid-column: span 5;
  margin: 0 0 20px;
  border-bottom: 1px solid #000;
}

@media (max-width: 1092px) {
  .content {
    grid-template-columns: repeat(4, 1fr);
  }
  .content__number {
    grid-column: span 4;
  }
}

@media (max-width: 837px) {
  .content {
    grid-template-columns: repeat(3, 1fr);
  }
  .content__number {
    grid-column: span 3;
  }
}

@media (max-width: 620px) {
  .buttons {
    gap: 12px;
  }
}

@media (max-width: 582px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
  .content__number {
    grid-column: span 2;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
