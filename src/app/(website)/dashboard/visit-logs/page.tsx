"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisitDetailsDialog } from "@/components/dashboard/visit-details-dialog"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import PaginationComponent from "@/components/Pagination/Pagination"
import { useSession } from "next-auth/react"

interface Visit {
  _id: string
  visitId: string
  createdAt: string
  updatedAt: string
  staff: {
    fullname: string
    email: string
  } | null
  status: string
  type: string
  notes: string
  issues?: Array<{
    place: string
    issue: string
    type: string
  }> | null
}

interface IssuesCount {
  totalIssues: number
  resolvedIssues: number
  pendingIssues: number
}

export default function VisitLogsPage() {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState({
    allLogs: 1,
    completedVisits: 1,
    issueReported: 1,
  })
  const { data: session } = useSession()
  const token = session?.accessToken
  const userInfo = session?.user

  const handlePageChange = (tab: keyof typeof currentPage, page: number) => {
    setCurrentPage((prev) => ({ ...prev, [tab]: page }))
  }

  const handleViewDetails = (visit: Visit) => {
    setSelectedVisit(visit._id)
    setIsDetailsOpen(true)
  }

  // Fetch all visits
  const { data: allLogs, isLoading: allLogsLoading } = useQuery({
    queryKey: ["allVisits", currentPage.allLogs],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-visit-client?page=${currentPage.allLogs}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch visits")
      }
      return await response.json()
    },
    enabled: !!token,
  })
  
  

  // Fetch completed visits
  const { data: completedVisits, isLoading: completedVisitsLoading } = useQuery({
    queryKey: ["completedVisits", currentPage.completedVisits],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-completed-visits?page=${currentPage.completedVisits}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch completed visits")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Fetch visits with issues
  const { data: issueFounded, isLoading: issuesLoading } = useQuery({
    queryKey: ["issueFounded", currentPage.issueReported],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-visits-with-issues?page=${currentPage.issueReported}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch visits with issues")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Fetch issues count
  const { data: issuesCount, isLoading: issuesCountLoading } = useQuery<{ data: IssuesCount }>({
    queryKey: ["issuesCount"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visits/get-all-issues-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch issues count")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Safely get pagination data with defaults
  const getPagination = (data) => ({
    currentPage: data?.meta?.currentPage || 1,
    totalPages: data?.meta?.totalPages || 1,
    totalItems: data?.meta?.totalItems || 0,
    itemsPerPage: data?.meta?.itemsPerPage || 10,
  })

  const isLoading = allLogsLoading || completedVisitsLoading || issuesLoading || issuesCountLoading

  if (isLoading) {
    return (
      <DashboardLayout
        title="Client Name"
        subtitle="Client Dashboard"
        userName={userInfo?.name}
        userRole={userInfo?.role}
      >
        <div className="flex justify-center items-center h-64">
          <p>Loading visit logs...</p>
        </div>
      </DashboardLayout>
    )
  }

  
  const renderTable = (visits: Visit[], pagination, tab: keyof typeof currentPage) => (
    <>
    {console.log(visits)}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Visit Type</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No visits found
                </TableCell>
              </TableRow>
            ) : (
              visits?.map((visit: Visit) => (
                <TableRow key={visit._id}>
                  <TableCell className="font-medium">{visit.visitId}</TableCell>
                  <TableCell>{new Date(visit.createdAt).toISOString().split("T")[0]}</TableCell>
                  <TableCell>
                    {new Date(visit.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">{visit.staff?.fullname || "N/A"}</div>
                        
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        visit.status === "completed"
                          ? "default"
                          : visit.status === "cancelled"
                            ? "destructive"
                            : visit.status === "confirmed"
                              ? "secondary"
                              : "outline"
                      }
                      className={`text-black 
                        hover:bg-[#B3E9C9] 
                        active:bg-[#B3E9C9] 
                        ${visit.status === "completed"
                          ? "bg-[#B3E9C9]"
                          : visit.status === "cancelled"
                            ? "bg-[#E9BFBF] hover:bg-[#E9BFBF] active:bg-[#E9BFBF]"
                            : visit.status === "pending"
                              ? "bg-[#F7E39F] hover:bg-[#F7E39F] active:bg-[#F7E39F]"
                              : visit.status === "confirmed"
                                ? "bg-[#B3E9C9]"
                                : ""
                        }`}
                      
                    >
                      {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={!visit.issues || visit.issues.length === 0 ? "default" : "destructive"}
                      className={`text-black ${!visit.issues || visit.issues.length === 0
                          ? "bg-[#B3E9C9] hover:bg-[#B3E9C9] active:bg-[#B3E9C9]"
                          : "bg-[#E9BFBF] hover:bg-[#E9BFBF] active:bg-[#E9BFBF]"
                        }`}
                      
                    >
                      {!visit.issues || visit.issues.length === 0 ? "No issue" : "Issue found"}
                    </Badge>
                  </TableCell>
                  <TableCell>{visit.type || "N/A"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{visit.notes || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(visit)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-0">
        <PaginationComponent
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page: number) => handlePageChange(tab, page)}
        />
      </div>
    </>
  )

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="space-y-4">
        {/* Issues Count Summary
        {issuesCount?.data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Total Issues</h3>
              <p className="text-2xl font-bold">{issuesCount.data.totalIssues || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Resolved Issues</h3>
              <p className="text-2xl font-bold">{issuesCount.data.resolvedIssues || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Pending Issues</h3>
              <p className="text-2xl font-bold">{issuesCount.data.pendingIssues || 0}</p>
            </div>
          </div>
        )} */}

        <Tabs defaultValue="all-logs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all-logs">All Logs</TabsTrigger>
              <TabsTrigger value="completed-visits">Completed Visits</TabsTrigger>
              <TabsTrigger value="issue-reported">
                Issue Founded {issuesCount?.data?.totalIssues ? `(${issuesCount.data.totalIssues})` : ""}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all-logs" className="mt-4">
            {renderTable(allLogs?.data || [], getPagination(allLogs), "allLogs")}
          </TabsContent>

          <TabsContent value="completed-visits">
            {renderTable(completedVisits?.data || [], getPagination(completedVisits), "completedVisits")}
          </TabsContent>

          <TabsContent value="issue-reported">
            {renderTable(issueFounded?.data || [], getPagination(issueFounded), "issueReported")}
          </TabsContent>
        </Tabs>
      </div>

      {selectedVisit && (
        <VisitDetailsDialog visitId={selectedVisit} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      )}
    </DashboardLayout>
  )
}