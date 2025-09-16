"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import styles from '../get.module.css'
import Link from "next/link";

export default function CommentDetail() {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState(false);

    const params = useParams();
    const commentId = params.id;

    const fetchComment = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComment();
    }, [commentId]);

    if (loading) {
        return <p className={styles.loading}>Carregando...</p>;
    }

    if (error) {
        return <p className={styles.error}>Ocorreu um erro ao buscar o comentário.</p>;
    }
     if (!comment) {
        return <p className={styles.error}>Comentário não encontrado.</p>;
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Detalhes do Comentário</h1>
            <div className={styles.commentDetail}>
                <h3><strong>Nome:</strong> ({comment.name})</h3>
                <h3><strong>Email:</strong> {comment.email}</h3>
                <p><strong>Comentário:</strong> {comment.body}</p>
            </div>
            <Link href="/get" className={styles.backLink}>⭠ Voltar para a lista de comentários</Link>
        </main>
    );
}
