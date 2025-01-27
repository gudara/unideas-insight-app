import React from 'react';
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
    header: string;
    description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ header, description }) => {
    return (
        <>
            <div className="relative">
                <h2 className="text-2xl font-bold tracking-tight">{header}</h2>
                <p className="text-muted-foreground text-base/6" >
                    {description}
                </p>
            </div>
            <Separator className="mb-0" />
        </>
    );
};

export default PageHeader;
