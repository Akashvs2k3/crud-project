import React, { useState } from 'react';
import { useAddTransaction } from "../Hooks/useAddTransaction";
import { useGetTransaction } from "../Hooks/useGetTransaction";
import { useGetUserInfo } from "../Hooks/useGetUserInfo";
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useNavigate } from 'react-router-dom';
import img from './img/confetti-doodles.png'
import './expense.css'

function Expense() {
  const { addTransaction } = useAddTransaction();
  const { transaction,transactionTotal } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionType, setTransactionType] = useState("expense");
const {balance,income,expense} =transactionTotal
  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("")
  
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
      localStorage.clear();
  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='b'>
    <h1 className='Heading'>{name}  -  Expense Tracker</h1>
      <div className="expense-track">
      <div className="cointainer">
                
                <div className="balance">
                    <h3>Your Balance</h3>
                    {balance >= 0? <h2>${balance}</h2> : <h2>-${balance * -1} </h2>}
                    
                </div>
                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>${income}</p>
                    </div>
                    <div className="expenses">
                    <h4>Expenses</h4>
                        <p>${expense}</p>
                    </div>
                </div>
                <form action="" className="add-transaction" onSubmit={onSubmit}>
                    <input 
                    type="text" 
                    placeholder='Description'
                    value={description} 
                    required  
                    onChange={(e)=>setDescription(e.target.value)}
                    />
                    <input 
                    type="number" 
                    placeholder='Amount' 
                    value={transactionAmount}
                    required 
                     onChange={(e)=>setTransactionAmount(e.target.value)}
                     />
                    <input 
                    type="radio" 
                    id='expense' 
                    value="expense" 
                    checked={transactionType === "expense"}
                    onChange={(e)=>setTransactionType(e.target.value)}
                   />
                  
                    <label htmlFor="expense">Expenses &nbsp;&nbsp;</label>
                    <input 
                    type="radio" 
                    id='income' 
                    value="income"
                    checked={transactionType === "income"}
                    onChange={(e)=>setTransactionType(e.target.value)}
                     />
                    <label htmlFor="income">Income &nbsp;&nbsp;&nbsp;&nbsp;</label>

                    <button type='submit' className='button-69'>Add Transaction</button>

                </form>  
        </div>
        <div className='pro'> {profilePhoto && <div > <img src={profilePhoto} alt="" className='profile'/> </div>}
        <button className='siginout-btn' onClick={signUserOut}>Sign Out</button>
        </div>
      </div>
      {/* Downside */}
      <div className="transaction">
        <h3 className='Sub-head'>Transactions</h3>
        <ul>
          {transaction.map((a) =>  {
            const { description, transactionAmount, transactionType } = a;
            return (
             
              <li key={a.id}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} . <label
                    style={{ color: transactionType === "expense" ? "red" : "green" }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    
      </div>
  );
}



    

export default Expense;
