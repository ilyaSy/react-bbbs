import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import defineColor from '../../../utils/renderColors';
import defineFigure from '../../../utils/renderFigures';
import Api from '../../../utils/api';
import { setActiveFilters, filterItemByFiltersList } from '../../../utils/filters';
import RightsCard from '../../Cards/RightsCard/RightsCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import './RightsPage.css';

const RightsPage = () => {
  const [rightsData, setRightsData] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState(['Все']);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  let pageCount;

  useEffect(() => {
    Api.getRights()
      .then((data) => {
        setRightsData(data);
        const tagsData = data
          .map((item) => item.tag.name)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setTags(['Все', ...tagsData]);
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch(console.log);
  }, []);

  const currentPageData = rightsData
    .slice(offset, offset + perPage)
    .filter((item) => filterItemByFiltersList(activeTags, item.tag.name))
    .sort((a, b) => activeTags.indexOf(a.tag.name) > activeTags.indexOf(b.tag.name))
    .map(({ id: key, ...args }, i) => (
      <RightsCard key={key} color={defineColor(i)} figure={defineFigure(i)} {...args} />
    ));

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleTagFilter = (tag) => {
    setActiveTags(setActiveFilters(activeTags, tag));
  };

  return (
    <section className="law content main__section">
      <Heading>Права детей</Heading>
      <div className="scroll-container">
        <ScrollContainer list={tags} activeItems={activeTags} onClick={handleTagFilter} />
      </div>
      <ul className="law__list">{currentPageData}</ul>
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={pageCount}
        marginPagesDisplayed={1}
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

export default RightsPage;
