"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  Globe,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const CardCompany = ({ company }) => {
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

  const getStatusIcon = (status) => {
    return status === 'active' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
        Inactive
      </Badge>
    )
  }

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {company.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {company.industry}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(company.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Company</DropdownMenuItem>
                <DropdownMenuItem>View Reports</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete Company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{company.email}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{company.phone}</span>
          </div>
          
          <div className="flex items-start space-x-3 text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">{company.address}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <Globe className="h-4 w-4 text-gray-400" />
            <a 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {company.website}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-1">
              <Users className="h-4 w-4" />
              <span>Employees</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {company.employees.toLocaleString()}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-1">
              <DollarSign className="h-4 w-4" />
              <span>Revenue</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatRevenue(company.revenue)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Created: {formatDate(company.createdAt)}</span>
          </div>
          {getStatusBadge(company.status)}
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-600 leading-relaxed">
            {company.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
