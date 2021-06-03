import PropTypes from 'prop-types';
import './BookCard.css';

const BookCard = ({ title, author, year, description, genre }) => (
  <li className="book">
    <div className="book__item">
      <div
        className={`book__cover book__cover_genre_${genre === 'Научные' ? 'science' : 'fiction'}`}
      >
        <h3 className="book__heading">{title}</h3>
        <div className="book__caption">
          <p className="book__author">{author}</p>
          <p className="book__year">{`${year} год`}</p>
        </div>
      </div>
    </div>
    <div className="book__desc">
      <article className="event-article event-article_size_small event-article_place_book">
        <p className="event-article__paragraph">{description}</p>
      </article>
    </div>
  </li>
);

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BookCard;
