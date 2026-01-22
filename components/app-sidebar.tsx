import * as React from "react";
import { Suspense } from "react";
import ChatWrapper from "@/components/chat/ChatWrapper";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <ChatWrapper />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
