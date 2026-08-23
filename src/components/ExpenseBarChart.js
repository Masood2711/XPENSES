import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import {getCategoryTotals} from "../utils/expenseUtils";

function ExpenseBarChart({expenses}){
    const categoryTotals=getCategoryTotals(expenses);

    const chartData=Object.entries(categoryTotals).map(([category,value])=>({
        category,value
    }))

    return(
        <div className='chart-card'>
            <div className="bar-chart">
                <h2>Top Expenses</h2>
                {chartData.length===0?(
                    <p>No expense data available</p>
                ):(
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{top:20,right:20,left:10,bottom:20}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="category"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="value" name="Expense"/>
                        </BarChart>
                    </ResponsiveContainer>
                )}

            </div>
        </div>
    )
}

export default ExpenseBarChart;