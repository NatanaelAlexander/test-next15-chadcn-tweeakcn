"use client"
import Link from "next/link"

import {
    CircleUserRound,
    ChevronRight,
    CreditCard,
    Frame,
    LifeBuoy,
    Map,
    MoreHorizontal,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Hammer,
    TrendingUpDown,
    Building2,
    House
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
/* ESto simula algun fetch (aun que no creo por que es estatico) */
const data = {
    navMain: [
        {
            title: "Gestión de usuarios",
            url: "#",
            icon: CircleUserRound,
            isActive: true,
            items: [
                {
                    title: "Tipos de usuarios",
                    url: "/users",
                },
                {
                    title: "Usuarios Administradores",
                    url: "/users",
                },
                {
                    title: "Usuarios Empresas",
                    url: "/users",
                },
            ],
        },
        {
            title: "Utilidades",
            url: "#",
            icon: Hammer,
            items: [
                {
                    title: "DTE",
                    url: "#",
                },
                {
                    title: "Regimenes tributarios",
                    url: "#",
                },
                {
                    title: "UTM e IPC",
                    url: "#",
                },
            ],
        },
        {
            title: "Dashboards",
            url: "#",
            icon: TrendingUpDown,
            items: [
                {
                    title: "Dashboards 1",
                    url: "#",
                },
                {
                    title: "Dashboards 2",
                    url: "#",
                },
                {
                    title: "Dashboards 3",
                    url: "#",
                },
            ],
        },
        {
            title: "Empresas",
            url: "#",
            icon: Building2,
            items: [
                {
                    title: "General",
                    url: "/companys",
                },
                {
                    title: "Faltantes de pagos",
                    url: "/companys",
                },
                {
                    title: "Faltantes F29",
                    url: "/companys",
                },
                {
                    title: "Mes Negativo",
                    url: "/companys",
                },
            ],
        },
    ],
    projects: [
        {
            name: "En cola",
            url: "#",
            icon: Frame,
        },
        {
            name: "En proceso",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Terminados",
            url: "#",
            icon: Map,
        },
    ],
}
/* Esto simula las coockies o el token */
const dataUser = {
    name: 'Natanael Muñoz',
    correo: 'namuji38@gmail.com'
}

export const AppAside = () => {

    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon">

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <SquareTerminal className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">App consultora</span>
                                        <span className="truncate text-xs">Cliente Premium</span>
                                    </div>
                                    <MoreHorizontal className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="start"
                                side={state === "collapsed" ? "right" : "bottom"}
                                sideOffset={4}
                            >
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-sm border">
                                        <SquareTerminal className="size-4 shrink-0" />
                                    </div>
                                    Mesa de ayuda
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Frame className="size-4 shrink-0" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Ayuda de mesa</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="More">
                                    <House />
                                    <Link href={"/"}>
                                        <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {data.navMain.map((item) => (
                                <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.url}>
                                                                <p>{subItem.title}</p>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.projects.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild tooltip={item.name}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton tooltip="More">
                                    <MoreHorizontal />
                                    <span>Más...</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="size-8 rounded-lg">
                                        <AvatarImage src="https://avatar.vercel.sh/shadcn.png" alt="shadcn" />
                                        <AvatarFallback className="rounded-lg">SC</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{dataUser.name}</span>
                                        <span className="truncate text-xs">{dataUser.correo}</span>
                                    </div>
                                    <MoreHorizontal className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={state === "collapsed" ? "right" : "top"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem className="gap-2">
                                    <Avatar className="size-6 rounded-md">
                                        <AvatarImage src="https://avatar.vercel.sh/shadcn.png" alt="shadcn" />
                                        <AvatarFallback className="rounded-md">SC</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1">
                                        <span className="font-medium">{dataUser.name}</span>
                                        <span className="text-xs text-muted-foreground">{dataUser.correo}</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2">
                                    <Send className="size-4" />
                                    Actualizar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2">
                                    <Settings2 className="size-4" />
                                    Cuenta
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                    <CreditCard className="size-4" />
                                    Pagos
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                    <LifeBuoy className="size-4" />
                                    Notificaciones
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2">
                                    <Send className="size-4" />
                                    Cerrar sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppAside