import axios from 'axios';
import { useEffect, useState } from 'react';
import { Picture } from '../../types/PictureResponseTypes';

const BASE_URL = process.env.REACT_APP_UNSPLASH_URL;
const PUBLIC_KEY = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY;

export default function useFetchPicture(pageNumber: number, query: string | null) {
    const [pictureList, setPictureList] = useState([] as Picture[]);
    const [errors, setErrors] = useState([] as string[]);

    useEffect(() => {
        if (!!query) {
            const url = `${BASE_URL}/search/photos?client_id=${PUBLIC_KEY}&query=${query}`;
            console.log(url);

            axios.get(url)
                .then(res => {
                    setPictureList([...res.data.results]);
                    setErrors([]);
                })
                .catch(err => {
                    console.log(`errors=${err}`);
                    setErrors(err.response.data.errors);
                });

        }
    }, [query])

    useEffect(() => {
        if (!!query) return;
        const url = `${BASE_URL}/photos?client_id=${PUBLIC_KEY}&page=${pageNumber}`;
        console.log(url);

        axios.get(url)
            .then(res => {
                setPictureList([...pictureList, ...res.data]);
                setErrors([]);
            })
            .catch(err => {
                console.log(`errors=${err}`);
                setErrors(err.response.data.errors);
            });


    }, [pageNumber])



    return [pictureList, setPictureList, errors] as const;
}
