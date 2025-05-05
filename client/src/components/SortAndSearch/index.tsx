import { useEffect, useState } from 'react';
import { Filters, useFilters } from '@/hooks/useFilters';
import { Column } from '@/types/columns';
import { useDebounce } from '@/hooks/useDebounce';

export default function SortAndSearch({ columns }: { columns: Column[] }) {
  const { setFilters, category, subCategory, sortOrder } = useFilters();
  const selectedColumn = columns.find(column => column.key === category);
  const filterType = selectedColumn?.filterType;
  const filterOptions = selectedColumn?.filterOptions;

  const [localSearch, setLocalSearch] = useState<string>('');
  const debouncedSearch = useDebounce(localSearch);

  // debouncing to optimize search logic that triggers useQuery calls
  useEffect(() => {
    setFilters({ search: localSearch });
  }, [debouncedSearch]);

  // Todo: abstract some of these into individual / reusable components
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex">
        <div className="flex items-start flex-col">
          <div className="flex">
            <p className="">Filter By:</p>
            <select
              value={category ?? ''}
              onChange={e =>
                setFilters({
                  category: e.target.value as Filters['category'],
                })
              }
              className="border p-1"
            >
              {columns.map(column => {
                return (
                  <option key={column.key} value={column.key}>
                    {column.header}{' '}
                  </option>
                );
              })}
            </select>
            <p>(or click on a column header to set the filter)</p>
          </div>
          {filterType === 'select' && (
            <div>
              <p className="">{category}:</p>
              <select
                value={subCategory ?? ''}
                onChange={e =>
                  setFilters({
                    subCategory: e.target.value as Filters['subCategory'],
                  })
                }
                className="border p-1"
              >
                <option value="" disabled>
                  Select a {category}
                </option>
                {filterOptions?.map(filterOption => {
                  return (
                    <option key={filterOption} value={filterOption}>
                      {filterOption}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {filterType === 'text' && (
            <div className="flex">
              <p className="">Search {selectedColumn.header}:</p>
              <input
                type="text"
                value={localSearch}
                placeholder="Search..."
                className="border p-1"
                onChange={e => setLocalSearch(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1 flex justify-end items-center">
        <p className="">Sort Order:</p>
        <select
          value={sortOrder}
          onChange={e =>
            setFilters({ sortOrder: e.target.value as Filters['sortOrder'] })
          }
          className="border p-1"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
