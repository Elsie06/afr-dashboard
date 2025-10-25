export default function KPICard({ title, value, trend }) {
  const trendColor = trend > 0 ? "text-green-600" : "text-red-600";
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <span className={`text-sm ${trendColor}`}>
        {trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}
      </span>
    </div>
  );
}
