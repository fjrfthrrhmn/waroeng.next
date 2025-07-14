import { Input } from '@/components/ui/input';

export function SearchBar({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div {...props}>
      <Input placeholder="Cari barang..." />
    </div>
  );
}
