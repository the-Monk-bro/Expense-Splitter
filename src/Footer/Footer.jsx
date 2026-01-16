import styles from './Footer.module.css'


function Footer(){
    return (
        <footer>
            <p  className={styles.foot}> &copy; {new Date().getFullYear()} ExpenseSpliiterMG </p>
        </footer>
    );
}

export default Footer