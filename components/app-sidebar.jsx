"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, DollarSign, Package, FileText, AlertTriangle, Target, Crown, Sparkles } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    color: "text-blue-400",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    title: "Entradas de Dinheiro",
    url: "/entradas",
    icon: DollarSign,
    color: "text-green-400",
    bgColor: "hover:bg-green-500/10",
  },
  {
    title: "Inventário",
    url: "/inventario",
    icon: Package,
    color: "text-cyan-400",
    bgColor: "hover:bg-cyan-500/10",
  },
  {
    title: "Solicitações",
    url: "/solicitacoes",
    icon: FileText,
    color: "text-yellow-400",
    bgColor: "hover:bg-yellow-500/10",
  },
  {
    title: "Advertências",
    url: "/advertencias",
    icon: AlertTriangle,
    color: "text-red-400",
    bgColor: "hover:bg-red-500/10",
  },
  {
    title: "Metas",
    url: "/metas",
    icon: Target,
    color: "text-purple-400",
    bgColor: "hover:bg-purple-500/10",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-white/10 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <SidebarHeader className="border-b border-white/10 p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 shadow-lg">
              <Crown className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Regentes
            </h2>
            <p className="text-sm text-slate-400 font-medium">Sistema de Gestão</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></div>
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={`
                      group relative overflow-hidden rounded-xl p-3 transition-all duration-300
                      text-slate-300 hover:text-white ${item.bgColor}
                      data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/20 data-[active=true]:to-cyan-600/20
                      data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-purple-500/30
                      data-[active=true]:shadow-lg data-[active=true]:shadow-purple-500/20
                    `}
                  >
                    <Link href={item.url} className="flex items-center gap-4 w-full">
                      <div
                        className={`
                        p-2 rounded-lg transition-all duration-300 ${item.color}
                        group-hover:scale-110 group-hover:rotate-3
                        group-data-[active=true]:bg-white/10 group-data-[active=true]:shadow-md
                      `}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                        {item.title}
                      </span>
                      {pathname === item.url && (
                        <div className="absolute right-2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r-full opacity-30"></div>
      </SidebarContent>
    </Sidebar>
  )
}
