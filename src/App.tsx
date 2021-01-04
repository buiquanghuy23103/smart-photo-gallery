import { useEffect, useRef, useState } from 'react';
import './App.css';
import { PictureListComponent } from './components/PictureListComponent';
import useFetchPicture from './utils/hooks/useFetchPicture';


function App(): JSX.Element {

  const [page, setPage] = useState(1);
  const [pictureList, setPictureList] = useFetchPicture(page);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateCountRef = useRef(0);

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
    console.log("State has just been changed");

  }

  function loadMore() {
    setPage(page + 1);
  }

  useEffect(() => {// on App mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    updateCountRef.current = updateCountRef.current + 1;
    console.log("I am useEffect");

  });

  return (
    <section className="flex justify-center">
      <div className="w-1/2">
        <div className="text-center">
          <div className="my-4">
            <h1>HELLO</h1>
          </div>
        </div>
        <section>
          <PictureListComponent
            pictureList={ pictureList }
            onItemClick={ removePicture } />
          <button type="submit" onClick={ loadMore }>Load more</button>
        </section>
      </div>

    </section>
  );

}

export default App;
