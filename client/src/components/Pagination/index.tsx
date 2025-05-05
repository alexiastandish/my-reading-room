import { useFilters } from '@/hooks/useFilters';

// Todo: add styling
export default function Pagination({ totalPages }: { totalPages: number }) {
  const { page, setFilters } = useFilters();

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setFilters({ page: page - 1, checkedRows: [] })}
        className="disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer"
      >
        &#8592;
      </button>

      <span className="text-sm font-medium">{page}</span>

      <button
        type="button"
        onClick={() => setFilters({ page: page + 1, checkedRows: [] })}
        disabled={page >= totalPages}
        className="disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer"
      >
        &#8594;
      </button>
    </div>
  );
}
