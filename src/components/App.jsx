import { useState, useEffect } from 'react';
import pixabayAPI from '../services/api-service';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

const App = () => {
  const [status, setStatus] = useState('start');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    if (!search) return;
    getImages();
  // eslint-disable-next-line
  }, [search, page]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getImages = async () => {
    setStatus('loading');
    try {
      const { hits, totalHits } = await pixabayAPI.searchImages(search, page);

      if (!hits.length) {
         toast.info('Sorry, but there are no results for your search.');
        return;
      }

      setImages([...images, ...hits]);
      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStatus('resolved');
    }
  }

  const calculateTotalPages = total => setTotalPages (Math.ceil(total / 12));

  const setNewSearch = search => {
      setStatus('start');
      setSearch(search);
      setPage(1);
      setImages([]);
      setTotalPages(1);
  };

  const setNextPage = () => setPage(page => page + 1);

  const isVisibleButton = page < totalPages && status === 'resolved';
     
    return (
      <Layout>
        <Searchbar onSearch={setNewSearch}/>

        {images.length > 0 && (
          <ImageGallery images={images} onClick={setActiveImage}/>
        )}

        {activeImage && (
          <Modal
            url={activeImage}
            onClose={() => setActiveImage(null)}
          />
        )}

        {isVisibleButton && (
          <Button onClick={setNextPage}>Load More</Button>
        )}
          
        {status === 'loading' && <Loader/>}

        <ToastContainer theme="colored" autoClose={3000}/>
        <GlobalStyle/>
      </Layout>
       
    );
  };

export default App;