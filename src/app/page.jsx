import Link  from "next/link";
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
          <h1 className={styles.title}>CRUD Completo</h1>
          <nav className={styles.nav}>
            <Link href="/get" className={styles.navLink}>GET</Link>
            <Link href="/post" className={styles.navLink}>POST</Link>
            <Link href="/put" className={styles.navLink}>PUT</Link>
            <Link href="/delete" className={styles.navLink}>DELETE</Link>
          </nav>
        </main>
    )
}
