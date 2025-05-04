import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export function useCheckedRows() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Setting and preserving state in query params here
  // checkedRows array passed to table row to highlight rows that are checked
  const checkedRows = useMemo(() => {
    return searchParams.get('checkedRows')
      ? (JSON.parse(searchParams.get('checkedRows')!) as string[])
      : [];
  }, [searchParams]);

  const setCheckedRows = useCallback(
    ({ rowParam }: { rowParam: string }) => {
      const updated = [...checkedRows];
      console.log('rowParam', rowParam);

      // Check to see if the rowParam is already in the search params checkedRows
      if (checkedRows.includes(rowParam)) {
        // if it is, remove it from the array
        updated.splice(updated.indexOf(rowParam), 1);
      } else {
        // if it isn't, add it to the array
        updated.push(rowParam);
      }
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        params.set('checkedRows', JSON.stringify(updated));
        return params;
      });
    },
    [checkedRows, setSearchParams]
  );

  return {
    checkedRows,
    setCheckedRows,
  };
}
