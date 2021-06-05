import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useMainDataCities() {
  const [mainData, setMainData] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    Promise.all([Api.getCities(), Api.getMain()])
      .then(([dataCities, dataMain]) => {
        setCities(dataCities);
        setMainData(dataMain);
      })
      .catch(console.log);
  }, []);

  return { mainData, cities };
}
