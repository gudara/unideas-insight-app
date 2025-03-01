import { NavAdminTask } from "../interfaces";

const tasks: NavAdminTask[] = [
  {
    name: "Companies",
    description: "Manage divisions, assign reports, and set default filters specific to companies",
    url: "/admin/companies",
    icon: 'Building2',
    isActive: false
  },
  {
    name: "Users",
    description: "Manage users and their default setting and default filters",
    url: "#",
    icon: 'UsersRound',
    isActive: false
  },
  {
    name: "Reports",
    description: "Register and maintain Power BI reports",
    url: "/admin/reports",
    icon: 'FileSliders',
    isActive: false
  },
  {
    name: "Work Groups",
    description: "Manage work groups.",
    url: "/admin/work-groups",
    icon: 'Building2',
    isActive: false
  },
]

export async function getAdminTasks(): Promise<NavAdminTask[]> {
  return tasks;
}