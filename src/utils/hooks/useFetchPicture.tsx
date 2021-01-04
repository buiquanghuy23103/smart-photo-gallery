import axios from 'axios';
import { useEffect, useState } from 'react';
import { Picture } from '../../types/PictureResponseTypes';

const BASE_URL = process.env.REACT_APP_UNSPLASH_URL;
const PUBLIC_KEY = process.env.REACT_APP_UNSPLASH_PUBLIC_KEY;

export default function useFetchPicture() {
    const [pictureList, setPictureList] = useState([] as Picture[]);

    useEffect(() => {
        axios.get<Picture[]>(`${BASE_URL}?client_id=${PUBLIC_KEY}`)
            .then(res => {
                console.log(res.data);
                setPictureList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])



    return [pictureList, setPictureList] as const;
}
