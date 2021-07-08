import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function usePlaces(currentCity) {
  const [places, setPlaces] = useState([]);
  const [tags, setTags] = useState([]);
  const [chosenPlace, setChosenPlace] = useState({});

  useEffect(() => {
    if (currentCity)
      Promise.all([Api.getPlaces(currentCity), Api.getPlacesTags(), Api.getMain()])
        .then(([placesResp, placesTags, mainResp]) => {
          const data = placesResp.results;
          setPlaces(data);
          placesTags.unshift({ name: 'Все', id: 0 });
          setTags(placesTags);
          setChosenPlace(mainResp.place[0]);
        })
        .catch(console.log);
  }, [currentCity]);

  return { places, tags, chosenPlace };
}
