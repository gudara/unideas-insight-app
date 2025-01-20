import { NavAdminTask } from "@/app/interfaces";

  const tasks: NavAdminTask[] = [
    {
        name: "Companies",
        description: "Manage workgroups, assign reports, and set default filters specific to companies",
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
        url: "#",
        icon: 'FileSliders',
        isActive: false
      },
  ]
  export async function GET(): Promise<Response> {
    const responseBody: NavAdminTask[] = tasks;
    
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }