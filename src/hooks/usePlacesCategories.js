import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function usePlacesCategories(currentCity) {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenPlace, setChosenPlace] = useState({});

  useEffect(() => {
    Api.getPlaces()
      .then((response) => {
        const data = response.results;
        const filteredByCity = data.filter((place) =>
          currentCity ? place.city === currentCity : place
        );
        setPlaces(filteredByCity);
        const categoriesData = filteredByCity
          .map((place) => place.category)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setCategories(['Все', ...categoriesData]);
        const chosenPlaces = filteredByCity.filter((place) => place.chosen);
        setChosenPlace(chosenPlaces.length !== 0 ? { ...chosenPlaces[0] } : null);
      })
      .catch(console.log);
  }, [currentCity]);

  return { places, categories, chosenPlace };
}
