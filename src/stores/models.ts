interface INews {
  datePublish: Date;
  image: string;
  shortText: string;
  slug: string;
  title: string;
}

interface INewsCard extends INews{
  page: number;
  color: string;
  svg: IconType;
  items: INews[]
}

interface INewsState {
  pageItems: INewsCard[];
  page: number;
}

interface IImageProps {
  color: string;
  svg: IconType;
}

interface IFilteredItems extends INews, IImageProps {
}

type ButtonType = "first" | "second" | "third";
type IconType = "search" | "pig" | "ligtning" | "fire";

export type { INews, INewsCard, ButtonType, IconType, INewsState, IImageProps, IFilteredItems };
