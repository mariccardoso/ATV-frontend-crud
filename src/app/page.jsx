import Link  from "next/link";
import styles from './page.module.css'
import Image from 'next/image';

export default function Home() {
    return (
        <main className={styles.main}>
          <h1 className={styles.title}>CRUD Completo</h1>
          <div className={styles.grid}>
            <Link href="/get" className={styles.card}>
              <h2>GET &rarr;</h2>
              <p>Busque comemtários consumindo API REST com GET</p>
            </Link>
            <Link href="/post" className={styles.card}>
              <h2>POST &rarr;</h2>
              <p>Crie comemtários consumindo API REST com POST</p>
            </Link>
            <Link href="/put" className={styles.card}>
              <h2>PUT &rarr;</h2>
              <p>Edite comemtários consumindo API REST com PUT</p>
            </Link>
            <Link href="/delete" className={styles.card}>
              <h2>DELETE &rarr;</h2>
              <p>Delete comemtários consumindo API REST com DELETE</p>
            </Link>
          </div>
        </main>
    )
}
