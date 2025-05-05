import { Column } from '@/types/columns';
import Pagination from '@/components/Pagination';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

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
  return (
    <div>
      <div className="bg-red-500 w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <TableHeader columns={columns} />
          <tbody>
            {data &&
              data?.map((row: Row) => (
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
      {/* // todo: add dynamic update based on selected data */}
      {/* {JSON.stringify(data)} */}
    </div>
  );
}
