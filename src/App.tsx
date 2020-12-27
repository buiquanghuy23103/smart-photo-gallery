import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { PictureListComponent } from './components/PictureListComponent';

export type Picture = {
  id: string,
  url: string,
  description: string,
  width: number
};

function App(): JSX.Element {

  const initialPictureList: Array<Picture> = [
    { id: uuidv4(), width: 150, description: "bycicle", url: "https://images.unsplash.com/photo-1608268191812-62ed1505e62a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" },
    { id: uuidv4(), width: 150, description: "bycicle", url: "https://images.unsplash.com/photo-1606673448434-c04296eed454?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80" },
    { id: uuidv4(), width: 150, description: "bycicle", url: "https://images.unsplash.com/photo-1608153650930-78399f51bd44?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" },
    { id: uuidv4(), width: 150, description: "bycicle", url: "https://images.unsplash.com/photo-1608153529195-23ee00ef98a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80" },

  ]

  const [pictureList, setPictureList] = useState(initialPictureList);
  const [newPictureLink, setNewPictureLink] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  const addPicture = () => {
    if (!!newPictureLink) {
      const newPicture = { id: uuidv4(), width: 180, description: "bycicle", url: newPictureLink };
      setPictureList([...pictureList, newPicture]);
    }

  };

  function removePicture(pictureId: string) {
    const pictureListClone = [...pictureList];
    const newPictureList = pictureListClone.filter(picture => picture.id !== pictureId);
    setPictureList(newPictureList);
  }

  function changePictureLink(newLink: string) {
    setNewPictureLink(newLink);
  }

  const disableAttr = newPictureLink !== "" ? "bg-green-600" : "bg-green-300";

  return (
    <section className="flex justify-center">
      <div className="w-1/2">
        <div className="text-center">
          <div className="my-4"> Hello </div>
        </div>
        <section>
          <PictureListComponent
            pictureList={ pictureList }
            onItemClick={ removePicture } />
          <div className="flex justify-between my-5">
            <div className="w-full">
              <input
                type="text"
                ref={ inputRef }
                className="p-2 border border-gray-800 shadow rounded w-full"
                onChange={ (e) => changePictureLink(e.target.value) } />
            </div>
            <div className="ml-2">
              <button
                disabled={ newPictureLink === "" }
                className={ `p-2 text-white ${disableAttr}` }
                onClick={ () => addPicture() }>Add</button>
            </div>
          </div>
        </section>

      </div>

    </section>
  );

}

export default App;
