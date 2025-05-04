import { useFilters } from '@/hooks/useFilters';

// Todo: add styling
export default function Pagination({ totalPages }: { totalPages: number }) {
  const { page, setFilters } = useFilters();

  return (
    <div>
      {page > 1 && (
        <button
          type="button"
          onClick={() => setFilters({ page: page - 1, checkedRows: [] })}
        >
          prev
        </button>
      )}
      <p>{page}</p>
      {page < totalPages && (
        <button
          type="button"
          onClick={() => setFilters({ page: page + 1, checkedRows: [] })}
        >
          next
        </button>
      )}
    </div>
  );
}
