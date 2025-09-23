import Link  from "next/link";
import styles from './page.module.css'
import Image from 'next/image';

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
          <div className={styles.heroSection}>
            <Image
              src="/images/hero.png"
              alt="Hero Image"
              width={600}
              height={400}
              className={styles.heroImage}
            />        
            <div className={styles.heroText}>
              <h2>Bienvenido a la Aplicación CRUD</h2>
              <p>Explora las funcionalidades de Crear, Leer, Actualizar y Eliminar comentarios.</p>
            </div>
          </div>
        </main>
    )
}
