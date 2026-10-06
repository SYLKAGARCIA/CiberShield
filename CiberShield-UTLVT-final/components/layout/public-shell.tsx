import { SiteShell } from './site-shell';

export async function PublicShell({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
