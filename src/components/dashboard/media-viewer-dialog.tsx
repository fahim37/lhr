"use client";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";

interface MediaViewerDialogProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  media: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MediaViewerDialog({
  media,
  open,
  onOpenChange,
}: MediaViewerDialogProps) {

  const handleDownloadAll = async () => {
    if (media?.issues && media.issues[0]?.media) {
      for (const item of media.issues[0].media) {
        try {
          const response = await fetch(item.url);
          if (!response.ok) {
            console.error(`Failed to fetch ${item.type}: ${response.status}`);
            toast.error(`Failed to download ${item.type}`);
            continue; // Skip to the next item
          }
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `${media.issue}-${item.type}-${Date.now()}.${item.type === 'photo' ? 'jpg' : 'mp4'}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl); // Clean up the Blob URL
        } catch (error: any) {
          
          toast.error( error.message || `Error downloading ${item.type}`);
        }
      }
      toast.success(`${media.issues[0].media.length} media items download initiated`);
      onOpenChange(false); // Close the dialog after initiating downloads
    } else {
      toast.error("No media items to download.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{media.issue}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-5">
          <div className="text-sm text-muted-foreground">
            <h2 className="capitalize text-3xl pb-4">{media?.issues[0]?.issue}</h2>
            {new Date(media.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} | {new Date(media.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </div>

          {media?.issues[0]?.media
            ?
            <Carousel className="aspect-video">
              <CarouselContent>
                {media?.issues[0]?.media?.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 lg:h-96 w-full">
                      {item.type == "photo" ?
                        <Image
                          src={item.url}
                          alt={item.type}
                          width={600}
                          height={400}
                          className="w-full aspect-video"
                        /> :
                        <video controls className="w-full aspect-video">
                          <source src={item.url} />
                        </video>
                      }
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-full left-[44%] lg:left-[47%] -translate-x-1/2" />
              <CarouselNext className="absolute top-full left-[54%] lg:left-[53%] -translate-x-1/2" />
            </Carousel>
            :
            <div>No media found</div>
          }

          <div className="w-full p-5 bg-[#F5F7FA] text-black text-xs">
            {/* Card Content */}
            <div className="space-y-5">
              {/* Date & Time Row */}
              <div className="flex justify-between items-center">
                <span className="font-medium">Date & Time:</span>
                <span className="">{new Date(media.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(media.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
              </div>

              {/* Visit Type Row */}
              <div className="flex justify-between items-center">
                <span className="font-medium">Visit Type:</span>
                <span className="capitalize">{media?.type || "N/A"}</span>
              </div>

              {/* Issue Row with Button */}
              <div className="flex justify-between items-center">
                <span className="font-medium">Issue:</span>

                <Badge
                  variant="default"
                  className={
                    media?.issues[0]?.issue
                      ? "bg-[#E9BFBF] text-[#B93232]"
                      : "bg-[#B3E9C9] text-[#033618]"
                  }
                >
                  {media?.issues[0]?.issue ? "Issue Found" : "No issue"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl pb-4 font-medium">Additional Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm capitalize">
                  {media.status}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="text-sm capitalize">
                  {media?.type || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm mt-1">
              This {media.type} was recorded during a security check on{" "}
              {new Date(media.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(media.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-[#091057]"
            disabled={!media?.issues[0]?.media}
            // CHANGED: Modified the onClick handler to call handleDownloadAll
            onClick={handleDownloadAll}
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
