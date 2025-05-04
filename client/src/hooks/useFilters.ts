import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { BookFilters } from '@/types/book';
import { MagazineFilters } from '@/types/magazine';

export type Filters = BookFilters | MagazineFilters;

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search =
    (searchParams.get('search') as
      | BookFilters['search']
      | MagazineFilters['search']) || '';
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const category =
    (searchParams.get('category') as Filters['category']) ?? 'title';
  const subCategory =
    (searchParams.get('subCategory') as Filters['subCategory']) ?? ''; // ✅ NEW
  const sortOrder =
    (searchParams.get('sortOrder') as Filters['sortOrder']) ?? 'asc';

  // Setting and preserving state in query params here
  const setFilters = useCallback(
    (filters: Filters) => {
      setSearchParams(params => {
        // Variable to check for resetting page to 1 if search or category is changed
        let shouldResetPage: boolean = false;

        if (filters.search !== undefined) {
          if (params.get('subCategory')) params.delete('subCategory');
          params.set('search', filters.search);
          shouldResetPage = true;
        }

        if (filters.category !== undefined) {
          // Remove search filter if it exists since we're filtering by a differnt category
          if (params.get('search')) params.delete('search');
          // If the category is changed remove subCategory from params
          const prevCategory = searchParams.get('category');
          if (prevCategory && prevCategory !== filters.category) {
            params.delete('subCategory');
          }
          params.set('category', filters.category);
        }

        if ('subCategory' in filters && filters.subCategory !== undefined) {
          params.set('subCategory', filters.subCategory);
          shouldResetPage = true;
        }

        if (filters.sortOrder !== undefined) {
          params.set('sortOrder', filters.sortOrder);
        }

        // Page should reset if search or category is changed
        if (filters.page !== undefined && !shouldResetPage) {
          params.set('page', filters.page.toString());
        } else if (shouldResetPage) {
          params.set('page', '1');
        }

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    search,
    page,
    category,
    subCategory,
    sortOrder,
    setFilters,
  };
}
