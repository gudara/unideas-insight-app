import PageHeader from "@/components/page-header";
import { get } from "@/db-operations/company";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const CompanyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id;

  let company = await get(+id)

  let header = company ? `${company.name}` : 'Company';
  let description = company ? '' : '';

  return (
    <>
      <PageHeader header={header} description={description} />
      <div>
        <h1>Company ID: {id}</h1>
        {/* Your component's content */}
      </div>
    </>
  );
};

export default CompanyPage;