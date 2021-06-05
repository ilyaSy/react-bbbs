import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Api from '../utils/api';

export default function useVideos(perPage) {
  const [videosData, setVideosData] = useState([]);
  const [chosenVideo, setChosenVideo] = useState({});
  const [videoTags, setVideoTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    Api.getVideos()
      .then((data) => {
        // Неавторизованный пользователь не видит видео с тегом "Ресурсная группа"
        const filteredData = data.filter(
          ({ tag }) => currentUser || !currentUser === (tag.name !== 'Ресурсная группа')
        );
        setVideosData(filteredData);
        // Видео, выбранное модератором
        const chosen = data.filter((video) => video.chosen)[0];
        setChosenVideo({ ...chosen });
        // Список уникальных тегов для кнопок фильтра-рубрикатора
        const tagsData = filteredData
          .map((video) => video.tag.name)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setVideoTags(['Все', ...tagsData]);
        setPageCount(Math.ceil(data.length / perPage));
      })
      .catch(console.log);
  }, []);

  return { videosData, chosenVideo, videoTags, pageCount };
}
