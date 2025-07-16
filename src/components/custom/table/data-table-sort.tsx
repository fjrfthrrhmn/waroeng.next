import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTableSort() {
  return (
    <div className="space-y-2">
      <Label>Urutkan Berdasarkan</Label>
      <Select defaultValue="name-asc">
        <SelectTrigger>
          <SelectValue placeholder="Pilih urutan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Nama Produk</SelectLabel>
            <SelectItem value="name-asc">A ke Z</SelectItem>
            <SelectItem value="name-desc">Z ke A</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Harga</SelectLabel>
            <SelectItem value="price-asc">Termurah</SelectItem>
            <SelectItem value="price-desc">Termahal</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
