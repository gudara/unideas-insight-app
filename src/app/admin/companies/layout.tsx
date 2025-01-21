
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className="space-y-2 px-6 py-0 pb-0 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Companies</h2>
        <p className="text-muted-foreground">
          Manage company settings, users, workgroups and set report preferences.
        </p>
      </div>
      <Separator className="my-0" />
      <div className="flex flex-wrap flex-col gap-2">

        {children}

      </div>
    </div>
  )
}