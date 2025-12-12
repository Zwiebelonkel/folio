
"use client";

import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <SidebarTrigger/>
            </SidebarHeader>
            <SidebarContent className="pt-16">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/" passHref>
                            <SidebarMenuButton tooltip="Home">
                                <Home />
                                <span>Home</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/contact" passHref>
                            <SidebarMenuButton tooltip="Contact">
                                <Mail />
                                <span>Contact</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
          {children}
        </SidebarInset>
    </SidebarProvider>
  )
}
