export type Magazine = {
  _id: string;
  title: string;
  publisher: string;
  genre: string;
  frequency: string;
  circulation: string;
};

export type MagazineFilters = {
  category?: 'title' | 'publisher' | 'genre' | 'frequency' | 'circulation';
  subCategory?: string;
  search?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  checkedRows?: string[] | [];
};
