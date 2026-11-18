import Heading from "@/typography/Heading/Heading";
import pageStyles from "./Header.module.scss";
import Header from "@/typography/Header/Header";
import Image from "next/image";
import blogHeaderImage from "@/assets/images/pic1.png";
type HeroBlogPageProps = {
    title: string;
    description: string;
    label?: string;
};

const HeroBlogPage = ({
    title,
    description,
    label = "Blog",
}: HeroBlogPageProps) => {
    return (
        <header className={pageStyles.header}>
            <div className={pageStyles.copy}>
                <Heading text={label} />
                <Header text={title} color="dark" as="h1" />
                <p className={pageStyles.description}>{description}</p>
            </div>

            <Image
                src={blogHeaderImage}
                alt="blog decorative image"
                className={pageStyles.heroImage}
                sizes="(max-width: 899px) 100vw, 40vw"
                priority
            />

        </header>
    );
};

export default HeroBlogPage;
