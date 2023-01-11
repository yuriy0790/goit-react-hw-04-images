import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ data, onImgClick }) => (
  <ul className={styles.ImageGallery}>
    {data.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        smallImg={webformatURL}
        bigImg={largeImageURL}
        onImgClick={onImgClick}
        alt={tags}
      />
    ))}
  </ul>
);
export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
