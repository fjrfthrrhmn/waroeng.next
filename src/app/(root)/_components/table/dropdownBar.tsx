import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuSquare } from 'lucide-react';

// ! FIXME
export function DropdownBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MenuSquare />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Pengaturan Tabel</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex gap-2 !flex-col justify-start items-start">
          <Label htmlFor="sort">Urutkan</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Atur Urutan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Urutan Data Table</SelectLabel>
                <SelectItem value="asc">A ke Z</SelectItem>
                <SelectItem value="desc">Z ke A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
