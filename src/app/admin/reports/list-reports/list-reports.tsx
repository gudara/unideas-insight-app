import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Report } from "@/lib/interfaces/report-interface";
import { cn } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";


interface ListReportsProps {
    list: Report[];
    isLoading: boolean;
    selectedIdList: number[];
    enableClickAction?: boolean;
    onSelectTrigger?: (isSelected: boolean, selected: Report) => void
}

export const ListReports: React.FC<ListReportsProps> = ({ list, onSelectTrigger = ()=>{}, isLoading, selectedIdList, enableClickAction = true }) => {
    const [loadingId, setLoadingId] = useState<number | null>(null);

    useEffect(() => {
        setLoadingId(null)
    }, [list, selectedIdList])

    return <>
        <ScrollArea className="h-full w-full content-center rounded border">
            <div className="flex flex-col justify-around">
                {
                    !isLoading &&
                    list?.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "flex flex-col items-start gap-0 border-b px-4 py-2 text-left text-sm transition-all hover:bg-accent"
                            )}
                            onClick={() => {
                                if (enableClickAction) {
                                    onSelectTrigger(!selectedIdList?.includes(item.id), item);
                                    setLoadingId(item.id)
                                }
                            }}
                        >
                            <div className="flex flex-row">
                                {
                                    enableClickAction &&
                                    <div className="justify-start w-12 content-center">

                                        {(selectedIdList?.includes(item.id) && loadingId !== item.id) && <Check className="" />}
                                        {loadingId === item.id && <LoaderCircle className="animate-spin text-muted-foreground size-5 mx-0 my-0" />}
                                    </div>
                                }
                                <div className="justify-normal">
                                    <div className="flex w-full flex-col gap-0">
                                        <div className="flex items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="font-semibold">{item.name}</div>
                                            </div>
                                            <div
                                                className={cn(
                                                    "ml-auto text-xs",
                                                    ''
                                                )}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                    <div className="line-clamp-2 text-xs text-muted-foreground">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                }
                {
                    isLoading &&
                    [1, 2, 3, 4, 5, 6].map((item) => (
                        <button
                            key={item}
                            className={cn(
                                "flex flex-col items-start gap-0 border-b px-4 py-2 text-left text-sm transition-all hover:bg-accent"
                            )}
                        >
                            <div className="flex flex-row">
                                <div className="justify-start w-12 content-center">

                                </div>
                                <div className="justify-normal">
                                    <div className="flex w-full flex-col gap-0">
                                        <div className="flex items-center">
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-4 w-[250px] my-2" />
                                            </div>
                                            <div
                                                className={cn(
                                                    "ml-auto text-xs",
                                                    ''
                                                )}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                    <div className="line-clamp-2 text-xs text-muted-foreground">
                                        <Skeleton className="h-3 w-[400px]" />
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                }
            </div>
        </ScrollArea>
    </>
}