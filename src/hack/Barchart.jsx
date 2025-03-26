import { useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Barchart = function ({ data }) {
    useEffect(()=>{
        console.log(data);
        
    },[]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  shadow-lg rounded-lg">
      <h1 className="text-white text-3xl font-extrabold mb-3">Real vs Fake Data</h1>
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          dataKey="score"
          nameKey="label"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.label === "Real" ? "#0aa132" : "#d91818"} // Green for Real, Red for Fake
              className="transition-transform duration-300 hover:scale-110"
            />
          ))}
        </Pie>
        <Tooltip formatter={(_, __, payload) => payload[0]?.payload.label} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Barchart;
