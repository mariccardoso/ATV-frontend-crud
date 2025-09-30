"use client";
import axios from "axios";
import React, { useState } from "react";
import styles from './delete.module.css'
import Link from "next/link";

export default function Delete() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts/${commentId}`
            );
            setComment(response.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setSuccess(true);
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className={styles.main}>
            <h1 className={styles.title}>DELETE - Comentários</h1>
            <nav className={styles.nav}>
                <Link href="/get" className={styles.navLink}>GET</Link>
                <Link href="/post" className={styles.navLink}>POST</Link>
                <Link href="/put" className={styles.navLink}>PUT</Link>
                <Link href="/delete" className={styles.navLink}>DELETE</Link>
            </nav>
            <div className={styles.form}>
                <input
                    type="text"
                    id="commentId"
                    value={commentId}
                    placeholder="Digite o ID do comentário"
                    onChange={(e) => setCommentId(e.target.value)}
                    className={styles.input}
                />
                <button onClick={buscarComentario} className={styles.button} disabled={loading || !commentId}>
                    {loading ? "Buscando..." : "Buscar Comentário"}
                </button>
            </div>

            {comment && (
                <div className={styles.commentBox}>
                    <h2>Comentário Encontrado: {comment.id}</h2>
                    <p><strong>Nome:</strong> {comment.name}</p>
                    <p><strong>Email:</strong> {comment.email}</p>
                    <p><strong>Comentário:</strong> {comment.body}</p>
                    <button onClick={deletarComentario} className={styles.deleteButton} disabled={loading}>
                        {loading ? "Deletando..." : "Deletar Comentário"}
                    </button>
                </div>
            )}
            
            {error && <p>❌ Erro na operação</p>}
            {success && <p>✅ Comentário deletado com sucesso!</p>}

        </main>
    );
}