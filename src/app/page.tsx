import Image from "next/image";
import styles from "./page.module.css";
import react from 'react';
import { useState } from "react";
import SearchBar from "./searchBar";
 

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <SearchBar/>
      </div>
    </main>
  );
}
