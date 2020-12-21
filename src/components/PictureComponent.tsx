type PictureProps = {
    pictureLink: string,
    description: string,
    width: number
};

export default function Picture(props: PictureProps) {
    return (
        <div>
            <img
                src={ props.pictureLink }
                alt={ props.description }
                width={ props.width }
            />
        </div>
    )
}