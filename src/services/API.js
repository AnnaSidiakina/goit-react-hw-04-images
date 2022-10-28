import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29502904-bb8b76f5b0eb667a79f07b05e';
const BASE_FILTERS = 'image_type=photo&orientation=horizontal&per_page=12';

const FetchGallery = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&${BASE_FILTERS}`
  );
  const galleryItems = {
    gallery: response.data.hits.map(image => {
      const { id, largeImageURL, webformatURL, tags } = image;
      return {
        id,
        largeImageURL,
        webformatURL,
        tags,
      };
    }),
    total: response.data.total,
  };
  return galleryItems;
};
export default FetchGallery;
