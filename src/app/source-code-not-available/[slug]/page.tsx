import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import getDetails from "@/lib/getDtails";

type ParamsSlug = "trudly" | "trudly.mini" | "kettlo" | "smartwear";

const Page = async ({
  params,
}: {
  params: { slug: ParamsSlug };
}) => {
  const details = await getDetails();
  const detail = details.filter(
    ({ header }) => header === params.slug,
  );
  console.log('details', detail)
  return (
    <TechnicalDescriptionPage detail={detail[0]}/>
  );
}
export default Page;
