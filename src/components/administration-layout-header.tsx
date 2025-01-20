'use client'
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { JSX } from "react";
import Link from "next/link";

export default function AdministrationLayoutHeader() {
    const pathname = usePathname();
    const pathNameArray = pathname.split('/');

    const itemList: JSX.Element[] = [];
    for (const [index, item] of pathNameArray.entries()) {
        if (index + 1 < +pathNameArray.length) {
            itemList.push(
                <BreadcrumbItem className="hidden md:block" key={index}>
                    {/* <Link href={'/' +pathNameArray.slice(0, index+1).join('/')}>
                    </Link> */}
                    <BreadcrumbLink asChild>
                    <Link href={pathNameArray.slice(0, index+1).join('/')}>
                    {item.trim().charAt(0).toUpperCase() + item.trim().slice(1)}
                    </Link>
                        
                    </BreadcrumbLink>
                </BreadcrumbItem>
            );
        }
        else {
            itemList.push(
                <BreadcrumbItem className="hidden md:block" key={index}>
                    <BreadcrumbPage>
                        {item.trim().charAt(0).toUpperCase() + item.trim().slice(1)}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            );
        }

        if (index + 1 < +pathNameArray.length && index !== 0) {
            itemList.push(
                <BreadcrumbSeparator className="hidden md:block" key={index.toString()+'x'} />
            );
        }
    }
    return (
        <header className="w-full p-2">
            <div className="flex grow items-center gap-2 px-3 mx-auto">
                <SidebarTrigger />
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <Breadcrumb className="">
                    <BreadcrumbList>
                        {itemList}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
        // <div>Administration layout header asamfndsmfnds dsfn dsmf n</div>
    )
}