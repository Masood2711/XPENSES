import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({expenses,onDelete,onEdit}){
    return(
        <section className="expense-list-section">
            <div className="section-header">
                <h2>Recent Transactions</h2>
                {expenses.length===0?(
                    <div className="empty-expenses">
                        <p>No transactions!</p>
                        <p>Add an expense to see it here</p>
                    </div>
                ):(
                    <div className="expense-items">
                        {expenses.map((expense)=>(
                            <ExpenseItem key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete}/>
                        ))}
                    </div>
                )}
            </div>

        </section>
    )
}

export default ExpenseList;
