import { Picture } from "../App";

type PictureProps = {
    picture: Picture,
    onClick: () => void
};

export default function PictureComp(props: PictureProps) {
    return (
        <div className="w-1/3">
            <img
                src={ props.picture.url }
                alt={ props.picture.description }
                width={ props.picture.width }
                onClick={ () => props.onClick() }
            />
        </div>
    )
}