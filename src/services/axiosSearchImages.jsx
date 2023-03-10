import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '31539344-c129af0d709d10cb9757ecef9';

const axiosSearchImages = async (query, page) => {
  const { data } = await axios.get(
    `${URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`
  );
  return data;
};

export default axiosSearchImages;
