import React from "react";
import KPICard from "../components/KPICard";
import ChartCard from "../components/ChartCard";
import RecommendationCard from "../components/RecommendationCard";

import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  LineChart, Line, Legend
} from "recharts";

import useFetch from "../hooks/useFetch";
import { client } from "../api/apiClient";

export default function Dashboard() {
  const kpis = useFetch("kpis", client.getKPIs);
  const seg = useFetch("segmentation", client.getSegmentation);
  const retention = useFetch("retention", client.getRetentionHeatmap);
  const regional = useFetch("regional", client.getRegionalInsights);
  const products = useFetch("products", client.getProductInsights);
  const recs = useFetch("recs", client.getRecommendations);

  const pieColors = ["#008037", "#FFBB28", "#4F46E5"];

  return (
    <div className="grid gap-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard title="Active Customers" value={kpis.data?.activeCustomers ?? "—"} trend={4.3} />
        <KPICard title="Customer Lifetime Value (CLV)" value={kpis.data?.clv ?? "—"} unit="$" trend={-1.2} />
        <KPICard title="Repeat Purchase Rate" value={`${kpis.data?.repeatRate ?? "—"}%`} trend={2.1} />
        <KPICard title="Churn Rate" value={`${kpis.data?.churnRate ?? "—"}%`} trend={0.8} />
        <KPICard title="Average Order Value" value={kpis.data?.aov ?? "—"} unit="$" trend={3.2} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChartCard title="Customer Segmentation">
            {seg.isLoading ? (
              <div className="py-16 text-center text-gray-400">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={seg.data.segments} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {seg.data.segments.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        <div className="lg:col-span-2">
          <ChartCard title="Retention (cohort heatmap)">
            {/* Simple fallback: show a small matrix built with bars instead of a full heatmap. */}
            {retention.isLoading ? (
              <div className="py-16 text-center text-gray-400">Loading...</div>
            ) : (
              <div className="space-y-2">
                {retention.data.cohorts.map((cohort, i) => (
                  <div key={cohort.cohort} className="flex items-center gap-3">
                    <div className="w-28 text-sm text-gray-600">{cohort.cohort}</div>
                    <div className="flex-1 grid grid-cols-10 gap-1">
                      {cohort.values.map((v, idx) => (
                        <div key={idx} className="h-6 rounded" style={{ background: `rgba(0,128,55, ${v/100})` }} title={`${v}%`} />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="text-sm text-gray-500 mt-2">Darker blocks indicate higher retention.</div>
              </div>
            )}
          </ChartCard>
        </div>
      </div>

      {/* Regional & Product Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChartCard title="Regional Insights">
            {regional.isLoading ? (
              <div className="py-10 text-center text-gray-400">Loading...</div>
            ) : (
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regional.data.categories}>
                    <XAxis dataKey="name" hide />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#008037" radius={[6,6,6,6]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 text-sm text-gray-600">
                  <div className="font-semibold">Churn Reduction per intervention</div>
                  <ul className="mt-2 space-y-1">
                    {regional.data.churnReduction.map((c) => (
                      <li key={c.channel} className="flex justify-between">
                        <span>{c.channel}</span>
                        <span className="text-green-600">{c.percent}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </ChartCard>
        </div>

        <div className="lg:col-span-2">
          <ChartCard title="Product Insights">
            {products.isLoading ? (
              <div className="py-10 text-center text-gray-400">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={products.data.topCategories[0].trend.map((v,i)=>({name:`T${i+1}`, v}))}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="v" stroke="#008037" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={products.data.basket} dataKey="share" nameKey="name" innerRadius={40} outerRadius={60} fill="#008037" label>
                        {products.data.basket.map((entry, idx) => (
                          <Cell key={entry.name} fill={["#008037", "#16A34A", "#86EFAC", "#4ADE80"][idx % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </ChartCard>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(recs.data?.actions ?? []).map((r) => (
          <RecommendationCard key={r.id} item={r} />
        ))}
      </div>
    </div>
  );
}
