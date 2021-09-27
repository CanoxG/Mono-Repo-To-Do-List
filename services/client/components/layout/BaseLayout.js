import React from "react";
import styles from "./BaseLayout.scss";

export default function BaseLayout({ children }) {
  return (
    <section className={styles.container}>
      <article className={styles.center}>{children}</article>
    </section>
  );
}
