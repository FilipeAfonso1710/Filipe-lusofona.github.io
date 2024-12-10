import Link from 'next/link'
import React from 'react'
import styles from './Header.module.css'


export default function Header() {
  return (
  <header className={styles.header}>
    <h1 className={styles.title}>
        Lab 11: React & Next.js</h1>
    <nav className={styles.nav}>
        <Link href="/">
        Home</Link>
        <Link href={"produtos"}>
        produtos
        </Link>
        <Link href={"tecnologias"}>
        tecnologias
        </Link>
    </nav>
  </header>
  )
  
}
