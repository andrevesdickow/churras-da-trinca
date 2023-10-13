export default function BarbecueDetailsPage({ params }: { params: { id: number } }) {
  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-content-center gap-4 min-h-screen flex-col p-4">
      {params.id}
    </main>
  );
}
