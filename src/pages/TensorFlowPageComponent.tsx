import React, { useRef } from 'react';
import useTfClassify from '../utils/hooks/useTfClassify';


export default function TensorFlowPageComponent() {
    const imageUrl = "https://images.unsplash.com/photo-1610140755445-94cafe81ff9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTQzNjV8MHwxfGFsbHw3fHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080"
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [predict, isLoading, predictions, setPredictions] = useTfClassify();

    const predictionResults = predictions.length > 0 && predictions.map(prediction => (
        <div
            key={ prediction.className }
            className="justify-between flex"
        >
            <p>{ prediction.className }</p>
            <p>{ Math.floor(prediction.probability * 100) }%</p>
        </div>
    ));

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
                        onClick={ () => predict(imgRef.current) }
                    >
                        { isLoading ? "⏰" : "Predict result" }
                    </button>
                </div>
            </div>
        </div>
    )
}
