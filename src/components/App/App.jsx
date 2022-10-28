import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreButton from '../Button/Button';
import FetchGallery from '../../services/API';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentLargeImage, setCurrentLargeImage] = useState('');
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);

    async function AddImageGallery() {
      try {
        const response = await FetchGallery(query, page);

        setGallery(prevGallery => [...prevGallery, ...response.gallery]);
        setTotal(response.total);
        setLoading(false);

        if (response.gallery.length === 0) {
          toast.error(
            "Sorry, we can't find anyting for your request. Please, enter another request"
          );
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    AddImageGallery();
  }, [query, page]);

  const formSubmitHandler = query => {
    if (query.trim() === '') {
      toast.error('Please, enter your request');
      return;
    }
    setQuery(query);
    setPage(1);
    setGallery([]);
  };

  const onLoadMoreButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onModalOpen = largeImageURL => {
    setCurrentLargeImage(largeImageURL);
  };
  const onModalClose = () => {
    setCurrentLargeImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={formSubmitHandler} loading={loading} />
      {error && <p>Something went wrong, please, try again</p>}
      {loading && <Loader />}
      {gallery.length > 0 && (
        <ImageGallery galleryItems={gallery} onClick={onModalOpen} />
      )}

      <ToastContainer autoClose={3000} />
      {gallery.length > 0 && total / page > 12 && (
        <LoadMoreButton onLoadMore={onLoadMoreButton} isLoading={loading} />
      )}
      {currentLargeImage && (
        <Modal closeModal={onModalClose} largeImageURL={currentLargeImage} />
      )}
    </div>
  );
};
export default App;
