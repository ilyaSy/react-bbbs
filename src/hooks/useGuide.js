import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useGuide() {
  const [materialsData, setMaterialsData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Api.getMaterials()
      .then((data) => {
        setMaterialsData(data.results);
        setPageCount(data.count);
      })
      .catch(console.log);
  }, []);

  return { materialsData, pageCount };
}
