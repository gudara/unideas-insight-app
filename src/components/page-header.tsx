'use client'
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
    header: string;
    description: string | any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ header, description }) => {
    return (
        <>
            <div className="relative">
                <h2 className="text-2xl font-bold tracking-tight">{header}</h2>
                <div className="text-muted-foreground text-base/6 " >
                    {typeof description === 'string' ? description : description}
                </div>
            </div>
            {/* <Separator className="mb-0" /> */}
        </>
    );
};

export default PageHeader;
