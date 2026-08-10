import SubPageHeader from "@/components/SubPageHeader";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServicePage, servicePages } from "@/lib/servicePages";

export function generateStaticParams() {
  return Object.keys(servicePages).map((key) => ({ slug: key.split("/") }));
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = getServicePage(slug.join("/"));

  return (
    <>
      <SubPageHeader category={page.category} title={page.title} />
      <ServiceDetailPage page={page} />
    </>
  );
}
