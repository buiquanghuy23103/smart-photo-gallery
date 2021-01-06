import axios from 'axios';
import { useEffect, useState } from 'react';
import { Picture } from '../../types/PictureResponseTypes';

const BASE_URL = process.env.REACT_APP_UNSPLASH_URL;
const PUBLIC_KEY = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY;

export default function useFetchPicture(requestedPageNumber: number, query: string | null) {
    const [pictureList, setPictureList] = useState([] as Picture[]);
    const [errors, setErrors] = useState([] as string[]);

    function searchPictures(reset: boolean) {
        const pageNumber = reset ? 1 : requestedPageNumber;
        const url = `${BASE_URL}/search/photos?client_id=${PUBLIC_KEY}&query=${query}&page=${pageNumber}`;
        console.log(url);

        axios.get(url)
            .then(res => {
                if (reset) {
                    setPictureList([...res.data.results]);
                } else {
                    setPictureList([...pictureList, ...res.data.results]);
                }
                setErrors([]);
            })
            .catch(err => {
                console.log(`errors=${err}`);
                setErrors(err.response.data.errors);
            });

    }

    function getRandomPictures(reset: boolean) {
        const pageNumber = reset ? 1 : requestedPageNumber;
        const url = `${BASE_URL}/photos?client_id=${PUBLIC_KEY}&page=${pageNumber}`;
        console.log(url);

        axios.get(url)
            .then(res => {
                if (reset) {
                    setPictureList([...res.data]);
                } else {

                    setPictureList([...pictureList, ...res.data]);
                }
                setErrors([]);
            })
            .catch(err => {
                console.log(`errors=${err}`);
                setErrors(err.response.data.errors);
            });
    }

    useEffect(() => {
        if (!!query) {
            searchPictures(true);
        } else {
            getRandomPictures(true);
        }
    }, [query])

    useEffect(() => {
        if (!!query) {
            searchPictures(false);
        } else {
            getRandomPictures(false);
        }

    }, [requestedPageNumber])



    return [pictureList, setPictureList, errors] as const;
}
