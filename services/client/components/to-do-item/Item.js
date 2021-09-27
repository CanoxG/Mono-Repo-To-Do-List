import React, { useState } from "react";
import styles from "./Item.scss";
import { fetcher } from "../../Files/Fetch";

const noop = () => {};

const getTime = (sec) => {
  if (sec > 60) return `${Math.floor(sec / 60)} minute ago`;
  return `${sec} seconds ago`;
};

export default function Item({ onChecked, item, removeItem }) {
  const { createdAt, checked, text, _id: id } = item;
  const [state, setState] = useState(text);
  const [editable, setEditable] = useState(false);
  const time = React.useMemo(() => {
    const date = new Date(createdAt);
    const createdSeconds = Math.floor(date.getTime() / 1000);
    const now = Math.floor(Date.now() / 1000);
    return getTime(now - createdSeconds);
  }, [createdAt]);

  return (
    <li
      className={`${styles.container} ${styles.item} ${
        checked ? styles.checked : ""
      }`}
    >
      <form
        className={styles.todoForm}
        action="text"
        onSubmit={(e) => {
          e.preventDefault();

          fetcher(`/todos?text=${state}&id=${id}`, {
            method: "PUT",
          }).then((res) => {
            console.log(res);
          });
          setEditable(false);
        }}
      >
        {editable ? (
          <div className={styles.todoForm}>
            <input value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        ) : (
          state
        )}
        {`  ${time}`}
      </form>
      <button className={styles.editBtn} onClick={() => setEditable(!editable)}>
        🖋
      </button>

      <button className={styles.btn} onClick={removeItem}>
        🗑
      </button>
      <button onClick={onChecked}>done</button>
    </li>
  );
}
