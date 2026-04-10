"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { ScheduleVisitDialog } from "@/components/dashboard/schedule-visit-dialog";
import { VisitDetailsDialog } from "@/components/dashboard/visit-details-dialog";

import {  Eye,  Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("upcoming-visits");

  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [visitDetailsOpen, setVisitDetailsOpen] = useState(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
 
  const session = useSession();
  const token = session.data?.accessToken;
  const userInfo = session?.data?.user;

  // Separate page states for each tab
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  const handleScheduleVisit = () => {
    setScheduleDialogOpen(true);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleViewDetails = (visit: any) => {
    setSelectedVisit(visit._id);
    setVisitDetailsOpen(true);
  };

  const { data: pastVisits } = useQuery({
    queryKey: ["pastVisits", pastPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-past-visits?page=${pastPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch past visits");
      }

      const data = await response.json();
      return data;
    },
    enabled: !!token && activeTab === "past-visits",
  });

  const { data: upcomingVisits } = useQuery({
    queryKey: ["upcomingVisits", upcomingPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-upcoming-visits?page=${upcomingPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch upcoming visits");
      }

      const data = await response.json();
      return data;
    },
    enabled: !!token && activeTab === "upcoming-visits",
  });
  // console.log("upcomingVisits", upcomingVisits);
  

  return (
    <DashboardLayout
      title={userInfo?.name || "Default Title"}
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Schedule</h2>
            <p className="text-sm text-muted-foreground">
              Manage your security visits
            </p>
          </div>
          <Button
            className="bg-[#091057] text-primary-foreground hover:bg-[#091057]/90 rounded-[20px] py-4"
            onClick={handleScheduleVisit}
          >
            <Plus className="mr-2 h-4 w-4" /> Schedule a Visit
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Tabs
            defaultValue="upcoming-visits"
            onValueChange={setActiveTab}
            className="w-full "
          >
            <div className="flex justify-between items-center ">
              <TabsList className="grid grid-cols-2 w-auto  ">
                <TabsTrigger
                  value="upcoming-visits"
                  className={`rounded-full ${
                    activeTab === "upcoming-visits"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  Upcoming Visits
                </TabsTrigger>
                <TabsTrigger
                  value="past-visits"
                  className={`rounded-full ${
                    activeTab === "past-visits"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  Past Visits
                </TabsTrigger>
              </TabsList>

             
            </div>

            <TabsContent value="upcoming-visits" className="mt-6">
              
                <>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Staff</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingVisits?.data?.map((visit) => (
                          <TableRow key={visit._id || visit.visitId}>
                            <TableCell className="font-medium">
                              {visit.visitId || visit._id}
                            </TableCell>
                            <TableCell>
                              {new Date(visit.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(visit.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div>
                                  <div className="font-medium">
                                    {visit.staff?.fullname || "Not Assigned"}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {visit.staff?.email || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  visit.status === "confirm" ||
                                  visit.status === "completed"
                                    ? "bg-[#B3E9C9] text-black"
                                    : visit.status === "cancelled" ||
                                      visit.status === "cancel"
                                    ? "bg-[#E9BFBF] text-black"
                                    : "bg-[#F7E39F] text-black"
                                }
                              >
                                {visit.status?.charAt(0).toUpperCase() +
                                  visit.status?.slice(1) || "Pending"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {visit.type || "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewDetails(visit)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {!upcomingVisits?.data?.length && (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4">
                              No upcoming visits found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground text-nowrap">
                      Showing 1 to {upcomingVisits?.data?.length || 0} of{" "}
                      {upcomingVisits?.pagination?.totalItems || 0} results
                    </div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setUpcomingPage((prev) => Math.max(1, prev - 1))
                            }
                            className={
                              upcomingPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                        {Array.from(
                          {
                            length: upcomingVisits?.pagination?.totalPages || 1,
                          },
                          (_, index) => index + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setUpcomingPage(page)}
                              isActive={upcomingPage === page}
                              className={
                                upcomingPage === page
                                  ? "bg-primary text-primary-foreground"
                                  : "cursor-pointer"
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setUpcomingPage((prev) =>
                                Math.min(
                                  upcomingVisits?.pagination?.totalPages || 1,
                                  prev + 1
                                )
                              )
                            }
                            className={
                              upcomingPage ===
                              upcomingVisits?.pagination?.totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              
            </TabsContent>

            <TabsContent value="past-visits" className="mt-6">
            
                <>
                  <div className="rounded-md border overflow-hidden">
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
                        {pastVisits?.data?.map((visit) => (
                          <TableRow key={visit._id || visit.visitId}>
                            <TableCell className="font-medium">
                              {visit.visitId || visit._id}
                            </TableCell>
                            <TableCell>
                              {new Date(visit.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(visit.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div>
                                  <div className="font-medium">
                                    {visit.client?.fullname || "Not Assigned"}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {visit.client?.email || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  visit.status === "confirm" ||
                                  visit.status === "completed"
                                    ? "bg-[#B3E9C9] text-black"
                                    : visit.status === "cancelled" ||
                                      visit.status === "cancel"
                                    ? "bg-[#E9BFBF] text-black"
                                    : "bg-[#F7E39F] text-black"
                                }
                              >
                                {visit.status?.charAt(0).toUpperCase() +
                                  visit.status?.slice(1) || "Completed"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  !visit.issues || visit.issues.length === 0
                                    ? "default"
                                    : "destructive"
                                }
                                className={
                                  !visit.issues || visit.issues.length === 0
                                    ? "bg-[#B3E9C9] text-black"
                                    : "bg-[#E9BFBF] text-black"
                                }
                              >
                                {!visit.issues || visit.issues.length === 0
                                  ? "No issue"
                                  : "Issue found"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {visit.type || "Routine Check"}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {visit.notes || "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewDetails(visit)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {!pastVisits?.data?.length && (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-4">
                              No past visits found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground text-nowrap">
                      Showing 1 to {pastVisits?.data?.length || 0} of{" "}
                      {pastVisits?.pagination?.totalItems || 0} results
                    </div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setPastPage((prev) => Math.max(1, prev - 1))
                            }
                            className={
                              pastPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                        {Array.from(
                          { length: pastVisits?.pagination?.totalPages || 1 },
                          (_, index) => index + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setPastPage(page)}
                              isActive={pastPage === page}
                              className={
                                pastPage === page
                                  ? "bg-primary text-primary-foreground"
                                  : "cursor-pointer"
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setPastPage((prev) =>
                                Math.min(
                                  pastVisits?.pagination?.totalPages || 1,
                                  prev + 1
                                )
                              )
                            }
                            className={
                              pastPage === pastVisits?.pagination?.totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
            
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ScheduleVisitDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      />
      {selectedVisit && (
        <VisitDetailsDialog
          visitId={selectedVisit}
          open={visitDetailsOpen}
          onOpenChange={setVisitDetailsOpen}
        />
      )}
    </DashboardLayout>
  );
}
