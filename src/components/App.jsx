import { useState, useEffect } from 'react';
import { GlobalStyleComponent } from 'styles/GlobalStyles';

import { AppWrap } from './AppWrap/AppWrap.styled';
import axiosSearchImages from '../services/axiosSearchImages';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(Status.PENDING);
    // setError('');
    axiosSearchImages(query, page)
      // .then(response => {
      //   return {
      //     data: response.data.hits,
      //     totalHits: response.data.totalHits,
      //   };
      // })
      .then(({ data: { hits: data, totalHits } }) => {
        if (!data.length) {
          setStatus(Status.REJECTED);
          setError(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setTotalHits(totalHits);
        setData(prevData => [...prevData, ...data]);
        setStatus(Status.RESOLVED);
      })
      .catch(() => {
        setStatus(Status.REJECTED);
        setError('Something went wrong...');
      });
  }, [query, page]);

  const formSubmitHandler = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setData([]);
    setError('');
  };

  const onImgClick = (largeImageURL, alt) => {
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const isBtnShown = error === '' && totalHits !== 0 && totalHits > data.length;
  return (
    <>
      <AppWrap>
        <SearchBar onSubmit={formSubmitHandler} />
        <ImageGallery data={data} onImgClick={onImgClick} />
        {status === 'pending' && (
          <>
            <Loader />
            <p>Loading images by query: {query} ...</p>
          </>
        )}
        {(status === 'rejected' || error) && <p>{error}</p>}
        {isBtnShown && <Button loadMore={loadMore} />}
      </AppWrap>
      {largeImageURL && (
        <Modal
          alt={alt}
          largeImageURL={largeImageURL}
          onImgClick={onImgClick}
        />
      )}
      <GlobalStyleComponent />
    </>
  );
}
