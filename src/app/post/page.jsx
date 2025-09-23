"use client";
import { useState } from "react";
import axios from "axios";
import styles from './post.module.css'
import Link from "next/link";

export default function PostPage() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: ""
    });
    const [error, setError] = useState(false);

    const createNewComment = async () => {
        setLoading(true);

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.body.trim(),
            });

            setAddedComment([response.data, ...addedComment]);
            setForm({ name: "", email: "", body: "" });

        } catch (error) {  
            setError(true);
            console.error("Erro ao adicionar comentário:", error);
        } finally {
            setLoading(false);
    }
    }

    const updateForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>POST - Adicionar Comentário</h1>
            <nav className={styles.nav}>
                <Link href="/get" className={styles.navLink}>GET</Link>
                <Link href="/post" className={styles.navLink}>POST</Link>
                <Link href="/put" className={styles.navLink}>PUT</Link>
                <Link href="/delete" className={styles.navLink}>DELETE</Link>
            </nav>

            <div className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={updateForm}
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={updateForm}
                    className={styles.input}
                    required
                />
                <textarea
                    name="body"
                    placeholder="Comentário"
                    value={form.body}
                    onChange={updateForm}
                    className={styles.textarea}
                    required
                ></textarea>
                <button
                    onClick={createNewComment}
                    className={styles.button}
                    disabled={!form.name || !form.email || !form.body || loading}
                > 
                {loading ? "Adicionando..." : "Adicionar Comentário"}
                </button>

            </div>
            {error && <p className={styles.error}>Ocorreu um erro ao adicionar o comentário.</p>}

            <div className={styles.addedComments}>
            <h2>Comentários Criados ({addedComment.length})</h2>
            <ul className={styles.addedCommentList}>
                {addedComment.map((comment) => (
                    <li key={comment.id} className={styles.addedCommentItem}>
                        <p>
                            <strong>ID:</strong> {comment.id}
                        </p>
                        <p>
                            <strong>Nome:</strong> {comment.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {comment.email}
                        </p>
                        <p>
                            <strong>Comentário:</strong> {comment.body}
                        </p>
                    </li>
                ))}
            </ul>
            </div>
        </main>
    )        
}