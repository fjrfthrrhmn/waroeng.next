'use client';
import { Input } from '@/components/ui/input';
import { parseAsString, useQueryState } from 'nuqs';

export function DataTableSearchbar() {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));
  return <Input placeholder="Cari barang..." value={search} onChange={e => setSearch(e.target.value)} className="w-full lg:max-w-sm" />;
}
