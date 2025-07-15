import { SparklesIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

export function Footer({
  logo = {
    url: 'https://www.shadcnblocks.com',
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
    alt: 'logo',
    title: 'Shadcnblocks.com',
  },
  description = 'A collection of components for your startup business or side project.',
  copyright = '&copy; 2024 Shadcnblocks.com. All rights reserved.',
}: FooterProps) {
  return (
    <section className="py-20">
      <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
        <div className="flex flex-col gap-2 lg:justify-start">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Button size="icon">
              <SparklesIcon />
            </Button>
            <h2 className="text-xl font-semibold">{logo.title}</h2>
          </div>
          <p className="text-muted-foreground w-full sm:max-w-[80%] text-sm">{description}</p>
        </div>
      </div>

      <div className="text-muted-foreground mt-8 text-center sm:text-end gap-4 border-t py-8 text-xs font-medium">
        <p className="order-2 lg:order-1">{copyright}</p>
      </div>
    </section>
  );
}
