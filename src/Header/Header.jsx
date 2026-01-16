import styles from './Header.module.css';

function Header(){
    return (
        <header className={styles.header}>
            <h1 className={styles.heading}>Expense Splitter</h1>
            <button className={styles.newGroupbutton}>New group</button>
    
        </header>
    )
}

export default Header