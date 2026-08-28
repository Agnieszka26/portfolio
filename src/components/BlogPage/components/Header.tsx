import Heading from "@/typography/Heading/Heading";
import pageStyles from "./BlogPageComponents.module.scss";
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

            <Image src={blogHeaderImage} alt={title} width={650} height={300} />

        </header>
    );
};

export default HeroBlogPage;
