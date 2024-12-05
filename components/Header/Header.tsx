import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
  <header className="p-5 bd-none text-red font-bold">
    <h1 className='mb-3 text-center'>
        Lab 11: React & Next.js</h1>
    <nav className='max-w-screen-lg display-flex flex-row justify-center gap-30'>
        <Link href="/" className='text-white'>
        Home</Link>
    </nav>
  </header>
  )
}
