import TechnicalDescriptionPage from "@/components/TechnicalDescriptionPage";
import getDetails from "@/lib/getDtails";
import { get } from "http";
import { getLocale } from "next-intl/server";

type ParamsSlug = "trudly" | "trudly-mini" | "kettlo" | "smartwear";

const Page = async ({ params }: { params: { slug: ParamsSlug } }) => {
  const locale = await getLocale()
  const details = await getDetails(locale);
console.log("details[0].header", details[1].header,"params.slug", params.slug)
  const detail = details.filter(({ header }) => header === params.slug);

  return <TechnicalDescriptionPage detail={detail[0]} />;
};
export default Page;
