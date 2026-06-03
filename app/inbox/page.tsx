export default function InboxPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Inbox WhatsApp</h1>
      <p className="mt-2 text-slate-500">List chat dari GET /chats, detail dari GET /chat/[chat_jid]/messages, reply via POST /send/message.</p>
    </main>
  );
}
