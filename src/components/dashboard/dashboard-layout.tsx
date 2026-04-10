import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  userName?: string | null | undefined;
  userRole?: string;
}

export function DashboardLayout({
  children,

  userName,
  userRole,
}: DashboardLayoutProps) {
 
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 bg-background border-b">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div>
             
            </div>
            {userName && (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{userName}</span>
                  {userRole && (
                    <span className="text-xs text-muted-foreground">
                      {userRole}
                    </span>
                  )}
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
