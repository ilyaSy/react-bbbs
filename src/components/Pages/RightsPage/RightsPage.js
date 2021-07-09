import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import defineColor from '../../../utils/renderColors';
import defineFigure from '../../../utils/renderFigures';
import RightsCard from '../../Cards/RightsCard/RightsCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import Api from '../../../utils/api';
import tagsFilter from '../../../utils/filtering';
import './RightsPage.css';

const RightsPage = () => {
  const tagAll = { name: 'Все', id: 0, slug: '' };
  const [params, setParams] = useState([]);
  const [rights, setRights] = useState([]);
  const [tags, setTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    Api.getRightsTags()
      .then((tagsData) => {
        tagsData.unshift(tagAll);
        setTags(tagsData);
        setActiveTags([tagAll]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    Api.getRights(params.join())
      .then((rightsData) => {
        setRights(rightsData.results);
        setPageCount(rightsData.totalPages);
      })
      .catch(console.log);
  }, [params]);

  const currentPageData = rights.map(({ id: key, ...args }, i) => (
    <RightsCard key={key} color={defineColor(i)} figure={defineFigure(i)} {...args} />
  ));

  const handleTagFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
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
      <Pagination pageCount={pageCount} />
    </section>
  );
};

export default RightsPage;
