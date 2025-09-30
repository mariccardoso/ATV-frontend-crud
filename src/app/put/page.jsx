"use client"
import { useState } from "react";
import styles from './put.module.css'
import Link from "next/link";
import axios from "axios";

export default function EditPage() {
    const [commentID, setCommentID] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
    try {

        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentID}`);
        setForm({
            name: data.name,
            email: data.email,
            body: data.body
        });
    } catch (error) {
        setError(true);
        console.log("Erro ao buscar comentario", error);
    }finally {
        setLoading(false);
    }

    }

    const editarComentario = async () => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentID}`, form)
            setSuccess(true);
        } catch (error) {
            setError(true);
            console.log("Erro ao editar comentario", error);
        }finally {
            setLoading(false);
        }
    }

    return (
        <main className={styles.main}>
        <h1 className={styles.title}>PUT - Editar Comentário</h1>
        <nav className={styles.nav}>
            <Link href="/get" className={styles.navLink}>GET</Link>
            <Link href="/post" className={styles.navLink}>POST</Link>
            <Link href="/put" className={styles.navLink}>PUT</Link>
            <Link href="/delete" className={styles.navLink}>DELETE</Link>
        </nav>
        <div className={styles.form}>
        <input
                type="number"
                name="commentID"
                placeholder="ID do comentário"
                value={commentID}
                onChange={(e) => setCommentID(e.target.value)}
                className={styles.input}
            />
            <button onClick={buscarComentario} className={styles.button} disabled={loading || !commentID}>
                {loading ? "Buscando..." : "Buscar Comentário"}
            </button>
        </div>
        {form.name && (
            <div className={styles.form}>
                <h2>Editar Comentário</h2>
                <input 
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className={styles.input}
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className={styles.input}
                />
                <textarea
                    name="body"
                    placeholder="Comentário"
                    value={form.body}
                    onChange={(e) => setForm({...form, body: e.target.value})}
                    className={styles.textarea}
                ></textarea>
                <button onClick={editarComentario} className={styles.button} disabled={loading}>
                    {loading ? "Editando..." : "Editar Comentário"}
                </button>
                {success && <p className={styles.success}>Comentário editado com sucesso!</p>}
                {error && <p className={styles.error}>Ocorreu um erro. Tente novamente.</p>}
            </div>
        )}
    </main>
    )
}