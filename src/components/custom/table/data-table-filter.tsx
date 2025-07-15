'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DataTableFilter() {
  return (
    <div className="space-y-2">
      <Label>Kategori</Label>
      <Select defaultValue="">
        <SelectTrigger>
          <SelectValue placeholder="Semua Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kategori</SelectLabel>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="makanan">Makanan</SelectItem>
            <SelectItem value="minuman">Minuman</SelectItem>
            <SelectItem value="lainnya">Lainnya</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
