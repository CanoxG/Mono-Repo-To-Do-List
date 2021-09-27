import React from "react";
import styles from './List.scss';



export default function List({ children }) {
  return (
    <ul className={styles.toDoList}>
      {children}
    </ul>
  )
}