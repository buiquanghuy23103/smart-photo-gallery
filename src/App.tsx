import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { PictureListComponent } from './components/PictureListComponent';
import axios from 'axios';
import { Picture } from './types/PictureResponseTypes';


function App(): JSX.Element {

  const [pictureList, setPictureList] = useState([] as Picture[]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateCountRef = useRef(0);

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
    console.log("State has just been changed");

  }


  function downloadPictures() {
    axios.get<Picture[]>("https://api.unsplash.com/photos/?client_id=PnDF2ZcbxQ7Ii5WcT22GUOPIbQSEicXONmkDmKiraAo")
      .then(res => {
        console.log(res.data);

        setPictureList(res.data);
      })
      .catch(err => {
        console.log(err);

      });
  }

  useEffect(() => {// on App mount
    inputRef.current?.focus();
    downloadPictures();
  }, []);

  useEffect(() => {
    updateCountRef.current = updateCountRef.current + 1;
    console.log("I am useEffect");

  });

  return (
    <section className="flex justify-center">
      { console.log("I am component") }
      <div className="w-1/2">
        <div className="text-center">
          <div className="my-4">
            <h1>HELLO</h1>
            <h2>Update count: { updateCountRef.current }</h2>
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
