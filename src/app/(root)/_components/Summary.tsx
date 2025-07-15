import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { summarySection } from '@/data/constants';

const USERNAME = 'fjrfthrrhmn';

export async function Summary() {
  const me = await fetch(`https://api.github.com/users/${USERNAME}`).then(res => res.json());

  return (
    <section className="py-20">
      <div>
        <div className="flex flex-col items-center text-center gap-2 sm:hover:rotate-2 transition-all duration-300">
          <span className="text-xl sm:text-3xl">🧐</span>
          <p className="mb-16 w-full max-w-4xl sm:px-8 font-medium lg:text-2xl">&ldquo;{summarySection.paragraph}&rdquo;</p>
          {me && (
            <div className="flex items-center gap-2 md:gap-4">
              <Avatar className="size-12 md:size-16">
                <AvatarImage src={me.avatar_url} alt={me.login} />
                <AvatarFallback>{me.login}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium md:text-base">{me.login}</p>
                <p className="text-muted-foreground text-sm md:text-base">{me.location}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
