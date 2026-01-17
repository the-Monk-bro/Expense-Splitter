import styles from './App.module.css';
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import { useState } from 'react';

import Group from "./Group/Group";


function App() {
  const [groups, setGroups]= useState([]);

  const addGroup =()=>{
    setGroups(prev => [...prev, {gid:Date.now(), name:"New Group"}]);
  }

  return (
    <div className={styles.page}>
      <Header></Header>
      <main className={styles.content}> 
        {groups.map(g=> <Group grp={g} onUpdate={setGroups}/>)}
        <button onClick={addGroup} className={styles.newGroupbutton}>New group</button>
      </main>
      
      <Footer></Footer>
    </div>
  );
}

export default App
