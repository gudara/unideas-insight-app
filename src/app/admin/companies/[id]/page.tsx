
const CompanyPage = async ({
    params,
  }: {
    params: Promise<{ id: string }>
  }) => {
  const id  = (await params).id;
  

  return (
    <div>
      <h1>Company ID: {id}</h1>
      {/* Your component's content */}
    </div>
  );
};

export default CompanyPage;