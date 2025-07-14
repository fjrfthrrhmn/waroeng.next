import { Button } from '@/components/ui/button';
import { ArrowDownToLineIcon } from 'lucide-react';
import { DropdownBar } from './dropdownBar';
import { FormDrawer } from './formDrawer';
import { SearchBar } from './searchBar';

export function ToolBar() {
  return (
    <main className="my-2 flex items-center gap-2 w-full">
      <SearchBar className="flex-1" />

      <div className="flex gap-2 items-center">
        <Button variant="outline" size="icon">
          <ArrowDownToLineIcon />
          <span className="sr-only">Download</span>
        </Button>

        <FormDrawer />

        <DropdownBar />
      </div>
    </main>
  );
}
