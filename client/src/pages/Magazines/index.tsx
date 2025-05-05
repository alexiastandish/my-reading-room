import SortAndSearch from '@/components/SortAndSearch';
import Table from '@/components/Table';
import columns from '@/utils/constants/magazine-categories.json';
import { Column } from '@/types/columns';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useFilters } from '@/hooks/useFilters';
import { Magazine } from '@/types/magazine';
import { fetchMagazines } from '@/api';
import { useCheckedRows } from '@/hooks/useCheckedRows';

export default function Magazines() {
  const queryClient = useQueryClient();
  const { checkedRows } = useCheckedRows();
  const { page, sortOrder, category, subCategory, search } = useFilters();

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['magazines', page, sortOrder, search, category, subCategory],
    queryFn: async () => {
      const data = await fetchMagazines({
        page,
        search,
        category,
        sortOrder,
        subCategory,
      });
      // caching visited/merged magazines in a separate query key
      const existing =
        queryClient.getQueryData<any[]>(['selectedMagazines']) || [];
      const merged = [...existing, ...data.magazines].filter(
        (magazine, i, arr) =>
          arr.findIndex(m => m.circulation === magazine.circulation) === i
      );
      queryClient.setQueryData(['selectedMagazines'], merged);
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const allMagazines =
    queryClient.getQueryData<any[]>(['selectedMagazines']) || [];

  const selectedData = allMagazines.filter(magazine =>
    checkedRows.includes(magazine.circulation)
  );

  return (
    <div>
      <SortAndSearch columns={columns} />
      <Table
        columns={columns as Column[]}
        data={data?.magazines as Magazine[]}
        totalPages={data?.totalPages as number}
        tableId="magazines"
      />
      {selectedData.length > 0 && (
        <div className="">{JSON.stringify(selectedData)}</div>
      )}
    </div>
  );
}
