import React , {useState} from "react";

function AddExpenseModal({onAddExpense,onClose}){
    const [form,setForm]=useState({
        title:"",
        price:"",
        category:"",
        date:"",
    });

    function handleChange(event){
        const {name,value}=event.target;

        setForm((currentForm)=>({
            ...currentForm,
            [name]:value,
        }))
    }

    function handleSubmit(event){
        event.preventDefault();

        const title=form.title.trim();
        if(!title || !form.price || !form.category || !form.date){
            window.alert("Please fill all required fields");
            return;
        }
        const price=Number(form.price);
        if(!Number.isFinite(price)|| price<=0){
            window.alert("Please enter a valid expense amount");
            return;
        }
        const expenseData={title:title,price:price,category:form.category,date:form.date,}
        const success=onAddExpense(expenseData);
        if(success){
            setForm({
                title:"",
                price:"",
                category:"",
                date:"",
            });
        }
    }


    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Expenses</h2>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange}/>
                    <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange}/>
                    <select name="category" value={form.category} onChange={handleChange}>
                        <option value="">
                            Select Category
                        </option>
                        <option value="Food">
                            Food
                        </option>
                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Travel">
                            Travel
                        </option>
                    </select>
                    <input type="date" name="date"  value={form.date} onChange={handleChange}/>
                    <div className="modal-actions">
                        <button type="submit" className="modal-primary-button">
                           Add Expense
                        </button>
                        <button type="button" className="modal-secondary-button" onClick={onClose}>
                           Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddExpenseModal;