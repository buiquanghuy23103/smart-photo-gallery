import React, { useEffect, useRef, useState } from 'react';
import "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';

type Prediction = {
    className: string,
    probability: number
}

export default function TensorFlowPageComponent() {
    const imageUrl = "https://images.unsplash.com/photo-1610140755445-94cafe81ff9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTQzNjV8MHwxfGFsbHw3fHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080"
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    function predict() {
        setIsLoading(true);
        const img = imgRef.current;
        if (imgRef && img) {
            mobilenet.load().then((model) => {
                model.classify(img)
                    .then((downloadedPredictions: Prediction[]) => {
                        setIsLoading(false);
                        setPredictions(downloadedPredictions);
                    });
            });
        }
    }

    const predictionResults = predictions.length > 0 ? predictions.map(prediction => (
        <div
            key={ prediction.className }
        >
            <p>{ prediction.className }</p>
            <p>{ prediction.probability }</p>
        </div>
    )) : null;

    return (
        <div className="flex justify-center">
            <div >
                <h1 className="text-center">Tensor Flow example</h1>
                <img
                    width="400"
                    src={ imageUrl }
                    ref={ imgRef } alt="dogs"
                    crossOrigin="anonymous"
                />
                { predictionResults }
                <div className="text-center">
                    <button
                        className="p-2 rounded bg-gray-500 text-white my-5 w-64"
                        onClick={ predict }
                    >
                        { isLoading ? "⏰" : "Predict result" }
                    </button>
                </div>
            </div>
        </div>
    )
}
