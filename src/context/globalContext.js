import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // Helper to get token from localStorage
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Add income
const addIncome = async (income) => {
  const payload = {
    title: income.title,
    amount: parseFloat(income.amount), // make sure it's a number
    date: income.date ? new Date(income.date).toISOString() : null,
    category: income.category,
    description: income.description || "", // provide empty string if not set
  };

  try {
    await axios.post(`${BASE_URL}add-income`, payload, getAuthHeader());
    getIncomes();
    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to add income");
  }
};


  // Get incomes
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`, getAuthHeader());
      setIncomes(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch incomes");
    }
  };

  // Delete income
  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthHeader());
      getIncomes();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete income");
    }
  };

  // Add expense (matches your schema)
  const addExpense = async (expense) => {
    const payload = {
      title: expense.title,
      amount: parseFloat(expense.amount),
      date: expense.date ? new Date(expense.date).toISOString() : null,
      category: expense.category,
      description: expense.description || "",
    };

    try {
      await axios.post(`${BASE_URL}add-expense`, payload, getAuthHeader());
      getExpenses();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  // Get expenses
  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`, getAuthHeader());
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch expenses");
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthHeader());
      getExpenses();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
    }
  };

  // Calculate total income
  const totalIncome = () => {
    return incomes.reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Calculate total expenses
  const totalExpenses = () => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Calculate balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // Transaction history (latest 3)
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};