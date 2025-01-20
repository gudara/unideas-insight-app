"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building2,
  ChartLine,
  Command,
  FileSliders,
  GalleryVerticalEnd,
  Settings2,
  UsersRound,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavReports } from "./nav-reports"
import { NavAdministrationTasks } from "./nav-administration-tasks"

// This is sample data.
const data = {
  user: {
    name: "Chamath Madushanka",
    email: "chamathm@xyzaperal.lk",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "XYZ Aperal Lanka (Pvt) Ltd",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navReports: [
    {
      title: "Sales",
      url: "#",
      icon: ChartLine,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Sales Performance",
          url: "#",
        },
        {
          title: "Sales Forecasting",
          url: "#",
        },
      ],
    },
    {
      title: "Customer Service",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Issue Resolution",
          url: "#",
        },
        {
          title: "Customer Complaint",
          url: "#",
        },
        {
          title: "Customer Satisfaction",
          url: "#",
        },
      ],
    },
    {
      title: "Inventory Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Stock Replenishment",
          url: "#",
        },
        {
          title: "Product Performance",
          url: "#",
        },
        {
          title: "Inventory Valuation",
          url: "#",
        },
        {
          title: "Stockouts and Overstock",
          url: "#",
        },
      ],
    },
    {
      title: "Finance and Accounting",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profit and Loss",
          url: "#",
        },
        {
          title: "Cash Flow",
          url: "#",
        },
        {
          title: "Budget vs Actual",
          url: "#",
        }
      ],
    },
  ],
  navAdminTasks: [
    {
      name: "Companies",
      url: "/admin/companies",
      icon: Building2,
    },
    {
      name: "Users",
      url: "#",
      icon: UsersRound,
    },
    {
      name: "Reports",
      url: "#",
      icon: FileSliders,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavReports items={data.navReports} />
        <NavAdministrationTasks  />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
