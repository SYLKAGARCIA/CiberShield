'use client';

export function BannerThumbnail({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-10 w-16 rounded-md border border-slate-200 object-cover dark:border-slate-700"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
