import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import LoadingComponent from './components/LoadingComponent';
import { PictureListComponent } from './components/PictureListComponent';
import useFetchPicture from './utils/hooks/useFetchPicture';


function App(): JSX.Element {

  const [page, setPage] = useState(1);
  const [pictureList, setPictureList, errors] = useFetchPicture(page);

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
  }

  function loadMore() {
    setPage(page + 1);
  }


  function showErrorMessage() {
    if (errors.length > 0) {
      return (<div className="flex h-screen">
        <p className="m-auto">{ errors[0] }</p>
      </div>)
    }

    return null;
  }



  return (
    <section className="flex justify-center">
      <div className="w-1/2">
        <div className="text-center">
          <div className="my-4">
            <h1>HELLO</h1>
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
