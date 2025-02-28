export interface IOpListMeta {
  count: number;
  total: number;
  totalPages: number;
}
export interface IOpListResult<T> {
  data: T[];
  meta: IOpListMeta;
}

export interface IOpListQuery {
  limit?: {
    page: number;
    perPage: number;
  };
}
