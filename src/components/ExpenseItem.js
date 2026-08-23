import React from "react";

function ExpenseItem({
    expense,
    onEdit,
    onDelete
}) {
    function handleDelete(){
        onDelete(expense.id);
    }

    function handleEdit(){
        onEdit(expense);
    }

    return(
        <div className="expense-item">
            <div className="expense-item-left">
                
                <div className="expense-details">
                    <h3>
                        {expense.title}
                    </h3>
                    <p>
                        {expense.category}
                        {" * "}
                        {expense.date}
                    </p>
                </div>
            </div>
            <div className="expense-item-right">
                <strong>
                   ₹{expense.price.toFixed(2)}
                </strong>
                <button type="button" className="edit-button"  onClick={handleEdit}>
                    Edit
                </button>
                <button type="button" className="delete-button"  onClick={handleDelete}>
                    Delete     
                </button>
            </div>
        </div>
    )
}

export default ExpenseItem;