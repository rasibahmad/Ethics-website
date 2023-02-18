import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { Navbar } from '../navbar.js';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Navbar />
      </main>
    </>
  )
}
