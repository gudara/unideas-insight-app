import AdministrationLayoutHeader from "@/components/administration-layout-header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdministrationLayoutHeader />
            <div >
                {children}
            </div>
        </>

    )
}