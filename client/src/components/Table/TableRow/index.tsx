import { useCheckedRows } from '@/hooks/useCheckedRows';
import { getRowParamValue } from '@/utils/helpers/get-row-param-value';

function TableRow({
  row,
  columns,
  tableId,
}: {
  // todo: update types
  row: any;
  columns: any;
  tableId: string;
}) {
  const { checkedRows, setCheckedRows } = useCheckedRows();

  const paramValue = getRowParamValue(tableId);

  const handleClickRow = (value: string) => {
    setCheckedRows({ rowParam: value });
  };

  const checked = checkedRows.includes(row[paramValue]);

  return (
    <tr
      key={row.id}
      className={`cursor-pointer transition-colors duration-100 
        ${checked ? 'bg-blue-100' : 'bg-white'}
        hover:bg-blue-50
      `}
      onClick={() => handleClickRow(row[paramValue])}
      style={{ cursor: 'pointer' }}
    >
      {columns.map(column => (
        <td
          key={column.key}
          className="border px-4 py-2 text-sm text-gray-800 h-12 align-middle"
        >
          <div>{row[column.key]}</div>
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
