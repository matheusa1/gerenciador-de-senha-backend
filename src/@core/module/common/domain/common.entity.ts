export type TResultPaginate<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
