import PictureList from "./PictureListComponent";

type PictureContainerProps = {
    shouldShowPicture: boolean
};

export default function PictureContainer(props: PictureContainerProps) {
    if (!props.shouldShowPicture) return null;

    return (<PictureList/>);
}