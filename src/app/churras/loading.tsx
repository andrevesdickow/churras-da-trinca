import { Skeleton } from '@/components/Skeleton';

export default function BarbecueLoading() {
  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-content-center gap-4 flex-col">
      <Skeleton className="w-full h-[160px] px-10" />
      <Skeleton className="w-full h-[160px] px-10" />
      <Skeleton className="w-full h-[160px] px-10" />
      <Skeleton className="w-full h-[160px] px-10" />
      <Skeleton className="w-full h-[160px] px-10" />
      <Skeleton className="w-full h-[160px] px-10" />
    </div>
  );
}
