import React, { useState, useRef } from "react";
import styles from "./Header.scss";
import { fetcher } from "../../Files/Fetch";

export default function Header({ onSubmit, setState }) {
  const inputRef = useRef("");
  const [render, renderState] = useState();
  const [searchInput, setSearchInput] = useState("");
  console.log(inputRef);

  const handleSearch = () => {
    console.log(searchInput);
    fetcher(`/todos?search=${searchInput}`).then((res) => {
      console.log(res);
      setState(res);
    });
  };

  return (
    <header>
      <h2>What is your plan Today ?</h2>
      <form action="text" className={styles.container}>
        <input
          onChange={() => {
            if (!render) {
              renderState(inputRef.current.value);
            }
          }}
          ref={inputRef}
          className={styles.input}
          type={"text"}
          placeholder={"Add To Do"}
        />
        <button
          disabled={!inputRef.current.value}
          onClick={(event) => {
            event.preventDefault();
            if (inputRef.current.value) {
              onSubmit(inputRef.current.value, () => {
                inputRef.current.value = null;
                renderState(undefined);
              });
            }
          }}
          className={styles.btn}
          type={"submit"}
        >
          Add
        </button>
      </form>
      <div className={styles.container}>
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className={styles.searchInput}
          type="search"
          placeholder={"Search"}
        />
        <button onClick={handleSearch} className={styles.btn}>
          Search
        </button>
      </div>
    </header>
  );
}
