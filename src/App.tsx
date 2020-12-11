import React, { useEffect, useState } from 'react';
import './App.css';
import PictureContainer from './components/PictureContainerComponent';

function App() {

  const [title, setTitle] = useState("Hello");
  const [shouldShowPicture, setShowPicture] = useState(false);

  useEffect(() => {
    console.log("App is mounted");
    
  });


  const toggleImageAppearance = () => {
    setShowPicture(!shouldShowPicture);
  }

  return (
    <section className="flex justify-center">
      {console.log("re-render")}
      <div className="w-1/2">
        <div className="text-center">
          <div className="my-4"> { title } </div>
          <button
            className="p-1 bg-blue-700 text-white my-2"
            onClick={ toggleImageAppearance }
          >
            Toggle image
            </button>
        </div>
      </div>
      <PictureContainer shouldShowPicture={ shouldShowPicture } />
    </section>
  );

}

export default App;
