"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { MediaViewerDialog } from "@/components/dashboard/media-viewer-dialog";
import { Eye, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import PaginationComponent from "@/components/Pagination/Pagination";
import { toast } from "react-toastify";

export default function MediaPage() {
  // const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const session = useSession();
  const userInfo = session?.data?.user;

  const token = session?.data?.accessToken;

  const { data, error } = useQuery({
    // Capture the error
    queryKey: ["getallmedia", page], // Include page in the query key
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-visit-client?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch live auctions");
      }

      const data = await response.json();
      return data;
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return <p>Error loading data.</p>; // Or a more elaborate error message
  }

  const handleViewMedia = (media: any) => {
    setSelectedMedia(media);
    setIsViewerOpen(true);
  };

  const handleDownloadSingleMedia = async (item: any) => {
    if (
      item?.issues &&
      item.issues[0]?.media &&
      item.issues[0].media.length > 0
    ) {
      for (const mediaItem of item.issues[0].media) {
        try {
          const response = await fetch(mediaItem.url);
          if (!response.ok) {
          
            toast.error(`Failed to download ${mediaItem.type}`);
            continue; // Skip to the next item
          }
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `${item.issue}-${mediaItem.type}-${Date.now()}.${mediaItem.type === "photo" ? "jpg" : "mp4"
            }`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl); // Clean up the Blob URL
        } catch (error: any) {
          console.error(`Error downloading ${mediaItem.type}:`, error);
          toast.error(`Error downloading ${mediaItem.type}`);
        }
      }
      toast.success(
        `${item.issues[0].media.length} media items download initiated for issue: ${item.type}`
      );
    } else {
      toast.error("No media available to download for this item.");
    }
  };


  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="space-y-4">
        <div className="">
          {data?.data?.length === 0 ? (
            <div className="col-span-full text-center py-10 border rounded-md">
              No visit found
            </div>
          ) : (
            <div className="shadow-[0px_10px_60px_0px_#0000001A] py-4 rounded-lg mt-10 overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center pl-10">
                      ID
                    </TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Visit Time</TableHead>
                    <TableHead className="text-center">Staff</TableHead>
                    <TableHead className="text-center">Issue</TableHead>
                    <TableHead className="text-center">Visit Type</TableHead>
                    <TableHead className="text-center">Notes</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item) => (
                    <TableRow key={item.id} className="text-center">
                      <TableCell className="font-medium pl-10 ">
                        {item?.visitId}
                      </TableCell>
                      <TableCell>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(item.date).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell>
                        {item.staff ?
                          <div className="flex justify-center gap-2">
                            <div>
                              <div className="font-medium">
                                {item?.staff?.fullname}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item?.staff?.email}
                              </div>
                            </div>
                          </div>
                          :
                          "No staff assigned"
                        }
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "cancelled"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            item?.issues?.length === 0
                              ? "bg-[#B3E9C9] text-[#033618]"
                              : "bg-[#E9BFBF] text-[#B93232]"
                          }
                        >
                          {item?.issues?.length === 0
                            ? "No issue"
                            : "Issue found"}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{item?.type || "N/A"}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {item.notes || "No notes"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewMedia(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            disabled={item.issues?.length === 0}
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadSingleMedia(item)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <PaginationComponent
                totalItems={data?.meta?.totalItems}
                itemsPerPage={data?.meta?.itemsPerPage}
                currentPage={data?.meta?.currentPage}
                totalPages={data?.meta?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {selectedMedia && (
        <MediaViewerDialog
          media={selectedMedia}
          open={isViewerOpen}
          onOpenChange={setIsViewerOpen}
        />
      )}
    </DashboardLayout>
  );
}
