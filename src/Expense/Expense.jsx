import { useState } from "react";
import styles from './Expense.module.css'

function Expense({detail, amount ,paidBy , involved}){


    return (
        <div className={styles.exBox}>
            <p>{detail}</p>
            <p> Amount: {amount} </p>
            <p>Paid by : {paidBy}</p>
            <p>Persons involved:</p>
            <ul>
                {involved.map((inv,index) => <li key={index}>  {inv} </li>)}
            </ul>
        </div>

    );

}

export default Expense