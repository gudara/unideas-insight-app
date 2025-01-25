"use client"

import Link from 'next/link'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavAdminTask } from "@/app/interfaces";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DynamicIcon from './dynamic-icon';
import LoaderComponent from '@/components/loader-component';
import { useQuery } from '@tanstack/react-query';
import { getAdminTasks } from '@/app/admin/get-admin-tasks-json';

export const NavAdministrationTasks = () => {

  const pathname = usePathname();

  const { data: adminTasks, isError, isLoading } = useQuery({
    queryKey: ['admin-tasks'],
    queryFn: async () => {
        return await getAdminTasks()
    }
  })

  useEffect(() => {
    function checkActive() {
      if (adminTasks?.length) {
        adminTasks?.map((a: NavAdminTask) => {
          a.isActive = pathname.startsWith(a.url.trim());
          return a;
        });
      }
    }
    checkActive()
  }, [pathname, adminTasks]);

  // Dynamically import icons from lucide-react


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <Link href="/admin">
          Administration
        </Link>
      </SidebarGroupLabel>
      {
        !adminTasks?.length && <div className="text-xs p-2"><LoaderComponent></LoaderComponent></div>

      }
      {
        adminTasks?.length && <>
          <SidebarMenu>
            {adminTasks.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.url}>
                    {/* <DynamicIcon name={item.icon} /> */}
                    <DynamicIcon name={item.icon} size={0}></DynamicIcon>
                    <span>{item.name} </span>
                  </Link>
                </SidebarMenuButton>
                {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
              </SidebarMenuItem>
            ))}
            {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
          </SidebarMenu>
        </>
      }
    </SidebarGroup>
  )
}
