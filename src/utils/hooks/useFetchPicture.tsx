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

    function resetPageNumber() {
        setPage(FIRST_PAGE_NUMBER);
    }

    function downloadPictures() {
        const api = !!query ? `/search/photos?query=${query}&` : "/photos?"
        const url = `${BASE_URL}${api}client_id=${PUBLIC_KEY}&query=${query}&page=${page}`;

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

    useEffect(() => {
        if (query === null) return;
        resetPageNumber();
        downloadPictures();
    }, [query])

    useEffect(() => {
        downloadPictures();
    }, [page])



    return [pictureList, setPictureList, errors, page, setPage] as const;
}
