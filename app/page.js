async function getNotes() {
    const res = await fetch("http://localhost:3000/api/notes", { cache: "no-store" });
    return res.json();
}

export default async function Page() {
    const data = await getNotes();

    return (
        <>
            <h1>Next.js Dokploy Test</h1>
            <p>
                Health: <code>/api/health</code>
            </p>

            <h2>Notes (in-memory)</h2>
            <form method="post" action="/api/notes">
                <input name="text" placeholder="Add a note..." required style={{ padding: 10, width: 320 }} />
                <button style={{ padding: "10px 14px", marginLeft: 8 }}>Add</button>
            </form>

            <ul>
                {data.notes.map((n, i) => (
                    <li key={i}>
                        {n.text} <small style={{ color: "#666" }}>({n.created_at})</small>
                    </li>
                ))}
            </ul>
        </>
    );
}
