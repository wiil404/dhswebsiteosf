export default function DivisionCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="bg-white shadow rounded p-6">

      <h3 className="text-xl font-bold text-[#003B6F]">
        {name}
      </h3>

      <p className="mt-3 text-gray-700">
        {description}
      </p>

      <button className="mt-5 text-[#003B6F] font-bold">
        Learn More →
      </button>

    </div>
  );
}