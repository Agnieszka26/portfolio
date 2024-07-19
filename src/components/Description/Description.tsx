import Paragraph from '@/typography/Paragraph/Paragraph';
import Title from '@/typography/Title/Title';
import classNames from 'classnames';
import styles from "../../assets/styles/index.module.scss";
const Description = ({ section }: { section?: { title: string; paragraph: string }[] }) => {
  if (section) {
    return <div className={classNames(styles.box)}>
      {section.map(({ title, paragraph }) => {
        return <div key={title}>
          {paragraph === "" ? <Title text={title} /> : <p className={styles.subtitle}>{title}</p>}

          {paragraph && <Paragraph text={paragraph} color={"dark"} />}
        </div>
      })}
    </div>
  }
  else return <></>
}

export default Description
