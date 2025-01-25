import React from 'react';
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
    header: string;
    description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ header, description }) => {
    return (
        <>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">{header}</h2>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>
            <Separator className="mb-4" />
        </>
    );
};

export default PageHeader;
