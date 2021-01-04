import { Picture } from "../types/PictureResponseTypes";
import useScroll from "../utils/hooks/useScroll";
import PictureComponent from "./PictureComponent";

type PictureListProps = {
    pictureList: Array<Picture>,
    onItemClick: (pictureId: string) => void
};

export function PictureListComponent(props: PictureListProps) {
    const scrollPosition = useScroll();
    const pictureComponentList = props.pictureList.map(picture => {
        return (
            <PictureComponent
                key={ picture.id }
                picture={ picture }
                onClick={ () => props.onItemClick(picture.id) } />
        )
    });

    return (<div className="gap-0" style={ { columnCount: 5 } }>
        { console.log(`scrollPosition: ${scrollPosition}`) }
        { pictureComponentList }
    </div>)
}