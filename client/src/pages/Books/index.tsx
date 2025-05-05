import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { fetchBooks } from '@/api';
import SortAndSearch from '@/components/SortAndSearch';
import Table from '@/components/Table';
import columns from '@/utils/constants/book-categories.json';
import { Column } from '@/types/columns';
import { Book } from '@/types/book';
import { useFilters } from '@/hooks/useFilters';
import { useCheckedRows } from '@/hooks/useCheckedRows';

export default function Books() {
  const queryClient = useQueryClient();
  const { checkedRows } = useCheckedRows();
  const { page, sortOrder, category, subCategory, search } = useFilters();

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['books', page, sortOrder, search, category, subCategory],
    queryFn: async () => {
      const data = await fetchBooks({
        page,
        search,
        category,
        sortOrder,
        subCategory,
      });

      // Caching visited/merged books in a separate query key
      const existing = queryClient.getQueryData<any[]>(['selectedBooks']) || [];
      const merged = [...existing, ...data.books].filter(
        (book, i, arr) => arr.findIndex(b => b.isbn === book.isbn) === i
      );
      queryClient.setQueryData(['selectedBooks'], merged);
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const allBooks = queryClient.getQueryData<any[]>(['selectedBooks']) || [];
  const selectedData = allBooks.filter(book => checkedRows.includes(book.isbn));

  return (
    <div>
      <SortAndSearch columns={columns} />
      <Table
        columns={columns as Column[]}
        data={data?.books as Book[]}
        totalPages={data?.totalPages as number}
        tableId="books"
      />
      {selectedData.length > 0 && (
        <div className="">{JSON.stringify(selectedData)}</div>
      )}
    </div>
  );
}
