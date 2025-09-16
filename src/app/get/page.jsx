"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from './get.module.css'

export default function GetPage() {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);

    const router = useRouter();

    const fecthComments = async () => {
        setLoading(true);

        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentários:", error);
        } finally {
            setLoading(false);
        }
    }

    const navegateToComment = (commentId) => {
        router.push(`/get/${commentId}`);
    }

    useEffect(() => {
        fecthComments();
    }, []);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>GET - Comentários</h1>
            <nav className={styles.nav}>
            <Link href="/get" className={styles.navLink}>GET</Link>
            <Link href="/post" className={styles.navLink}>POST</Link>
            <Link href="/put" className={styles.navLink}>PUT</Link>
            <Link href="/delete" className={styles.navLink}>DELETE</Link>
          </nav>

            <h2 className={styles.subtitle}>Listagem de comentários</h2>
            <h3>{comments.length} Comentários Encontrados</h3>
            {loading ? (
                <p className={styles.loading}>Carregando...</p>
            ) : (
                <ul className={styles.commentList}>
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            className={styles.commentItem}
                            onClick={() => navegateToComment(comment.id)}
                        >
                            <h3><strong>Nome:</strong> ({comment.name})</h3>
                            <h3><strong>Email:</strong> {comment.email}</h3>
                            <p><strong>Comentário:</strong> {comment.body}</p>
                        </li>
                    ))}
                </ul>
            )}
            {error && <p className={styles.error}>Ocorreu um erro ao buscar os comentários.</p>}    
        </main>
    )
}
