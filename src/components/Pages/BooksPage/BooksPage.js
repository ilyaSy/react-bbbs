import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import BookCard from '../../Cards/BookCard/BookCard';
import Heading from '../../UI/Heading/Heading';
import ScrollContainer from '../../UI/ScrollContainer/ScrollContainer';
import Pagination from '../../UI/Pagination/Pagination';
import Api from '../../../utils/api';
import tagsFilter from '../../../utils/filtering';
import './BooksPage.css';

const BooksPage = () => {
  const tagAll = { name: 'Все', id: 0, slug: '' };
  const [params, setParams] = useState([]);
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Api.getBooksTags()
      .then((tagsResp) => {
        tagsResp.unshift(tagAll);
        setTags(tagsResp);
        setActiveTags([tagAll]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    Api.getBooks(params.join())
      .then((booksResp) => {
        setBooks(booksResp.results);
        setPageCount(booksResp.totalPages);
      })
      .catch(console.log);
  }, [params]);

  const handleTagFilter = (tag) => {
    tagsFilter(tag, activeTags, setParams, setActiveTags);
  };

  const currentPageData = books.map(({ title, author, year, description, genre, id }) => (
    <BookCard
      title={title}
      author={author}
      year={year}
      description={description}
      genre={genre}
      key={id}
    />
  ));

  return (
    <section className="bookpage content main__section">
      <Helmet>
        <title>Книги</title>
        <meta name="description" content="books" />
      </Helmet>
      <Heading>Книги</Heading>
      <div className="scroll-container">
        <ScrollContainer list={tags} activeItems={activeTags} onClick={handleTagFilter} />
      </div>
      <ul className="bookpage__list">{currentPageData}</ul>
      <Pagination pageCount={pageCount} />
    </section>
  );
};

export default BooksPage;
