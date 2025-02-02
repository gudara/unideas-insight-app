'use client'
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from './ui/skeleton';

const PageHeaderLoading = () => {
    return (
        <>
            <div className="relative">
                {/* <h2 className="text-2xl font-bold tracking-tight">{header}</h2> */}
                <Skeleton className="h-6 w-48"  />
                <div className="text-muted-foreground text-base/6 py-2" >
                    <Skeleton className="h-4 w-78" />
                    {/* {typeof description === 'string' ? description : description} */}
                </div>
            </div>
            <Separator className="mb-0" />
        </>
    );
};

export default PageHeaderLoading;
