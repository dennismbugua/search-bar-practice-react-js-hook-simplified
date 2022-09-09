//https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// dummy data to test our search on
const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin"
];

export default function App() {
  // take a value from the user and save it to a state
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  // at every occurance of the change event, sets the current value of the form to the state
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const results = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);
  // ^ props.people along with searchTerm in dependency
  // rendering a search bar (input) and a list of items to search through
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
