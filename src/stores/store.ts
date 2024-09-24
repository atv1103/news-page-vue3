import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { IFilteredItems, IImageProps, INewsState } from "./models";
import { sortItems } from "../helpers";

export const useNewsStore = defineStore("news", () => {
  const NewsState = ref<INewsState[]>([]);
  const filteredItems = ref<IFilteredItems[][]>();
  const existedPages = ref<number[]>([]);

  async function getNewsState(page: number, params: IImageProps) {
    const isExistedPage = existedPages.value.includes(page);
    if (isExistedPage) {
      NewsState.value = NewsState.value.filter((el) => el.page !== page);
    }

    const response = await getNews(page);
    if (!response) return;

    existedPages.value.push(page);

    const data = transformNewsData(response, params);
    NewsState.value.push(data);

    sortItems(NewsState.value, "page");

    return NewsState;
  }

  async function getNews(pageNumber: number) {
    try {
      const { data } = await axios.get(
        `https://domotekhnika.ru/api/v1/news?page=${pageNumber}`
      );
      const newsPage: INewsState = {
        pageItems: data.data.news,
        page: pageNumber,
      };

      return newsPage;
    } catch (error) {
      console.error(error);
    }
  }

  function transformNewsData(object: INewsState, params: IImageProps) {
    const pageItems = [];
    for (let i = 0; i < object.pageItems.length; i++) {
      pageItems.push(Object.assign(object.pageItems[i], params));
    }

    const newsPage = { pageItems: pageItems, page: object.page };
    return newsPage;
  }

  return {
    NewsState,
    getNews,
    transformNewsData,
    getNewsState,
    filteredItems,
  };
});
