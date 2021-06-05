import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import defineFigure from '../../../utils/renderFigures';
import GuideCard from '../../Cards/GuideCard/GuideCard';
import Heading from '../../UI/Heading/Heading';
import useGuide from '../../../hooks/useGuide';
import './GuidePage.css';

const GuidePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { materialsData, pageCount } = useGuide(perPage);

  const currentPageData = materialsData
    .slice(offset, offset + perPage)
    .map(({ id: key, ...args }, i) => <GuideCard key={key} figure={defineFigure(i)} {...args} />);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="guides content main__section">
      <Heading>Справочник</Heading>
      <p className="guides__caption">
        Памятка новичка&nbsp;&mdash; наши метариалы, где сможете найти всю базовую информацию,
        рассказанную на&nbsp;вводном тренинге. Если вы&nbsp;захотите освежить свои знания,
        и&nbsp;напомнить себе о&nbsp;чем-то.
      </p>
      <ul className="guide guide_type_all">{currentPageData}</ul>
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        breakClassName="pagination__link"
        breakLabel="..."
        activeClassName="pagination__link_active"
        nextClassName="pagination__forward"
        pageLinkClassName="pagination__link"
        onPageChange={handlePageClick}
      />
    </section>
  );
};

export default GuidePage;
