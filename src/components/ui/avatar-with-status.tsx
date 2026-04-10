import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarWithStatusProps {
  src?: string;
  name: string;
  status?: "online" | "offline";
  size?: "sm" | "md" | "lg";
}

export function AvatarWithStatus({
  src,
  name,
  status = "offline",
  size = "md",
}: AvatarWithStatusProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const statusSizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-3.5 w-3.5",
  };

  return (
    <div className="relative">
      <Avatar className={cn(sizeClasses[size])}>
        <AvatarImage src={src || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
            statusSizeClasses[size],
            status === "online" ? "bg-green-500" : "bg-gray-300"
          )}
        />
      )}
    </div>
  );
}
