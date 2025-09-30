import styles from './page.module.css';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>404 - Página Não Encontrada</h1>
            <p className={styles.description}>A página que você está procurando não existe.</p>
            <Link href="/" className={styles.homeLink}>Voltar para a página inicial</Link>
        </main>
    );
}