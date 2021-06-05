import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useReadWatch({ perPage }) {
  const [materialsData, setMaterialsData] = useState([]);
  let pageCount;

  useEffect(() => {
    Api.getMaterials()
      .then((data) => {
        setMaterialsData(data);
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return { materialsData, pageCount };
}
