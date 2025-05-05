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
    <div>
      <div className="">
        Filter By:
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
      </div>

      {filterType === 'select' && (
        <div>
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
        <div>
          <input
            type="text"
            value={localSearch}
            placeholder="Search..."
            className="border p-1"
            onChange={e => setLocalSearch(e.target.value)}
          />
        </div>
      )}

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
  );
}
