export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      {children}
    </div>
  );
}
