import PageHeader from "@/components/page-header";
import { get } from "@/db-operations/company";
import { CircleUserRound, Ellipsis, Mail, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";
import LoadingComponent from "../loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { TabDivisions } from "./components/tab-divisions";
import { TabReports } from "./components/tab-reports";

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
  const descriptionElements =

    <div className="flex">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex">
            <p className="flex justify-start"><MapPin size={14} className="mt-1 mr-1" /> {company.address ?? company.address}</p>
            <p className="flex justify-start"><Ellipsis size={16} className="mt-2 ml-2" /></p>
            {/* <p className="flex justify-start ml-6"><Phone size={16} className="mt-1 mr-1" /> {company.contactNumber}</p> */}
            {/* <p className="flex justify-start ml-6"><CircleUserRound size={16} className="mt-1 mr-1" /> {company.contactPersonName}</p> */}
            {/* <p className="flex justify-start ml-6"><Mail size={16} className="mt-1 mr-1" /> {company.contactEmail}</p> */}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold mb-2">{company.name}</h4>
              <div className="flex flex-col text-sm">
                <p className="flex justify-start"><MapPin size={14} className="mt-0.5 mr-2 text-muted-foreground" /> {company.address ?? company.address}</p>
                <p className="flex justify-start"><Phone size={14} className="mt-0.5 mr-2 text-muted-foreground" /> {company.contactNumber}</p>
                <p className="flex justify-start"><CircleUserRound size={14} className="mt-0.5 mr-2 text-muted-foreground" /> {company.contactPersonName}</p>
                <p className="flex justify-start"><Mail size={14} className="mt-0.5 mr-2 text-muted-foreground" /> {company.contactEmail}</p>
              </div>
              <div className="items-center">
                {/* <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "} */}
                <span className="flex flex-col text-xs text-muted-foreground">
                  <p>Created by  <b>{company.createdBy}</b> on <b>{company.createdAt.toLocaleString('en-US', {
                    weekday: 'long', // "Monday"
                    year: 'numeric', // "2025"
                    month: 'long', // "February"
                    day: 'numeric', // "7"
                    hour: 'numeric', // "2"
                    minute: 'numeric', // "30"
                    second: 'numeric', // "15"
                    hour12: true, // AM/PM
                  })}</b> </p>
                  {
                    company.lastUpdatedBy &&
                    <p>Updated by  <b>{company.lastUpdatedBy}</b> on <b>{company.lastUpdated?.toLocaleString('en-US', {
                      weekday: 'long', // "Monday"
                      year: 'numeric', // "2025"
                      month: 'long', // "February"
                      day: 'numeric', // "7"
                      hour: 'numeric', // "2"
                      minute: 'numeric', // "30"
                      second: 'numeric', // "15"
                      hour12: true, // AM/PM
                    })}</b> </p>
                  }
                  {/* {`Created By${company.createdBy} on ${company.createdAt}`} */}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>
        <PageHeader header={header} description={descriptionElements} />
        <div className="w-full h-full flex">
          <Tabs defaultValue="reports" className="w-full mt-4">
            <TabsList className="">
              <TabsTrigger value="reports">Company Level Reports</TabsTrigger>
              <TabsTrigger value="divisions">Divisions and Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="reports">
              <TabReports company={company}></TabReports>
            </TabsContent>
            <TabsContent value="divisions" className="min-h-full max-h-full max-w-full">
              <TabDivisions company={company}></TabDivisions>
            </TabsContent>
          </Tabs>


        </div>
      </Suspense>
    </>
  );
};

export default CompanyPage;