import { useState } from "react";
import { Picture } from "../types/PictureResponseTypes";

type PictureProps = {
    picture: Picture,
    removePicture: () => void,
};

export default function PictureComponent(props: PictureProps) {

    const [isHovering, setIsHovering] = useState(false);

    function handleMouseEnter() {
        setIsHovering(true);
    }

    function handleMouseLeave() {
        setIsHovering(false);
    }

    function showHideIcon() {
        const defaultAttr = "fas fa-times absolute right-0 cursor-pointer opacity-50 hover:opacity-100 ";
        const hiddenAttr = isHovering ? "" : "hidden";
        return defaultAttr + hiddenAttr;
    }

    return (
        <div className="relative"
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
        >
            <i className={ showHideIcon() }
                onClick={ () => props.removePicture() } />
            <img
                src={ props.picture.urls.regular }
                alt={ props.picture.description }
                width={ props.picture.width }
                height="auto"

            />
        </div>
    )
}