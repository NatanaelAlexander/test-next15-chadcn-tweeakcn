'use client'
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import AppAside from "@/components/app/AppAside";
import { useEffect } from "react"

export default function RootLayout({ children }) {
  // Añadir dark mode por defecto
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  return (
    <html>
      <body>
        <SidebarProvider>
          <AppAside />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]/sidebar]:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-px bg-sidebar-border" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
