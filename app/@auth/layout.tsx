export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-20 bg-gray-100/50 min-h-screen h-full w-full flex items-start justify-center">{children}</div>
}