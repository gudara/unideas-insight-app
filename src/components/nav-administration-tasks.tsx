"use client"

import Link from 'next/link'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import DynamicIcon from './dynamic-icon';
import LoaderComponent from '@/components/loader-component';
import { useQuery } from '@tanstack/react-query';
import { getAdminTasks } from '@/app/admin/get-admin-tasks-json';
import { useEffect } from 'react';
import { NavAdminTask } from '@/app/interfaces';

export const NavAdministrationTasks = () => {

  const pathname = usePathname();
  // let adminTasks: NavAdminTask[] = []//await getAdminTasks();

  const { data: adminTasks } = useQuery({
    queryKey: ['admin-tasks'],
    queryFn: async () => {
      return await getAdminTasks()
      // return []
    }
  })


  const isActive = (path: string)=>{
    return pathname.startsWith(path.trim());
  }

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
            {adminTasks?.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link href={item.url}>
                    {/* <DynamicIcon name={item.icon} /> */}
                    <DynamicIcon iconName={item.icon} size={16}></DynamicIcon>
                    <span>{item.name}</span>
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
