import { useQuery } from '@tanstack/react-query';

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
