import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dashboard Regentes",
  description: "Sistema completo de gerenciamento do clã",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">
            <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 p-2">
              <SidebarTrigger className="text-white hover:bg-white/10" />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
