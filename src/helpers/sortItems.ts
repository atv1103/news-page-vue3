type directionType = "ASC" | "DESC";

export const sortItems = <T, K extends keyof T>(
  arr: T[],
  orderType: K,
  direction = "ASC" as directionType
) => {
  switch (direction) {
    case "ASC":
      return arr.sort((a, b) => Number(a[orderType]) - Number(b[orderType]));

    case "DESC":
      return arr.sort((a, b) => Number(b[orderType]) - Number(a[orderType]));
  }
};
