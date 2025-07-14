import { IconNode, LucideIcon } from 'lucide-react';

interface TitleProps extends React.ComponentProps<'div'> {
  title: string;
  icon?: LucideIcon | IconNode;
  description?: string;
  position?: 'center' | 'left' | 'right';
}

export function Title({ title, description, ...props }: TitleProps) {
  return (
    <div className="my-4" {...props}>
      {/* <div className="flex items-center">
        {Icon && <Icon iconNode={icon} />}
      </div> */}
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-pretty lg:text-4xl">{title}</h1>
      <p className="max-w-3xl text-muted-foreground lg:text-lg">{description}</p>
    </div>
  );
}
