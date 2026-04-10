"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye } from "lucide-react"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import PaginationComponent from "@/components/Pagination/Pagination"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { PaymentDetailsModal } from "@/components/billing/billing-details-modal"
import { generatePaymentPDF } from "@/lib/generate-pdf"

export default function BillingPage() {
  const session = useSession()
  const userInfo = session?.data?.user
  const TOKEN = session?.data?.accessToken

  const [page, setPage] = useState(1)
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1)
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setPage(page)
  }

  const { data } = useQuery({
    queryKey: ["paymentDetails", page],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/user-payment/${userInfo?.id}?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch payment details")
      }
      const data = await response.json()
      return data
    },
    enabled: !!userInfo?.id && !!TOKEN,
  })

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleViewPaymentDetails = (payment: any) => {
    setSelectedPayment(payment)
    setIsModalOpen(true)
  }
/* eslint-disable @typescript-eslint/no-explicit-any */
  const handleDownloadPaymentDetails = (payment: any) => {
    try {
      const doc = generatePaymentPDF(payment)

      // Generate filename with transaction ID
      const filename = `payment-receipt-${payment.transactionId}.pdf`

      // Save the PDF
      doc.save(filename)

      toast.success("Payment receipt downloaded successfully")
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to download payment receipt")
    }
  }

 

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="space-y-6">
        <div className="rounded-md border overflow-hidden">
          {data?.data?.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">No payments found.</p>
            </div>
          )
            : (

              <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px] text-center pl-10">Transaction ID</TableHead>
                      <TableHead className="text-center">Date</TableHead>
                      <TableHead className="text-center">Visit Time</TableHead>
                   
                      <TableHead className="text-center">Plan Name</TableHead>
                      <TableHead className="text-center">Type</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                    {data?.data?.map((item: any) => (
                      <TableRow key={item.id} className="text-center">
                        <TableCell className="font-medium pl-10 ">{item.transactionId}</TableCell>
                        <TableCell>
                          {new Date(item.paymentDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          {new Date(item.paymentDate).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </TableCell>
                       
                        <TableCell className="capitalize">{item.plan?.name}</TableCell>
                        <TableCell className="capitalize">{item?.plan?.pack}</TableCell>
                        <TableCell className="max-w-[200px]">
                          <span
                            className={cn("px-2 py-1 rounded-full text-xs font-medium", {
                              "bg-[#B3E9C9] text-[#033618]": item?.status === "completed",
                              "bg-[#FFD6D6] text-[#5C0000]": item?.status === "failed",
                              "bg-[#FFF3CD] text-[#856404]": item?.status === "pending",
                              "bg-[#CCE5FF] text-[#004085]": item?.status === "refunded",
                            })}
                          >
                            {item?.status === "completed" ? "Paid" : item?.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewPaymentDetails(item)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View payment details</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownloadPaymentDetails(item)}>
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download payment receipt</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <PaginationComponent
                  totalItems={data?.pagination?.totalItems}
                  itemsPerPage={data?.pagination?.itemsPerPage}
                  currentPage={data?.pagination?.currentPage || currentPage}
                  totalPages={data?.pagination?.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )
          }
        </div>

        <PaymentDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} payment={selectedPayment} />
      </div>
    </DashboardLayout>
  )
}
