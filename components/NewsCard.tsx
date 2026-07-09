export default function NewsCard({
  title,
  date,
  category,
}: {
  title: string;
  date: string;
  category: string;
}) {
  return (
    <div className="bg-white shadow rounded p-6">

      <p className="text-sm text-gray-500">
        {category}
      </p>

      <h3 className="text-xl font-bold mt-2 text-[#003B6F]">
        {title}
      </h3>

      <p className="mt-3 text-gray-600">
        {date}
      </p>

      <button className="mt-4 text-[#003B6F] font-bold">
        Read More →
      </button>

    </div>
  );
}