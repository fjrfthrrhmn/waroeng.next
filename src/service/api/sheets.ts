import { SheetsSchema } from '@/data/schema/sheets';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetSheets() {
  const { data, ...rest } = useQuery({
    queryKey: ['sheets'],
    queryFn: async () => (await fetch('/api/sheets')).json(),
  });

  return {
    res: data,
    data: data?.data || [],
    ...rest,
  };
}

export function useAppendSheet() {
  const queryClient = useQueryClient();

  const { ...rest } = useMutation({
    mutationFn: async (data: SheetsSchema) => (await fetch('/api/sheets', { method: 'POST', body: JSON.stringify(data) })).json(),
    onError: error => console.log(error),
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['sheets'] });
    },
  });

  return { ...rest };
}
