import React , {useState} from "react";

function AddBalanceModal({onAddIncome,onClose,}){
    const [amount,setAmount]=useState("");

    function handleSubmit(event){
        event.preventDefault();

        const numericAmount=Number(amount);

        if(!amount ||  !Number.isFinite(numericAmount)|| numericAmount <= 0){
            window.alert("Please enter a valid amount");

            return;
        }

        onAddIncome(numericAmount);
        setAmount("");
    }

    return(
        <div className="modal-overlay">
            <div className="modal" role="dialog" aria-model="true" aria-labelledby="add-income-title">
                <div className="modal-header">
                    <h2 id="add-income-title">
                        Add Balance
                    </h2>
                    <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <label htmlFor="income-amount">Income Amount</label>
                    <input id="income-amount" type="number" placeholder="Income Amount" value={amount} onChange={(event) =>setAmount(event.target.value)} min="0"  step="0.01"/>
                    <div className="modal-actions">
                        <button type="submit" className="primary-button">
                           Add Balance
                        </button>
                        <button type="button" className="secondary-button" onClick={onClose}>
                           Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBalanceModal;