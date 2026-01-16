import styles from './App.module.css';
import Header from "./Header/Header";
import Footer from './Footer/Footer';

import Group from "./Group/Group";

function App() {

  return (
    <div className={styles.page}>
      <Header></Header>
      <main className={styles.content}> 
        <Group></Group>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App
