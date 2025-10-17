import'./H1.css'

import type { ReactNode } from "react"

type H1Props = {
    children: ReactNode,
}

export default function H1({
    children,
}: H1Props) {
  return (
    <div className='h1 text-center'>
        {children}
    </div>
  )
}
