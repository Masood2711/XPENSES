export function getCategoryTotals(expenses){
    const categoryTotals={};

    expenses.forEach((expense) =>{
        if(!categoryTotals[expense.category]){
            categoryTotals[expense.category]=0;
        }
        categoryTotals[expense.category] +=Number(expense.price);
    });
    return categoryTotals;

}