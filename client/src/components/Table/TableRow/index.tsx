import { useCheckedRows } from '@/hooks/useCheckedRows';
import { Column } from '@/types/columns';
import { getRowParamValue } from '@/utils/helpers/get-row-param-value';
import { Row } from '..';
import TableCell from '../TableCell';

function TableRow({
  row,
  columns,
  tableId,
}: {
  row: Row;
  columns: Column[];
  tableId: string;
}) {
  const { checkedRows, setCheckedRows } = useCheckedRows();

  const paramValue = getRowParamValue(tableId);

  const handleClickRow = (value: string) => {
    setCheckedRows({ rowParam: value });
  };

  const checked = checkedRows.includes(row[paramValue]);
  console.log('checked', checked);
  return (
    <tr
      key={row.id}
      className={`cursor-pointer transition-colors duration-100 hover:bg-blue-100
        ${checked ? 'bg-blue-500' : 'bg-white'}
      `}
      onClick={() => handleClickRow(row[paramValue])}
      style={{ cursor: 'pointer' }}
    >
      {columns.map(column => (
        <TableCell column={column} key={column.key} row={row} />
      ))}
    </tr>
  );
}

export default TableRow;
