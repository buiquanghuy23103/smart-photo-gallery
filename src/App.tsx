import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import LoadingComponent from './components/LoadingComponent';
import { PictureListComponent } from './components/PictureListComponent';
import useFetchPicture from './utils/hooks/useFetchPicture';


function App(): JSX.Element {

  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pictureList, setPictureList, errors] = useFetchPicture(page, query);
  const [typingTimemout, setTypingTimeout] = useState<number | null>(null);

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
  }

  function loadMore() {
    setPage(page + 1);
  }


  function showErrorMessage() {
    if (!!errors && errors.length > 0) {
      return (<div className="flex h-screen">
        <p className="m-auto">{ errors[0] }</p>
      </div>)
    }

    return null;
  }

  function searchPictures(queryString: string | null) {
    if (!!typingTimemout) {
      window.clearTimeout(typingTimemout);
    }

    const timeout = window.setTimeout(() => {
      setQuery(queryString);
    }, 1000);

    setTypingTimeout(timeout);
  }

  return (
    <section>
      <div className="my-5 m-5">
        <input
          className="w-full border rounded shadow p-2"
          placeholder="Search photos here"
          type="text"
          onChange={ e => searchPictures(e.target.value) } />
      </div>
      <div className="flex m-10">
        <div className="text-center">
          <div className="my-4">
            { showErrorMessage() }
          </div>
        </div>
        <section>
          <InfiniteScroll
            dataLength={ pictureList.length }
            next={ loadMore }
            hasMore={ true }
            loader={ <LoadingComponent /> }
          >

            <PictureListComponent
              pictureList={ pictureList }
              onItemClick={ removePicture } />
          </InfiniteScroll>
        </section>
      </div>

    </section>
  );

}

export default App;
