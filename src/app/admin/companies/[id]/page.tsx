import PageHeader from "@/components/page-header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { get } from "@/db-operations/company";
import { DivisionAddNewButton } from "./components/division-add-new-button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "../loading";
import { DivisionList } from "./components/division-list";

const CompanyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id;

  // const { data: company, isLoading } = useQuery<Company>({
  //   queryKey: ['companies', id],
  //   queryFn: async () => {
  //     const d = await get(+id)
  //     return d;
  //   },
  // })

  const company = await get(+id)

  const header = company ? `${company.name}` : 'Company';
  const description = '';

  return (
    <Suspense fallback={<Loading />}>
      <PageHeader header={header} description={description} />
      <div className="w-full h-full flex justify-center items-center border border-t-0 mt-2">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-full max-h-full max-w-full rounded"
        >
          <ResizablePanel
            defaultSize={25}
          >
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
              <DivisionList company={company} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Suspense>
  );
};

export default CompanyPage;