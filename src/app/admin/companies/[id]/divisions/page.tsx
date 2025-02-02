import PageHeader from "@/components/page-header";
import { get } from "@/db-operations/company";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import LoadingComponent from "../loading";
import { DivisionAddNewButton } from "../components/division-add-new-button";

const DivisionPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const companyId = (await params).id;
    const company = await get(+companyId)

    const header = company ? `Divisions of ${company.name}` : 'Divisions';
    const description = 'List of divisions assign to the particular company';

    return (
        <Suspense fallback={<LoadingComponent />}>
            <PageHeader header={header} description={description} />
            <div className="w-full h-full flex justify-center items-center border border-t-0">

                <div >
                    <div className="flex justify-between px-4 py-2">
                        <h1 className="text-lg font-bold">Divisions</h1>
                        {company && <DivisionAddNewButton company={company} />}
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-2 p-4 pt-0">
                        <button
                            key="itemID"
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                true && "bg-muted"
                            )}

                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">Cutting</div>
                                    </div>
                                    <div
                                        className={cn(
                                            "ml-auto text-xs",
                                            ''
                                        )}
                                    >
                                        lksafdlsf
                                    </div>
                                </div>
                                <div className="text-xs font-medium">Sub title hear</div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                description hear
                            </div>

                        </button>

                        <button
                            key="itemID2"
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                true && "bg-muted"
                            )}

                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">Cutting</div>
                                    </div>
                                    <div
                                        className={cn(
                                            "ml-auto text-xs",
                                            ''
                                        )}
                                    >
                                        lksafdlsf
                                    </div>
                                </div>
                                <div className="text-xs font-medium">Sub title hear</div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                description hear
                            </div>

                        </button>

                        <button
                            key="itemID3"
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                true && "bg-muted"
                            )}

                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">Cutting</div>
                                    </div>
                                    <div
                                        className={cn(
                                            "ml-auto text-xs",
                                            ''
                                        )}
                                    >
                                        lksafdlsf
                                    </div>
                                </div>
                                <div className="text-xs font-medium">Sub title hear</div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                description hear
                            </div>

                        </button>
                    </div>
                </div>

            </div>
        </Suspense>
    );
};

export default DivisionPage;