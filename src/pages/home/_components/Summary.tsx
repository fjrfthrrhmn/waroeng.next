import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AboutProps {
  quote?: string;
  author?: {
    name: string;
    role: string;
    avatar: {
      src: string;
      alt: string;
    };
  };
}

export function Summary({
  quote = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
  author = {
    name: 'Jessen',
    role: 'Web Developer',
    avatar: {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
      alt: 'Customer Name',
    },
  },
}: AboutProps) {
  return (
    <section className="py-20">
      <div>
        <div className="flex flex-col items-center text-center">
          <p className="mb-16 w-full max-w-4xl sm:px-8 font-medium lg:text-2xl">&ldquo;{quote}&rdquo;</p>
          <div className="flex items-center gap-2 md:gap-4">
            <Avatar className="size-12 md:size-16">
              <AvatarImage src={author.avatar.src} alt={author.avatar.alt} />
              <AvatarFallback>{author.name}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium md:text-base">{author.name}</p>
              <p className="text-muted-foreground text-sm md:text-base">{author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
