import React from "react";

function ExpenseCard({expenses,onAddExpense}){
    const totalExpenses=expenses.reduce((total,expense)=>total+Number(expense.price),0);
    return(
        <section className="expense-card">
            <h2>
                Expenses
            </h2>
            <div className="expense-total">
              ₹{totalExpenses.toFixed(0)}
            </div>
            <button type="button" onClick={onAddExpense}>
                + Add Expense
            </button>
        </section>
    )
}

export default ExpenseCard;