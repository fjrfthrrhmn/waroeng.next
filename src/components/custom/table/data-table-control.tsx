import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

interface DataTableControlsProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: VariantProps<typeof Button>['variant'];
  classNameContent?: string;
}

export function DataTableControls({ children, icon, variant = 'outline', title, description, classNameContent }: DataTableControlsProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={variant} size="icon">
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className={cn('h-dvh mx-auto w-full max-w-xl', classNameContent)}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>{children}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
