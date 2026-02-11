const globalForNotes = globalThis;
globalForNotes.__notes = globalForNotes.__notes || [];

export async function GET() {
    return Response.json({ notes: globalForNotes.__notes });
}

export async function POST(req) {
    const contentType = req.headers.get("content-type") || "";

    let text = "";
    if (contentType.includes("application/json")) {
        const body = await req.json().catch(() => ({}));
        text = (body.text || "").trim();
    } else {
        const form = await req.formData();
        text = String(form.get("text") || "").trim();
    }

    if (!text) {
        return Response.json({ error: "Missing text" }, { status: 400 });
    }

    globalForNotes.__notes.unshift({
        text,
        created_at: new Date().toISOString()
    });

    // If submitted from the browser form, redirect back
    if (!contentType.includes("application/json")) {
        return new Response(null, { status: 303, headers: { Location: "/" } });
    }

    return Response.json({ message: "added", count: globalForNotes.__notes.length }, { status: 201 });
}
