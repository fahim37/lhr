// Media interface for photos/videos in issues
interface Media {
  type: "photo" | "video";
  url: string;
  _id: string;
}

// Issue interface for visit issues
interface Issue {
  place: string;
  issue: string;
  type: string; // e.g., "red alert"
  media: Media[];
  notes: string;
  _id: string;
}

// Session interface for client/staff sessions
interface Session {
  sessionStartTime: string; // ISO date string
  sessionEndTime: string | null; // Can be null if session is ongoing
  _id: string;
}

// Client interface
interface Client {
  _id: string;
  fullname: string;
  password: string;
  email: string;
  role: "client";
  isVerified: boolean;
  status: "active" | "inactive";
  sessions: Session[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastActive: string;
  refreshToken: string;
}

// Staff interface
interface Staff {
  _id: string;
  fullname: string;
  password: string;
  email: string;
  role: "staff";
  isVerified: boolean;
  sessions: Session[];
  lastActive: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Visit interface
interface data {
  _id: string;
  visitCode: string;
  client: Client;
  staff: Staff;
  address: string;
  date: string; // ISO date string
  status: "completed" | "cancelled" | "pending"; // Adjust based on possible values
  cancellationReason: string;
  type: "follow up" | "initial"; // Adjust based on possible values
  notes: string;
  isPaid: boolean;
  plan: string; // ID reference
  addsOnService: string; // ID reference
  issues: Issue[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Pagination interface
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Top-level response interface
interface VisitResponse {
  status: boolean;
  message: string;
  data: data[];
  pagination: Pagination;
}

// Updated VisitDetailsDialogProps interface
export interface VisitDetailsDialogProps {
  data: VisitResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
