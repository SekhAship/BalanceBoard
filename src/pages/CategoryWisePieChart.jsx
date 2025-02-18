import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const processCategoryData = (transactions) => {
  const categoryData = {};

  // Process transactions into category data
  transactions.forEach((transaction) => {
    const { tag, amount, type } = transaction;
    if (type === 'expense') {
      if (!categoryData[tag]) {
        categoryData[tag] = 0;
      }
      categoryData[tag] += amount;
    }
  });

  // Convert category data object into an array
  return Object.keys(categoryData).map((tag) => ({
    name: tag,
    value: categoryData[tag],
  }));
};

const CategoryWisePieChart = ({ transactions }) => {
  const categoryExpensesData = processCategoryData(transactions);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#DA70D6'];

  return (
    <ResponsiveContainer width="100%" height={400}>
        {/* Title */}
      <h2 className="text-2xl font-semibold mt-6">Pie Chart</h2>
      <PieChart>
        <Pie
          data={categoryExpensesData}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {categoryExpensesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryWisePieChart;
