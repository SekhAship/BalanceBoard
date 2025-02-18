import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Example transaction data from the server
const transactions = [
  { id: '2rVaiOPWhSLLhPWKoX20', type: 'income', tag: 'salary', name: 'aman', date: '2025-02-17', amount: 10 },
  { id: 'DKLnZhd2ojuHgiKAp3GU', tag: 'freelance', name: 'aman', amount: 10, date: '2025-02-17', type: 'income' },
  { id: 'Ewf9ADCcjcOavVM6zcs3', amount: 200, name: 'car', date: '2025-02-26', type: 'income', tag: 'freelance' },
  { id: 'VlEtjjql3TCtEOxnJGBV', amount: 22, tag: 'freelance', name: 'riya', type: 'income', date: '2025-02-17' },
  { id: 'gssbr9EE4TfLUChRMstK', name: 'man', type: 'income', amount: 11, tag: 'salary', date: '2025-02-17' },
  { id: 'hm5OQkv2CWoM3EAuPUmP', name: 'aman', date: '2025-02-17', tag: 'freelance', type: 'income', amount: 222 },
  { id: 'lNqNaAQJVvv34yCCY6Wy', amount: 250, tag: 'education', type: 'expense', date: '2025-02-17' },
  { id: 'tcUh6ZH0dpETgJ9ssQbk', date: '2025-02-17', tag: 'salary', amount: 23, type: 'income' },
];

const processData = (transactions) => {
  const monthlyData = {};

  // Process transactions into monthly data
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

    if (transaction.type === 'expense') {
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += transaction.amount;
    }
  });

  // Convert monthly data object into an array and sort it by date
  const sortedData = Object.keys(monthlyData).map((month) => ({
    month,
    expense: monthlyData[month],
  }));

  sortedData.sort((a, b) => {
    const aDate = new Date(`${a.month} 1`);
    const bDate = new Date(`${b.month} 1`);
    return aDate - bDate; // Sort by date ascending
  });

  return sortedData;
};

const MonthlyExpensesBarChart = ({ transactions }) => {
  const monthlyExpensesData = processData(transactions);

  return (
    <div>
       {/* Title */}
       <h2 className="text-2xl font-semibold mb-4 mt-6">Bar Chart</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={monthlyExpensesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesBarChart;
