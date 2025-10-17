import type { ReactNode } from "react";

type FormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children: ReactNode;
}


export default function Form({
    children,
    onSubmit
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
        {children}
    </form>
  )
}
