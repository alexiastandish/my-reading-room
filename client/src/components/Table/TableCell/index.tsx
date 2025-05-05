import { Column } from '@/types/columns';
import { Row } from '..';
import { useIsFetching } from '@tanstack/react-query';

export default function TableCell({
  column,
  row,
}: {
  column: Column;
  row: Row;
}) {
  const isFetching = useIsFetching();

  return (
    <td
      className={`${isFetching && 'bg-gray-200'} border px-4 py-2 text-sm text-gray-800 h-12 align-middle transition-colors duration-100 `}
    >
      <div>{row[column.key]}</div>
    </td>
  );
}
