import PageHeader from "@/components/page-header";
import { get } from "@/db-operations/company";

const CompanyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id;

  const company = await get(+id)

  const header = company ? `${company.name}` : 'Company';
  const description =  '';

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