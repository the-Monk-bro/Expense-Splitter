import styles from './App.module.css';
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import { useState } from 'react';


import Expense from "./Expense/Expense.jsx";


function App() {

  //Adding members
  const [members,setMembers] = useState(["Mayank", "Asim"]);
  const [addInput, setAddInput]= useState(false);
  const [addButtonMsg, setAddButtonMsg]= useState("Add Member");
  const [name,setName] = useState("");

  const addMember = ()=> {
    setAddInput(!addInput);
    addInput? setAddButtonMsg("Add Member") : setAddButtonMsg("Cancel");
  }
  const enterOnAdd =(e)=>{
    if (e.key=='Enter'){
      setMembers([...members, name]);
      setAddInput(false);
      setAddButtonMsg("Add Member");
      setName("");
    }
  }

  //Adding expense
  const [detail, setDetail] = useState("");

  const [amount, setAmount] = useState("");


  const [paidBy,setPaidBy] = useState("");
  const handlePaidByChange = (e)=> {
    setPaidBy(e.target.value);
  }

  const [involved,setInvolved]= useState([]);
  const handleCheck= (m)=> {
    setInvolved(prev => prev.includes(m) ? prev.filter(mem => mem !== m) : [...prev, m])
  }


  const [expenses, setExpenses] = useState([]);


  const addExpense =()=> {
    setExpenses([...expenses,{detail,amount,  paidBy, involved } ])
    setDetail("");
    setAmount("");
    setPaidBy("");
    setInvolved([]);

  }

  

  return (
    <>
    <Header></Header>
    <div className={styles.page}>
      

      <aside className={styles.sidebar}>

        <div>
          <button onClick={addMember}>{addButtonMsg}</button>
          {addInput && <input type='text' placeholder='Enter member name' onChange={(e)=> setName(e.target.value)} onKeyDown={(e)=> enterOnAdd(e)} />}
        </div>
    
        <div>
          <input type='text' value={detail} placeholder='Enter expense detail' onChange={(e) => setDetail(e.target.value)} />
          <input type='number' value={amount} placeholder='Enter expense amount' onChange={(e)=> setAmount(Number(e.target.value))} />
          <select value={paidBy} onChange={(e) => handlePaidByChange(e)}>
            <option value="">Select paid by</option>
            {members.map(m=> <option value={m}> {m} </option>)}
          </select>
          <p>Select persons involved:</p>
          <ul>
            {members.map((m,index)=><li key={index}><input value={m} type='checkbox' checked={involved.includes(m)} onChange={()=> handleCheck(m)}/> {m} </li> )}
          </ul>
          <button onClick={addExpense}> Done</button>
        </div>

      </aside>


      <main className={styles.content}>
        <ul>
          {expenses.map((e,index)=> 
          <li key={index}>
            <Expense detail={e.detail} amount={e.amount} paidBy={e.paidBy} involved={e.involved}> </Expense>
          </li>)}
        </ul>
      </main>

    </div>
    </>
  );
}

export default App
