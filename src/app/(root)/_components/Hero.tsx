import { StoreIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { heroSection } from '@/data/constants';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
          fill
        />
      </div>

      <div className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-2 shadow-lg backdrop-blur-sm">
              <StoreIcon className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {heroSection.headline.title}{' '}
                <span className="bg-primary text-primary-foreground px-2 rounded-lg">{heroSection.headline.highlight}</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">{heroSection.headline.desc}</p>
            </div>

            {/* <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" /> */}

            <div className="mt-6 flex justify-center flex-wrap gap-3">
              {heroSection.buttons.map(button => (
                <Button
                  key={button.label}
                  variant={button.variant as 'outline' | 'default'}
                  className="shadow-sm transition-shadow hover:shadow"
                  asChild
                >
                  <Link
                    href={button.link}
                    className={`${button.positionIcon === 'right' ? 'flex-row-reverse' : ''} flex items-center gap-2`}
                  >
                    {button.icon}
                    {button.label}
                  </Link>
                </Button>
              ))}
            </div>

            {/* <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Dibangun dengan teknologi <span className="underline underline-offset-2 decoration-sky-500 decoration-wavy ">terbaik:</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#"
                  className={cn(buttonVariants({ variant: 'outline' }), 'group flex aspect-square h-12 items-center justify-center p-0')}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                    alt="shadcn/ui logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="#"
                  className={cn(buttonVariants({ variant: 'outline' }), 'group flex aspect-square h-12 items-center justify-center p-0')}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                    alt="TypeScript logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    width={32}
                    height={32}
                  />
                </a>

                <a
                  href="#"
                  className={cn(buttonVariants({ variant: 'outline' }), 'group flex aspect-square h-12 items-center justify-center p-0')}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                    alt="React logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="#"
                  className={cn(buttonVariants({ variant: 'outline' }), 'group flex aspect-square h-12 items-center justify-center p-0')}
                >
                  <Image
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                    alt="Tailwind CSS logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
