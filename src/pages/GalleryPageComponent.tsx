import React, { useState } from 'react'
import useDebounce from '../utils/hooks/useDebounce';
import useFetchPicture from '../utils/hooks/useFetchPicture';
import { PictureListComponent } from '../components/PictureListComponent';

export default function GalleryPageComponent() {

    const [query, setQuery] = useState<string | null>(null);
    const [pictureList, setPictureList, errors, page, setPage] = useFetchPicture(query);
    const debounce = useDebounce();

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
        debounce(() => {
            setQuery(queryString);
        });
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
                { showErrorMessage() }
                <PictureListComponent
                    pictureList={ pictureList }
                    onItemClick={ removePicture }
                    loadMore={ loadMore } />
            </div>

        </section>
    );

}
