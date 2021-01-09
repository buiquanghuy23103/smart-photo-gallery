import React, { useState } from 'react';
import { Prediction } from '../../types/TensorFlow';
import "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function useTfClassify() {
    const [isLoading, setIsLoading] = useState(false);
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    function predict(img: HTMLImageElement | null) {
        setIsLoading(true);
        console.log(img);

        if (img) {
            mobilenet.load().then((model) => {
                model.classify(img)
                    .then((downloadedPredictions: Prediction[]) => {
                        setIsLoading(false);
                        setPredictions(downloadedPredictions);
                    })
                    .catch(err => {
                        console.log(err);

                    });
            });
        }
    }

    return [predict, isLoading, predictions, setPredictions] as const;
}
