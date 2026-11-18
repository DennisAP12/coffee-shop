import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function AdminChart({ data }) {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateWidth = () => {
      const width = Math.floor(container.getBoundingClientRect().width);
      setChartWidth(width > 0 ? width : 0);
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, [data]);

  if (!data?.length) {
    return (
      <div className="chart-empty">
        <i className="fa-solid fa-chart-column"></i>
        <p>Aún no hay ventas registradas para mostrar.</p>
      </div>
    );
  }
  return (
    <div className="admin-stats-section">
      <div className="section-title">
        <i className="fa-solid fa-chart-simple"></i> Ventas Mensuales
      </div>
      <p style={{ color: 'var(--color-text-light)', marginBottom: '20px', fontSize: '14px' }}>
        Rendimiento de los productos más populares durante el mes actual.
      </p>
      
      <div ref={containerRef} className="chart-container" style={{ minWidth: 0, width: '100%', height: 300 }}>
        {chartWidth > 0 && (
          <BarChart width={chartWidth} height={300} data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#555', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip   
              cursor={{ fill: '#f5f5f5' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="ventas" fill="var(--color-brand-accent)" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        )}
      </div>
    </div>
  );
}
