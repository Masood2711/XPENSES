import React from "react";

function WalletCard({walletBalance,onAddIncome}){
    return(
        <section className="wallet-card">
            <h2>
                Wallet Balance
            </h2>
            <div className="wallet-amount">
              ₹{walletBalance.toFixed(2)}
            </div>
            <button type="button" onClick={onAddIncome}>
                + Add Income
            </button>
        </section>
    )
}

export default WalletCard;