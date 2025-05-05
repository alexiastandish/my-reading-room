import { Column } from '@/types/columns';
import Pagination from '@/components/Pagination';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { useIsFetching } from '@tanstack/react-query';

type TableProps = {
  data: Row[];
  columns: Column[];
  totalPages: number;
  tableId: string;
};

export type Row = {
  [key: string]: any;
  _id: string;
};

export default function Table({
  data,
  columns,
  totalPages,
  tableId,
}: TableProps) {
  // Tanstack react-query hook returns 1 or 0 (fetching or not-fetching)
  const isFetching = useIsFetching();

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <TableHeader columns={columns} />
          <tbody>
            {!data && isFetching
              ? [...Array(10)].map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    {columns.map((col, i) => (
                      <td
                        key={i}
                        className="p-4 bg-gray-100 rounded-md h-6 w-full"
                      >
                        <div className="relative overflow-hidden bg-gray-200 rounded-md h-4 w-64">
                          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              : data?.map((row: Row) => (
                  <TableRow
                    key={row._id}
                    row={row}
                    columns={columns}
                    tableId={tableId}
                  />
                ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
