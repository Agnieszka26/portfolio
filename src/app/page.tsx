import About from "@/components/About/About";
import HeroArea from "@/components/HeroArea/HeroArea";
import WorkSection from "@/components/WorkSection/WorkSection";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title> Agna </title>
      </Head>
      <HeroArea />
      <WorkSection />
      <About />
    </>
  );
};
export default Page;
