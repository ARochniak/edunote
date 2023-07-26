import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="flex h-screen w-screen items-center justify-center bg-slate-100">{children}</div>
}
