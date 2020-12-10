import Picture from "./PictureComponent";

type PictureContainerProps = {
    shouldShowPicture: boolean
};

const PictureContainer: React.FunctionComponent<PictureContainerProps> = (props: PictureContainerProps) => {
    if (!props.shouldShowPicture) return null;

    return (<Picture/>);
}

export default PictureContainer;