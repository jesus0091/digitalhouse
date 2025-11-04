export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center py-16 bg-white rounded-xl max-w-6xl w-full mx-auto mt-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && <p className="text-gray-500 mt-2">{description}</p>}
    </div>
  );
}
