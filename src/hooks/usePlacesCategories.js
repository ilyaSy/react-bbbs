import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function usePlacesTags(currentCity) {
  const [places, setPlaces] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (currentCity)
      Promise.all([Api.getPlaces(currentCity), Api.getPlacesTags()])
        .then(([placesResp, placesTags]) => {
          const data = placesResp.results;
          setPlaces(data);
          placesTags.unshift({ name: 'Все', id: 0 });
          setTags(placesTags);
        })
        .catch(console.log);
  }, [currentCity]);

  return { places, tags };
}
