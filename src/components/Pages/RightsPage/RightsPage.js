import { useState } from 'react';
import { Helmet } from 'react-helmet';
import defineColor from '../../../utils/renderColors';
import defineFigure from '../../../utils/renderFigures';
import { setActiveFilters, filterItemByFiltersList } from '../../../utils/filters';
import RightsCard from '../../Cards/RightsCard/RightsCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import useRightsTags from '../../../hooks/useRightsTags';
import './RightsPage.css';

const RightsPage = () => {
  const [activeTags, setActiveTags] = useState(['Все']);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 16;
  const offset = currentPage * perPage;
  const { rightsData, tags, pageCount } = useRightsTags(perPage);

  const currentPageData = rightsData
    .slice(offset, offset + perPage)
    .filter((item) => filterItemByFiltersList(activeTags, item.tag.name))
    .sort((a, b) => activeTags.indexOf(a.tag.name) > activeTags.indexOf(b.tag.name))
    .map(({ id: key, ...args }, i) => (
      <RightsCard key={key} color={defineColor(i)} figure={defineFigure(i)} {...args} />
    ));

  const handleTagFilter = (tag) => {
    setActiveTags(setActiveFilters(activeTags, tag));
  };

  return (
    <section className="law content main__section">
      <Helmet>
        <title>Права детей</title>
        <meta name="description" content="law" />
      </Helmet>
      <Heading>Права детей</Heading>
      <div className="scroll-container">
        <ScrollContainer list={tags} activeItems={activeTags} onClick={handleTagFilter} />
      </div>
      <ul className="law__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} setCurrentPage={setCurrentPage} />
    </section>
  );
};

export default RightsPage;
