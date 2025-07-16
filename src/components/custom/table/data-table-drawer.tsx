import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

interface DataTableDrawerProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: VariantProps<typeof Button>['variant'];
  classNameContent?: string;
}

export function DataTableDrawer({ children, icon, variant = 'outline', title, description, classNameContent }: DataTableDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={variant} size="icon" key={title}>
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className={cn('h-dvh mx-auto w-full max-w-xl px-4', classNameContent)}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
