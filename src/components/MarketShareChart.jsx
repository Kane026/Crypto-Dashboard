import { Pie, PieChart, Sector, ResponsiveContainer, Cell } from 'recharts';
import {useState} from 'react';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'
];

const renderActiveShape = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={12} fontWeight="bold">
        {payload.name}
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>
        {`$${(value / 1e9).toFixed(2)}B`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={10}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default function MarketShareChart({ coins }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = coins.slice(0, 10).map((coin, index) => ({
    name: coin.name,
    value: coin.market_cap,
    fill: COLORS[index % COLORS.length]
  }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape} 
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}