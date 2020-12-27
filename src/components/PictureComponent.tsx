import { useState } from "react";
import { Picture } from "../App";

type PictureProps = {
    picture: Picture,
    onClick: () => void
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
        <div className="w-1/3 my-4 flex justify-center">
            <div className="relative"
                onMouseEnter={ handleMouseEnter }
                onMouseLeave={ handleMouseLeave }>
                <i className={ showHideIcon() }
                    onClick={ () => props.onClick() } />
                <img
                    src={ props.picture.url }
                    alt={ props.picture.description }
                    width={ props.picture.width }
                />
            </div>

        </div>
    )
}