import React, { useState, useRef } from "react";
import styles from "./Header.scss";

export default function Header( { onSubmit }) {
  const inputRef = useRef("");
  const [render, renderState] = useState();
  console.log(inputRef);

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
                renderState(undefined)
              })
            }
          }}
          className={styles.btn}
          type={"submit"}
        >
          Add
        </button>
      </form>
    </header>
  );
}
