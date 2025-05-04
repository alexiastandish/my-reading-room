import { Column } from '@/types/columns';

function TableHeader({ columns }: { columns: Column[] }) {
  return (
    <thead>
      <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
        {columns.map((column: Column) => (
          <th key={String(column.key)} className="border px-4 py-2">
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
