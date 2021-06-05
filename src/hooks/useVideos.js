import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useVideos({ perPage }) {
  const [videosData, setVideosData] = useState([]);
  const [chosenVideo, setChosenVideo] = useState({});
  const [videoTags, setVideoTags] = useState([]);
  let pageCount;

  useEffect(() => {
    Api.getVideos()
      .then((data) => {
        setVideosData(data);
        // Видео, выбранное модератором
        const chosen = data.filter((video) => video.chosen)[0];
        setChosenVideo({ ...chosen });
        // Список уникальных тегов для кнопок фильтра-рубрикатора
        const tagsData = data
          .map((video) => video.tag.name)
          .filter((item, i, arr) => arr.indexOf(item) === i);
        setVideoTags(['Все', ...tagsData]);
        pageCount = Math.ceil(data.length / perPage);
      })
      .catch(console.log);
  }, []);

  return { videosData, chosenVideo, videoTags, pageCount };
}
