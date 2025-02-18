import { Table, Modal, Input } from "antd";
import React, { useState } from "react";
import { Search } from "lucide-react";

const TransactionTable = ({ transactions, onDelete, onEdit }) => {
  const [search, setSearch] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({});

  // Open Edit Modal
  const handleEditClick = (transaction) => {
    if (!transaction || !transaction.id) return; 
    setSelectedTransaction(transaction);
    setEditedTransaction(transaction);
    setEditModalVisible(true);
  };

  // Handle Edit Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Edited Transaction
  const handleSaveEdit = () => {
    onEdit(selectedTransaction.id, editedTransaction);
    setEditModalVisible(false);
  };

  const handleDeleteClick = (id) => {
    onDelete(id); 
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2">
          <button onClick={() => handleEditClick(record)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={() => handleDeleteClick(record.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      ),
    },
  ];

  const filterTransactions = transactions
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .map((item, index) => ({
      ...item,
      key: item.id || index,
    }));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 mt-6">📊 My Transactions</h2>
      <div className="relative mt-5 w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-700 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <Table
        className="mt-6"
        dataSource={filterTransactions}
        columns={columns}
        pagination={{ pageSize: 6 }}
      />

      {/* Edit Transaction Modal */}
      <Modal
        title="Edit Transaction"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleSaveEdit}
      >
        <div className="flex flex-col space-y-3">
          <Input
            name="name"
            value={editedTransaction.name}
            onChange={handleEditChange}
            placeholder="Name"
          />
          <Input
            name="amount"
            value={editedTransaction.amount}
            onChange={handleEditChange}
            placeholder="Amount"
            type="number"
          />
          <Input
            name="tag"
            value={editedTransaction.tag}
            onChange={handleEditChange}
            placeholder="Tag"
          />
          <Input
            name="date"
            value={editedTransaction.date}
            onChange={handleEditChange}
            placeholder="Date"
            type="date"
          />
          <Input
            name="type"
            value={editedTransaction.type}
            onChange={handleEditChange}
            placeholder="Type"
          />
        </div>
      </Modal>
    </div>
  );
};

export default TransactionTable;
