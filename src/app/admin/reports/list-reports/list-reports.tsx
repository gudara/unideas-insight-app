import { ScrollArea } from "@/components/ui/scroll-area";
import { Report } from "@/lib/interfaces/report-interface";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ListReportsProps {
    list: Report[];
    selectedList?: Report[];
}

export const ListReports: React.FC<ListReportsProps> = ({ list, selectedList }) => {



    return <>
        <ScrollArea className="h-80 w-4/5 rounded border">
            <div className="flex flex-col justify-around">
                {
                    list?.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "flex flex-col items-start gap-0 border-b px-4 py-2 text-left text-sm transition-all hover:bg-accent"
                            )}

                        >
                            <div className="flex flex-row">

                                <div className="justify-start w-12 content-center">
                                    {item.isSelected && <Check className="" />}
                                </div>
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
            </div>
        </ScrollArea>
    </>
}