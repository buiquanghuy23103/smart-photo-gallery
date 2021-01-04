import { useEffect, useRef } from 'react';
import './App.css';
import { PictureListComponent } from './components/PictureListComponent';
import useFetchPicture from './utils/hooks/useFetchPicture';


function App(): JSX.Element {

  const [pictureList, setPictureList] = useFetchPicture();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateCountRef = useRef(0);

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
    console.log("State has just been changed");

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
        </section>

      </div>

    </section>
  );

}

export default App;
