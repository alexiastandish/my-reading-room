import { Filters, useFilters } from '@/hooks/useFilters';
import { Column } from '@/types/columns';

function TableHeader({ columns }: { columns: Column[] }) {
  const { category, setFilters } = useFilters();
  return (
    <thead>
      <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
        {columns.map((column: Column) => (
          <th
            key={String(column.key)}
            className={`border px-4 py-2 hover:bg-gray-200 cursor-pointer ${category === column.key ? 'bg-blue-200' : ''}`}
            onClick={() =>
              setFilters({
                category: column.key as Filters['category'],
              })
            }
          >
            <div>
              <p>{column.header}</p>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
export default TableHeader;
