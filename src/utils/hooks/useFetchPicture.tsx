import axios from 'axios';
import { useEffect, useState } from 'react';
import { Picture } from '../../types/PictureResponseTypes';

const BASE_URL = process.env.REACT_APP_UNSPLASH_URL;
const PUBLIC_KEY = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY;
const FIRST_PAGE_NUMBER = 1;

export default function useFetchPicture(query: string | null) {
    const [pictureList, setPictureList] = useState([] as Picture[]);
    const [errors, setErrors] = useState([] as string[]);
    const [page, setPage] = useState(FIRST_PAGE_NUMBER);

    function downloadPictures(
        reset: boolean,
        url: string,
    ) {
        if (reset) {
            setPage(FIRST_PAGE_NUMBER);
        }
        console.log(url);

        axios.get(url)
            .then(res => {
                const newPictureList = query ? res.data.results : res.data;
                if (page > FIRST_PAGE_NUMBER) {
                    setPictureList([...pictureList, ...newPictureList]);
                } else {
                    setPictureList([...newPictureList]);
                }
                setErrors([]);
            })
            .catch(err => {
                console.log(`errors=${err}`);
                setErrors(err.response.data.errors);
            });
    }

    function searchPictures(reset: boolean) {
        const url = `${BASE_URL}/search/photos?client_id=${PUBLIC_KEY}&query=${query}&page=${page}`;
        downloadPictures(reset, url);
    }

    function getRandomPictures(reset: boolean) {
        const url = `${BASE_URL}/photos?client_id=${PUBLIC_KEY}&page=${page}`;
        downloadPictures(reset, url);
    }

    useEffect(() => {
        if (query === null) return;
        if (query === "") {
            getRandomPictures(true);
        } else {
            searchPictures(true);
        }
    }, [query])

    useEffect(() => {
        if (!!query) {
            searchPictures(false);
        } else {
            getRandomPictures(false);
        }

    }, [page])



    return [pictureList, setPictureList, errors, page, setPage] as const;
}
