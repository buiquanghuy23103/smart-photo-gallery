import { useEffect, useState } from 'react';
import './App.css';
import LoadingComponent from './components/LoadingComponent';
import { PictureListComponent } from './components/PictureListComponent';
import useFetchPicture from './utils/hooks/useFetchPicture';
import useScroll from './utils/hooks/useScroll';


function App(): JSX.Element {

  const scrollPosition = useScroll();
  const [page, setPage] = useState(1);
  const [pictureList, setPictureList, errors, isLoading] = useFetchPicture(page);

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
    console.log("State has just been changed");

  }

  function loadMore() {
    setPage(page + 1);
  }

  function shouldHideOnErrorsAndLoading() {
    if (errors.length > 0) {
      return "hidden";
    }
    return ""
  }

  function showErrorMessage() {
    if (errors.length > 0) {
      return (<div className="flex h-screen">

        <p className="m-auto">{ errors[0] }</p>
      </div>)
    }

    return null;
  }

  useEffect(() => {
    const isBottomReached = scrollPosition === document.body.offsetHeight - window.innerHeight;
    if (isBottomReached) {
      loadMore();
    }
  }, [scrollPosition]);


  if (isLoading) return (<LoadingComponent />)

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
          <PictureListComponent
            pictureList={ pictureList }
            onItemClick={ removePicture } />
          <button className={ shouldHideOnErrorsAndLoading() } type="submit" onClick={ loadMore }>Load more</button>
        </section>
      </div>

    </section>
  );

}

export default App;
