import { useRef, useState } from "react";
import { Picture } from "../types/PictureResponseTypes";
import useTfClassify from "../utils/hooks/useTfClassify";

type PictureProps = {
    picture: Picture,
    removePicture: () => void,
    showPreview: (picture: Picture) => void
};

export default function PictureComponent(props: PictureProps) {

    const [isHovering, setIsHovering] = useState(false);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isLoading, predictions, predict] = useTfClassify();

    function handleMouseEnter() {
        setIsHovering(true);
    }

    function handleMouseLeave() {
        setIsHovering(false);
    }

    function showRemovePictureIcon() {
        const defaultAttr = "fas fa-times absolute right-0 cursor-pointer opacity-50 hover:opacity-100 ";
        const hiddenAttr = isHovering ? "" : "hidden";
        return defaultAttr + hiddenAttr;
    }

    function showPredictionIcon() {
        const defaultAttr = "fas fa-search absolute left-0 cursor-pointer opacity-50 hover:opacity-100 ";
        const hiddenAttr = isHovering ? "" : "hidden";
        return defaultAttr + hiddenAttr;
    }


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
        <div className="relative"
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
        >
            {(predictions.length > 0 || isLoading) &&

                <span
                    className="ml-5 absolute bg-gray-800 text-white rounded-lg shadow px-2">
                    { isLoading && (<p>Loading...</p>) }
                    { predictionResults }
                </span>
            }
            <i className={ showRemovePictureIcon() }
                onClick={ () => props.removePicture() } />
            <i className={ showPredictionIcon() }
                onClick={ () => predict(imgRef.current) } />
            <img
                crossOrigin="anonymous"
                ref={ imgRef }
                src={ props.picture.urls.regular }
                alt={ props.picture.description }
                width={ props.picture.width }
                height="auto"
                onClick={ () => props.showPreview(props.picture) }
            />
        </div>
    )
}