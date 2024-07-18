import Paragraph from '@/typography/Paragraph/Paragraph';
import Title from '@/typography/Title/Title';
import styles from "../../assets/styles/index.module.scss";
import classNames from 'classnames';
const Description = ({ section }: { section?: { title: string; paragraph: string }[] }) => {
  return <div className={classNames(styles.box)}>
    {section?.map(({ title, paragraph }) => {
      return <div key={title}>
        {paragraph === "" ? <Title text={title} /> : <p className={styles.subtitle}>{title}</p>}

        {paragraph && <Paragraph text={paragraph} color={"dark"} />}
      </div>
    })}
  </div>
}

export default Description
