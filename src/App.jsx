import styles from './App.module.css';
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import Split from './Split/Split.jsx';
import { useState, useEffect } from 'react';

import Expense from "./Expense/Expense.jsx";


function App() {

  //Adding members
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("members");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members])


  const [addInput, setAddInput] = useState(false);
  const [addButtonMsg, setAddButtonMsg] = useState("Add Member");
  const [name, setName] = useState("");

  const addMember = () => {
    setAddInput(!addInput);
    addInput ? setAddButtonMsg("Add Member") : setAddButtonMsg("Cancel");
  }
  const submitMember = () => {
    if (name.trim() === "") return;
    setMembers([...members, { name: name, given: 0, haveToGive: 0 }]);
    setAddInput(false);
    setAddButtonMsg("Add Member");
    setName("");
  }

  const enterOnAdd = (e) => {
    if (e.key == 'Enter') {
      submitMember();
    }
  }


  //Adding expense
  const [detail, setDetail] = useState("");

  const [amount, setAmount] = useState("");


  const [paidBy, setPaidBy] = useState("");
  const handlePaidByChange = (e) => {
    setPaidBy(e.target.value);
  }

  const [involved, setInvolved] = useState([]);
  const handleCheck = (m) => {
    setInvolved(prev => prev.includes(m) ? prev.filter(mem => mem !== m) : [...prev, m])
  }


  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  })


  const addExpense = () => {
    if (detail !== "" && amount !== "" && paidBy !== "" && involved.length > 0) {
      setExpenses([...expenses, { detail, amount, paidBy, involved }])
      setMembers(prev => prev.map(m => m.name === paidBy ? { ...m, given: m.given + amount } : { ...m }));
      setMembers(prev => prev.map(m => involved.includes(m.name) ? { ...m, haveToGive: m.haveToGive + amount / involved.length } : { ...m }))
      setDetail("");
      setAmount("");
      setPaidBy("");
      setInvolved([]);
    }
    else {
      alert("Please fill all the fields of expense to add one.");
    }
  }



  //Utility functions

  const clearAll = () => {
    setExpenses([]);
    setMembers([]);
    setShowSplit(false);
  }

  const [showSplit, setShowSplit] = useState(false);


  return (
    <>
      <Header></Header>
      <div className={styles.page}>


        <aside className={styles.sidebar}>

          <div className={styles.section}>
            <button onClick={addMember}>{addButtonMsg}</button>
            {addInput && (
              <div className={styles.inputGroup}>
                <input
                  type='text'
                  placeholder='Enter member name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => enterOnAdd(e)}
                />
                <button className={styles.actionButton} onClick={submitMember}>Add</button>
              </div>
            )}
          </div>

          <div className={styles.section}>
            <input type='text' value={detail} placeholder='Enter expense detail' onChange={(e) => setDetail(e.target.value)} />
            <input type='number' value={amount} placeholder='Enter expense amount' onChange={(e) => setAmount(Number(e.target.value))} />
            <select value={paidBy} onChange={(e) => handlePaidByChange(e)}>
              <option value="">Select paid by</option>
              {members.map((m, index) => <option key={index} value={m.name}> {m.name} </option>)}
            </select>
            {members.length !== 0 && <p>Select persons involved:</p>}
            <ul>
              {members.map((m, index) => <li key={index}><input value={m.name} type='checkbox' checked={involved.includes(m.name)} onChange={() => handleCheck(m.name)} /> {m.name} </li>)}
            </ul>
            <button onClick={addExpense}> Add Expense</button>
            <button onClick={() => setShowSplit(true)}>Split</button>
            <button onClick={clearAll}> Clear All</button>

          </div>

        </aside>


        <main className={styles.content}>

          <ul>
            {expenses.map((e, index) =>
              <li key={index}>
                <Expense detail={e.detail} amount={e.amount} paidBy={e.paidBy} involved={e.involved}> </Expense>
              </li>)}
          </ul>
          <br></br>
          {showSplit && <Split members={members}></Split>}
        </main>

      </div>
      <Footer> </Footer>
    </>
  );
}

export default App
