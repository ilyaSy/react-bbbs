import { useState, useEffect } from 'react';
import Api from '../utils/api';

export default function useVideos() {
  const [videosData, setVideosData] = useState([]);
  const [chosenVideo, setChosenVideo] = useState({});
  const [videoTags, setVideoTags] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    Promise.all([Api.getVideos(), Api.getMain(), Api.getVideosTags()])
      .then(([videos, main, tags]) => {
        // Неавторизованный пользователь не видит видео с тегом "Ресурсная группа"
        setVideosData(videos.results);
        setChosenVideo(main.video[0]); // выбранное модератором
        tags.unshift({ name: 'Все', id: 0 });
        setVideoTags(tags);
        setPageCount(videos.totalPages);
      })
      .catch(console.log);
  }, []);

  return { videosData, chosenVideo, videoTags, pageCount };
}
