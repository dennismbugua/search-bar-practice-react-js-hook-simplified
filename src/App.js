import React, { useState, useEffect, useMemo, useRef } from "react";
import "./styles.css";

// sample data to test our search on
const people = ["Siri", "Alexa", "Google", "Facebook", "Twitter", "Linkedin", "Reddit", "Instagram", "Snapchat", "WhatsApp", "TikTok", "Pinterest", "YouTube", "Tumblr", "Quora", "Medium"];

// small helper to highlight matched substring
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const index = lower.indexOf(q);
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="highlight">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function App() {
  // raw input state
  const [query, setQuery] = useState("");
  // ref for the input so the container can focus it
  const inputRef = useRef(null);
  // debounced search term to avoid filtering on every keystroke
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 220);
    return () => clearTimeout(t);
  }, [query]);

  // memoize filtered results for small perf win
  const results = useMemo(() => {
    if (!debounced) return [];
    return people.filter(p => p.toLowerCase().includes(debounced.toLowerCase()));
  }, [debounced]);

  const clear = () => setQuery("");

  return (
    <main className="App">
      <section className="card">
        <h1 className="title">Quick Search</h1>
        <p className="subtitle">Find a name quickly — type to search. Results update as you type.</p>

        <div className="search" onClick={() => inputRef.current && inputRef.current.focus()}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z" />
          </svg>

          <input
            ref={inputRef}
            className="search-input"
            aria-label="Search names"
            placeholder="Search names — e.g. Alexa"
            value={query}
            onChange={e => setQuery(e.target.value)}
            spellCheck={false}
          />

          {query && (
            <button className="clear" aria-label="Clear search" onClick={clear}>
              ×
            </button>
          )}
        </div>

        <div className="results" aria-live="polite">
          {debounced ? (
            results.length > 0 ? (
              <ul role="listbox" className="list">
                {results.map((item, i) => (
                  <li key={item} role="option" tabIndex={0} className="list-item">
                    <Highlight text={item} query={debounced} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty">No results for “{debounced}”</div>
            )
          ) : (
            <div className="hint">Try searching for: <strong>Alexa</strong>, <strong>Google</strong>, <strong>Twitter</strong></div>
          )}
        </div>
      </section>
      <footer className="attribution">Built with React · Small demo</footer>
    </main>
  );
}
