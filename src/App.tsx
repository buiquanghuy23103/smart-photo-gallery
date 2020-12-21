import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import './App.css';
import Picture from './components/PictureComponent';

function App(): JSX.Element {

  const initialPictureLinkList: Array<string> = [
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1308&q=80",
    "https://images.unsplash.com/photo-1573551461515-4c44d140a829?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1434&q=80",
    "https://images.unsplash.com/photo-1606895213385-e0a005ef801a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1512518463689-538edacd754d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
  ];


  const [pictureLinkList, setPictureLinkList] = useState(initialPictureLinkList);
  const [newPictureLink, setNewPictureLink] = useState("");

  const addPicture = () => {
    if (!!newPictureLink) {
      setPictureLinkList([...pictureLinkList, newPictureLink]);
    }

  };

  function changePictureLink(newLink: string) {
    setNewPictureLink(newLink);
  }

  const pictureList = pictureLinkList.map(link => (
    <Picture pictureLink={ link } description={ "bycicle" } width={ 150 } />
  ));

  const disableAttr = newPictureLink !== "" ? "bg-green-600" : "bg-green-300";

  return (
    <section className="flex justify-center">
      {console.log("re-render") }
      <div className="w-1/2">
        <div className="text-center">
          <div className="my-4"> Hello </div>
        </div>
        <section>
          <div className="flex flex-wrap justify-center">
            { pictureList }
          </div>
          <div className="flex justify-between my-5">
            <input
              type="text"
              className="p-2 border border-gray-800 shadow rounded"
              onChange={ (e) => changePictureLink(e.target.value) } />
            <button
              disabled={ newPictureLink === "" }
              className={ `p-2 text-white ${disableAttr}` }
              onClick={ () => addPicture() }>Add picture</button>
          </div>
        </section>

      </div>

    </section>
  );

}

export default App;
