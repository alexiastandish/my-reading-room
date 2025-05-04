import { Book } from '@/types/book';
import { Magazine } from '@/types/magazine';

export async function fetchBooks({
  page = 1,
  search = '',
  category = 'title',
  sortOrder = 'asc',
  subCategory = null,
}: {
  page: number;
  search?: string;
  category?: string;
  sortOrder?: 'asc' | 'desc';
  subCategory?: string | null;
}): Promise<{
  books: Book[];
  currentPage: number;
  nextPage: number | null;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}> {
  const response = await fetch(
    `http://localhost:3434/api/books?page=${page}&search=${search}&category=${category}&subCategory=${subCategory}&sortOrder=${sortOrder}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const responseData = await response.json();
  const { data: booksData, currentPage, totalPages, totalItems } = responseData;

  if (!booksData) {
    throw new Error('No books data found');
  }

  return {
    books: booksData,
    currentPage,
    nextPage: booksData.length > 0 ? currentPage + 1 : null,
    totalPages,
    totalItems,
    hasMore: currentPage < totalPages,
  };
}

export async function fetchMagazines({
  page = 1,
  search = '',
  category = 'title',
  subCategory = null,
  sortOrder = 'asc',
}: {
  page: number;
  search?: string;
  category?: string;
  subCategory?: string | null;
  sortOrder?: 'asc' | 'desc';
}): Promise<{
  magazines: Magazine[];
  currentPage: number;
  nextPage: number | null;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}> {
  const response = await fetch(
    `http://localhost:3434/api/magazines?page=${page}&search=${search}&category=${category}&subCategory=${subCategory}&sortOrder=${sortOrder}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const responseData = await response.json();

  const {
    data: magazinseData,
    currentPage,
    totalPages,
    totalItems,
  } = responseData;

  if (!magazinseData) {
    throw new Error('No magazine data found');
  }

  return {
    magazines: magazinseData,
    currentPage,
    nextPage: magazinseData.length > 0 ? currentPage + 1 : null,
    totalPages,
    totalItems,
    hasMore: currentPage < totalPages,
  };
}
