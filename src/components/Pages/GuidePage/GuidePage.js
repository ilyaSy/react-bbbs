import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import defineFigure from '../../../utils/renderFigures';
import Api from '../../../utils/api';
import GuideCard from '../../Cards/GuideCard/GuideCard';
import './GuidePage.css';

const GuidePage = () => {
  const [materialsData, setMaterialsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  let pageCount;

  useEffect(() => {
    Api.getMaterials()
      .then((data) => {
        setMaterialsData(data);
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  const currentPageData = materialsData
    .slice(offset, offset + perPage)
    .map(({ id: key, ...args }, i) => <GuideCard key={key} figure={defineFigure(i)} {...args} />);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="guides content main__section">
      <h1 className="heading">Справочник</h1>
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
