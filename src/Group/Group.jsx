import styles from './Group.module.css'
import { useState } from 'react';
import { useMemo } from 'react';
import PropTypes, { symbol } from 'prop-types';


function Group({grp, onUpdate}){
    //Variables and functions for editing Occasion name
    const [occasionName,setOccasionName] = useState ("New Occasion");
    const [editInput, setEditInput] = useState(false);

    const handleEdit =()=>{
        setEditInput(true);
    }
    const enterOnEdit =(e) => {
        if (e.key==="Enter"){
            onUpdate(prev => prev.map(item => item.gid===grp.gid? {...item, name:occasionName}: item))
            setOccasionName("");
            setEditInput(false);
        }
    }

    const handleRemove =()=>{
        onUpdate(prev=> prev.filter(item => item.gid!==grp.gid))
    }


    //Varaibles and functions for adding new member in a group
    const [members,setMembers] = useState([]);

    const [addInput, setAddInput]= useState(false);
    const [addButtonMsg, setAddButtonMsg]= useState("Add Member");
    const [name,setName] = useState("");
   
    const handleAddButtonClick= ()=>{
        setAddInput(!addInput);
        addInput? setAddButtonMsg("Add Member") : setAddButtonMsg("Cancel");
    }
    const enterOnAdd=(e)=>{
        if (e.key==="Enter" && name.trim()!==""){
            setMembers([...members,{id: Date.now(), name:name, contribution:0 , net:0}]);
            setAddInput(false);
            setAddButtonMsg("Add Member");
            setName("");
        }
    }

  

    //Split calculations
    const [total,setTotal] = useState(0);
    const share = useMemo (()=> {
        return total/members.length;
    } , [total,members.length]);

    const split =()=>{
        setTotal(0);
        members.forEach(m => setTotal(t=> t+m.contribution));
        setMembers(prev=> prev.map(item => ({...item, net:share })));
    }

   


   
    
    //Returning the U
    return (
        <div className={styles.groupBox}>

            <header className={styles.header}>
                {!editInput && <h2 className={styles.occasion}>{grp.name}</h2> }
                {!editInput && <button onClick={handleEdit} className={styles.editButton}>Edit group name</button>}
                {!editInput && <button onClick={handleRemove} className={styles.editButton}>Remove group</button>}
                {editInput && <input placeholder='Enter new name' className={styles.editOccasion} onChange={(e)=> setOccasionName(e.target.value)} onKeyDown={(e)=> enterOnEdit(e)}/> }
            </header>

            <ul className={styles.memList}>
                {members.map(m => <Member  
                                    mem = {m}
                                    key={m.id}
                                    onUpdate={setMembers} />)} 
            </ul>


            

            <footer className={styles.footer}>
                <button className={styles.addButton} onClick={handleAddButtonClick}>{addButtonMsg}</button>
                {addInput && <input className={styles.nameInput} placeholder='Enter name' onChange={(e)=> setName(e.target.value)} onKeyDown={(e)=> enterOnAdd(e)}/>}
                <div className={styles.space}></div>

                <button onClick={split} className={styles.splitButton}>Split</button>
            </footer>

            <div>
                <p>Total: {total}</p>
                <ul>
                   {members.map(m=> <li>{m.name} : {m.contribution- m.net}</li>)}
                </ul>
            </div>
        
        </div>
       
    );

}


function Member({mem,onUpdate}){
    //Variables and functions for changing amount contributed by the member
    const [amount, setAmount] = useState("");

    const handleAppend =()=>{
        if (amount!==""){
            onUpdate(prev=> prev.map(item=> item.id===mem.id? {...item, contribution: item.contribution+amount}: item));
            setAmount("");
        }
       
    }
    const handleChangeAmount=(e)=>{
        setAmount(Number(e.target.value)); 
    }
    const handleKick =()=> {
        onUpdate(prev => prev.filter(item => item.id !== mem.id));
    }

    //Returning the UI
    return (
        <li className={styles.mem}>
            <div className={styles.memName}> {mem.name}</div>
            <div className={styles.contri}>{mem.contribution}</div>
            <input className={styles.amountInput} type='number' value={amount} step={10} min={0} onChange={(e)=> handleChangeAmount(e)} />
            <button className={styles.appendButton} onClick={handleAppend}>Append</button>
            <button className={styles.kickButton} onClick={handleKick}>Kick</button>
        </li>

    );
}
Member.propTypes={
    name: PropTypes.string,
}


export default Group;