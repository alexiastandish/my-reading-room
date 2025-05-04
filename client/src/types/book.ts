export type Book = {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear?: Date;
  genre: string;
  language: string;
  pageCount: number;
  publisher: string;
  rating: number;
};

export type BookFilters = {
  category?:
    | 'title'
    | 'author'
    | 'isbn'
    | 'publishedYear'
    | 'genre'
    | 'pageCount'
    | 'publisher'
    | 'rating';
  subCategory?: string;
  search?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  checkedRows?: string[] | [];
};
