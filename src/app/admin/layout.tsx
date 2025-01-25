import AdministrationLayoutHeader from "@/components/administration-layout-header";


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <>
            <AdministrationLayoutHeader />
            <div className="space-y-2 px-6 py-0 pb-0 md:block">
                {children}
            </div>
        </>

    )
}