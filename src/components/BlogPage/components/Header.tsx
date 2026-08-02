import Heading from "@/typography/Heading/Heading";
import pageStyles from "./BlogPageComponents.module.scss";
import Header from "@/typography/Header/Header";

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

            <div className={pageStyles.visual} aria-hidden="true">
                <div className={pageStyles.circle} />
                <div className={pageStyles.panel} />
                <div className={pageStyles.bar} />
                <div className={pageStyles.browser}>
                    <div className={pageStyles.browserChrome}>
                        <span className={pageStyles.dot} />
                        <span className={pageStyles.dot} />
                        <span className={pageStyles.dot} />
                    </div>
                    <div className={pageStyles.browserBody}>
                        <div className={pageStyles.mountain} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeroBlogPage;
