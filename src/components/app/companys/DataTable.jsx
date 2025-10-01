"use client"

import { useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFacetedRowModel,
    getFacetedUniqueValues,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { 
    ChevronLeft, 
    ChevronRight, 
    ChevronDown,
    MoreHorizontal, 
    ArrowUpDown,
    Building2,
    CheckCircle,
    XCircle
} from "lucide-react"

const formatRevenue = (revenue) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(revenue)
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const getStatusBadge = (status) => {
    return status === 'active' ? (
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-green-600 text-white text-xs font-medium">
            <CheckCircle className="h-3 w-3 mr-1" />
            Activo
        </div>
    ) : (
        <div className="inline-flex items-center px-2 py-1 rounded-md bg-red-600 text-white text-xs font-medium">
            <XCircle className="h-3 w-3 mr-1" />
            Inactivo
        </div>
    )
}

const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3 font-medium text-left"
                >
                    Empresa
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Building2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <div className="font-medium text-white">{row.getValue("name")}</div>
                        <div className="text-sm text-gray-300">{row.original.industry}</div>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3 font-medium text-left"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-sm text-white">
                    {row.getValue("email")}
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return getStatusBadge(row.getValue("status"))
        },
    },
    {
        accessorKey: "employees",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3 font-medium text-left"
                >
                    Empleados
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-600 text-white text-sm font-medium">
                    {row.getValue("employees").toLocaleString()}
                </div>
            )
        },
    },
    {
        accessorKey: "revenue",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3 font-medium text-left"
                >
                    Ingresos
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-600 text-white text-sm font-medium">
                    {formatRevenue(row.getValue("revenue"))}
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-8 px-2 lg:px-3 font-medium text-left"
                >
                    Creado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-sm text-white">
                    {formatDate(row.getValue("createdAt"))}
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar Empresa</DropdownMenuItem>
                        <DropdownMenuItem>Ver Reportes</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Eliminar Empresa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export const DataTable = ({ data }) => {
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState({})
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            rowSelection,
            columnVisibility,
            globalFilter,
        },
    })

    return (
        <div className="w-full space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Filtrar empresas..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8">
                        Personalizar Columnas
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                        Agregar Empresa
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-gray-600 bg-[#1A1A1A]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b border-gray-600">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-12 px-4 text-left align-middle font-medium text-white">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-gray-600 transition-colors hover:bg-[#E67E22] data-[state=selected]:bg-[#E67E22] h-12"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-2 align-middle">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-400">
                                    Sin resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-gray-400">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Filas por página:</span>
                        <Select
                            value={table.getState().pagination.pageSize.toString()}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">
                            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                        </span>
                        <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Ir a la primera página</span>
                                <ChevronLeft className="h-4 w-4" />
                                <ChevronLeft className="h-4 w-4 -ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Ir a la página anterior</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Ir a la página siguiente</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Ir a la última página</span>
                                <ChevronRight className="h-4 w-4" />
                                <ChevronRight className="h-4 w-4 -ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}