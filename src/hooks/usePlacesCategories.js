import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function usePlacesCategories() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Api.getPlaces()
      .then((data) => {
        setPlaces(data);
        const categoriesData = data
          .map((place) => place.category)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setCategories(['Все', ...categoriesData]);
      })
      .catch(console.log);
  }, []);

  return { places, categories };
}
