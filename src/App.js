import logo from './logo.svg';
import AddBalanceModal from './components/AddBalanceModal';
import './App.css';
import React, { useEffect, useState } from "react";
import WalletCard from './components/WalletCard';
import AddExpenseModal from './components/AddExpenseModal';
import ExpenseList from './components/ExpenseList';
import EditExpenseModal from './components/EditExpenseModal';
import ExpensePieChart from './components/ExpensePieChart';
import ExpenseBarChart from './components/ExpenseBarChart';
import ExpenseCard from './components/ExpenseCard';

function App() {

  const [walletBalance,setWalletBalance]=useState(()=>{
    const storedBalance=localStorage.getItem("walletBalance");
    if(storedBalance==null){
      return 5000;
    }
    return Number(storedBalance);
  });
  const [showBalanceModal,setShowBalanceModal]=useState(false);
  const [showExpenseModal,setShowExpenseModal]=useState(false);
  const [expenses,setExpenses]=useState(()=>{
    const storedExpenses=localStorage.getItem("expenses");
    if(!storedExpenses){
      return [];
    }

    return JSON.parse(storedExpenses);
  });
  const [editingExpense,setEditingExpense]=useState(null);

  function handleAddIncome(amount){
    const value=Number(amount);
    if(!value || value <= 0){
      return false;
    }
    setWalletBalance((currentBalance)=> currentBalance+value);
    return true;
  }

  function handleAddExpense(expense){
    const price=Number(expense.price);
    if(!price || price<=0){
      return false;
    }
    if(price>walletBalance){
      window.alert("Insufficient wallet balance");
      return false;
    }
    const newExpense={
      id: Date.now(),
      title:expense.title,
      price:price,
      category:expense.category,
      date:expense.date
    };

    setExpenses((currentExpenses)=>[
      ...currentExpenses,
      newExpense
    ]);

    setWalletBalance((currentBalance)=>currentBalance-price);

    setShowExpenseModal(false);
    return true;
  }

  function handleDeleteExpense(id){
    const expenseToDelete= expenses.find((expense)=>expense.id===id);
    if(!expenseToDelete){
      return;
    }
    setExpenses((currentExpenses)=>currentExpenses.filter((expense)=>expense.id !== id));
    setWalletBalance((currentBalance)=>currentBalance + Number(expenseToDelete.price));
  }

  function handleEditExpense(expense){
    setEditingExpense(expense);
  }

  function handleUpdateExpense(updatedExpense){
    const oldExpense=expenses.find((expense)=>expense.id===updatedExpense.id);
    if(!oldExpense){
      return;
    }

    const oldPrice=Number(oldExpense.price);
    const newPrice=Number(updatedExpense.price);
    const priceDifference=newPrice-oldPrice;
    if(priceDifference>walletBalance){
      window.alert("Insufficient wallet balance");
      return;
    }

    setExpenses((currentExpenses)=>currentExpenses.map((expense)=>{
      if(expense.id !== updatedExpense.id){
        return expense;
      }
      return{
        ...expense,
        title:updatedExpense.title,
        price:updatedExpense.price,
        category:updatedExpense.category,
        date:updatedExpense.date
      }
    }));
    setWalletBalance((currentBalance)=>currentBalance-priceDifference);
    setEditingExpense(null);
  }

  useEffect(()=>{
    localStorage.setItem("walletBalance",String(walletBalance));
  },[walletBalance]);

  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expenses));
  },[expenses]);

  return (
    <div className="App">
      <header className='app-header'>
         <h1>Expense Tracker</h1>
         <p>Track your expenses and manage your wallet</p>

      </header>

      <main className='app-content'>
        <section className='dashboard-top'>
           <WalletCard walletBalance={walletBalance} onAddIncome={()=>setShowBalanceModal(true)}/>
           <ExpenseCard expenses={expenses} onAddExpense={()=>setShowExpenseModal(true)}/>
           <ExpensePieChart expenses={expenses}/>
        </section>
        <section className="dashboard-bottom">
           <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense}/>
           <ExpenseBarChart expenses={expenses}/>

        </section>
      </main>


      {showBalanceModal &&(
        <AddBalanceModal onAddIncome={handleAddIncome} onClose={()=>setShowBalanceModal(false)}/>
      )}

      {showExpenseModal &&(
        <AddExpenseModal onAddExpense={handleAddExpense} onClose={()=>setShowExpenseModal(false)}/>
      )} 
      {editingExpense &&(
        <EditExpenseModal expense={editingExpense} onUpdateExpense={handleUpdateExpense} onClose={()=>setEditingExpense(false)}/>
      )

      }
    </div>
  );
}

export default App;
