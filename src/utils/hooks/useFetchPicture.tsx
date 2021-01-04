import axios from 'axios';
import { useEffect, useState } from 'react';
import { Picture } from '../../types/PictureResponseTypes';

const BASE_URL = process.env.REACT_APP_UNSPLASH_URL;
const PUBLIC_KEY = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY;

export default function useFetchPicture(pageNumber: number) {
    const [pictureList, setPictureList] = useState([] as Picture[]);

    useEffect(() => {
        axios.get<Picture[]>(`${BASE_URL}?client_id=${PUBLIC_KEY}&page=${pageNumber}`)
            .then(res => {
                setPictureList([...pictureList, ...res.data]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [pageNumber])



    return [pictureList, setPictureList] as const;
}
