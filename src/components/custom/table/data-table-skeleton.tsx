import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTableSkeletonProps extends React.ComponentProps<'div'> {
  headerCount?: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
}

export function DataTableSkeleton({ filterCount = 2, headerCount = 3, withViewOptions = true, ...props }: DataTableSkeletonProps) {
  return (
    <main {...props}>
      <div className="flex w-full items-center justify-between gap-2 overflow-auto py-1.5">
        <div className="flex flex-1 items-center gap-2">
          {filterCount > 0 &&
            Array.from({ length: filterCount }).map((_, i) => (
              <Skeleton key={i} className="h-5 sm:h-8 w-[3.5rem] sm:w-[4.5rem] border-dashed" />
            ))}
        </div>
        {withViewOptions && <Skeleton className="ml-auto hidden h-5 sm:h-8 w-[3.5rem] sm:w-[4.5rem] lg:flex" />}
      </div>

      <div className="rounded-md border">
        <div className="p-2 flex items-center gap-2">
          {Array.from({ length: headerCount }).map((_, i) => (
            <Skeleton key={i} className="w-full h-5 sm:h-8" />
          ))}
        </div>

        <Separator />

        <div className="h-32 lg:h-54 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Tunggu sebentar...</p>
        </div>
      </div>

      <div className="py-2 flex justify-between">
        <Skeleton className="h-5 sm:h-8 w-[3.5rem] sm:w-[4.5rem]" />
        <div className="flex items-center justify-between gap-1.5">
          <Skeleton className="h-5 sm:h-8 w-[3.5rem] sm:w-[4.5rem]" />
          <Skeleton className="h-5 sm:h-8 w-[3.5rem] sm:w-[4.5rem]" />
        </div>
      </div>
    </main>
  );
}
