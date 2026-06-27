import { FormEvent, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type ConnectionStatus = "checking" | "connected" | "error";

export default function App() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("checking");
  const [connectionMessage, setConnectionMessage] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todoError, setTodoError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      const { error } = await supabase.auth.getSession();
      if (error) {
        setConnectionStatus("error");
        setConnectionMessage(error.message);
        return;
      }

      setConnectionStatus("connected");
      setConnectionMessage(import.meta.env.VITE_SUPABASE_URL);
    }

    void checkConnection();
  }, []);

  useEffect(() => {
    async function loadTodos() {
      setLoadingTodos(true);
      setTodoError(null);

      const { data, error } = await supabase
        .from("todos")
        .select("id, title, done")
        .order("created_at", { ascending: true });

      if (error) {
        setTodoError(error.message);
        setTodos([]);
      } else {
        setTodos(data ?? []);
      }

      setLoadingTodos(false);
    }

    void loadTodos();
  }, []);

  async function addTodo(event: FormEvent) {
    event.preventDefault();
    const title = newTodo.trim();
    if (!title) return;

    const { data, error } = await supabase
      .from("todos")
      .insert({ title })
      .select("id, title, done")
      .single();

    if (error) {
      setTodoError(error.message);
      return;
    }

    setTodos((current) => [...current, data]);
    setNewTodo("");
    setTodoError(null);
  }

  async function toggleTodo(todo: Todo) {
    const { data, error } = await supabase
      .from("todos")
      .update({ done: !todo.done })
      .eq("id", todo.id)
      .select("id, title, done")
      .single();

    if (error) {
      setTodoError(error.message);
      return;
    }

    setTodos((current) =>
      current.map((item) => (item.id === todo.id ? data : item)),
    );
    setTodoError(null);
  }

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">Stackblaze Builder</p>
        <h1>Hello from React + Vite</h1>
        <p className="lede">
          Supabase is wired through <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code>.
        </p>
      </header>

      <section className="panel">
        <h2>Supabase client</h2>
        <p className={`status status-${connectionStatus}`}>
          {connectionStatus === "checking" && "Checking connection…"}
          {connectionStatus === "connected" && "Connected"}
          {connectionStatus === "error" && "Connection error"}
        </p>
        {connectionMessage ? (
          <p className="meta">
            <code>{connectionMessage}</code>
          </p>
        ) : null}
      </section>

      <section className="panel">
        <h2>Todos</h2>
        <p className="hint">
          Run <code>supabase/schema.sql</code> in Supabase Studio once to create
          the demo table.
        </p>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add a todo"
            aria-label="New todo"
          />
          <button type="submit">Add</button>
        </form>

        {loadingTodos ? <p>Loading todos…</p> : null}
        {todoError ? <p className="error">{todoError}</p> : null}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => void toggleTodo(todo)}
                />
                <span className={todo.done ? "done" : undefined}>{todo.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
