import Navbar from "../components/headers/Navbar";
import Footer from "../components/footers/footer";
import { useEffect, useState } from "react";
import { Modal } from 'antd';
import AddIncomeModal from "../components/modals/AddIncome";
import AddExpenseModal from "../components/modals/AddExpence";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { fireDB } from "../firebase";
import TransactionTable from "../components/TransactionTable/TransactionTable";
import MonthlyExpensesBarChart from "./MonthlyExpensesBarChart";
import CategoryWisePieChart from "./CategoryWisePieChart";
import Card from "./Card";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenceModalVisible, setIsExpenceModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expence, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const showExpenceModal = () => setIsExpenceModalVisible(true);
  const showIncomeModal = () => setIsIncomeModalVisible(true);
  const handleExpanseCancel = () => setIsExpenceModalVisible(false);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);

  // Handle Delete Transaction
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, `BalanceBoard/z0tEqrnC7rZK3p273GRHJ0eO8pD3/transactions`, id));
      setTransactions((prevTransactions) => prevTransactions.filter((txn) => txn.id !== id));
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      toast.error("Error deleting transaction.");
      console.error("Error deleting document: ", error);
    }
  };

  // Handle Edit Transaction
  const handleEdit = async (id, editedTransaction) => {
    try {
      const transactionRef = doc(fireDB, `BalanceBoard/z0tEqrnC7rZK3p273GRHJ0eO8pD3/transactions`, id);
      const updatedTransaction = { ...editedTransaction, amount: Number(editedTransaction.amount) };
      await updateDoc(transactionRef, updatedTransaction);
      setTransactions((prevTransactions) =>
        prevTransactions.map((txn) => (txn.id === id ? { ...txn, ...updatedTransaction } : txn))
      );
      toast.success("Transaction updated successfully!");
    } catch (error) {
      toast.error("Error updating transaction.");
      console.error("Error updating document: ", error);
    }
  };

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((txn) => {
      const amount = Number(txn.amount); // Ensure amount is a number
      if (txn.type === "income") totalIncome += amount;
      else totalExpense += amount;
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // Fetch Transactions from Firebase
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = collection(fireDB, `BalanceBoard/z0tEqrnC7rZK3p273GRHJ0eO8pD3/transactions`);
      const snapshot = await getDocs(data);
      let transactionsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
      toast.error("Failed to load transactions.");
      setLoading(false);
    }
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const formattedTransaction = { ...transaction, amount: Number(transaction.amount) };
      const docRef = await addDoc(collection(fireDB, `BalanceBoard/z0tEqrnC7rZK3p273GRHJ0eO8pD3/transactions`), formattedTransaction);
      toast.success("Transaction Added!");
      setTransactions((prevTransactions) => [...prevTransactions, formattedTransaction]);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  return (
    <div className="max-w-[calc(100%-4cm)] mx-auto p-6">
    <div className="min-h-screen flex flex-col">
{/* Main Content */}
<Navbar />
{loading?(<p>Loading...</p>):(<>
  <Card
  income={income}
  expense={expence}
  balance={balance}

  showIncomeModal={showIncomeModal}
  showExpenceModal={showExpenceModal}
/>
<AddExpenseModal
isExpenseModalVisible={isExpenceModalVisible}
handleExpenseCancel={handleExpanseCancel}
onFinish={onFinish}
/>
<AddIncomeModal
isIncomeModalVisible={isIncomeModalVisible}
handleIncomeCancel={handleIncomeCancel}
onFinish={onFinish}
/>
</>)}
        
          <>
            <TransactionTable transactions={transactions} onDelete={handleDelete} onEdit={handleEdit} />
            <AddExpenseModal
              isExpenseModalVisible={isExpenceModalVisible}
              handleExpenseCancel={handleExpanseCancel}
              onFinish={onFinish}
            />
            <AddIncomeModal
              isIncomeModalVisible={isIncomeModalVisible}
              handleIncomeCancel={handleIncomeCancel}
              onFinish={onFinish}
            />
          </>
      
        <MonthlyExpensesBarChart transactions={transactions} />
        <CategoryWisePieChart transactions={transactions} />
        <div className="mt-10"></div>
        <Footer />
      </div>
    </div>
  );
}
