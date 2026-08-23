import React from 'react';

import {PieChart,Pie,Tooltip,Legend,ResponsiveContainer,Cell} from "recharts";
import {getCategoryTotals} from "../utils/expenseUtils";

function ExpensePieChart({expenses}){
    const COLORS=["#a000ff","#ff9800","#ffe000"];

    const categoryTotals=getCategoryTotals(expenses);
    const chartData=Object.entries(categoryTotals).map(([category,value])=>({
        category,value
    }))

    return(
        <div className='chart-card'>
            <div className="pie-chart-content">
                <h2>Expense Summary</h2>
                {chartData.length===0?(
                    <p>No expense data available</p>
                ):(
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="category" cx="50%" cy="45%" outerRadius={70} label>
                                {chartData.map((entry,index)=>(
                                    <Cell key={entry.category} fill={COLORS[index]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}

export default ExpensePieChart;