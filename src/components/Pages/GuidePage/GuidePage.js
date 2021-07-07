import { useState } from 'react';
import { Helmet } from 'react-helmet';
import defineFigure from '../../../utils/renderFigures';
import GuideCard from '../../Cards/GuideCard/GuideCard';
import Heading from '../../UI/Heading/Heading';
import useGuide from '../../../hooks/useGuide';
import './GuidePage.css';
import Pagination from '../../UI/Pagination/Pagination';

const GuidePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { materialsData, pageCount } = useGuide();
  console.log('GuidePage', currentPage); // не понятно пока, что делать с currentPage
  const currentPageData = materialsData.map(({ id: key, ...args }, i) => (
    <GuideCard key={key} figure={defineFigure(i)} {...args} />
  ));

  return (
    <section className="guides content main__section">
      <Helmet>
        <title>Справочник</title>
        <meta name="description" content="guide" />
      </Helmet>
      <Heading>Справочник</Heading>
      <p className="guides__caption">
        Памятка новичка&nbsp;&mdash; наши метариалы, где сможете найти всю базовую информацию,
        рассказанную на&nbsp;вводном тренинге. Если вы&nbsp;захотите освежить свои знания,
        и&nbsp;напомнить себе о&nbsp;чем-то.
      </p>
      <ul className="guide guide_type_all">{currentPageData}</ul>
      <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </section>
  );
};

export default GuidePage;
