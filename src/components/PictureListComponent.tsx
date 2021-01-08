import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Picture } from "../types/PictureResponseTypes";
import LoadingComponent from "./LoadingComponent";
import PictureComponent from "./PictureComponent";

type PictureListProps = {
    pictureList: Array<Picture>,
    onItemClick: (pictureId: string) => void,
    loadMore: () => void
};

export function PictureListComponent(props: PictureListProps) {
    const pictureComponentList = props.pictureList.map(picture => {
        return (
            <PictureComponent
                key={ picture.id }
                picture={ picture }
                onClick={ () => props.onItemClick(picture.id) } />
        )
    });


    return (
        <InfiniteScroll
            dataLength={ props.pictureList.length }
            next={ props.loadMore }
            hasMore={ true }
            loader={ <LoadingComponent /> }
            className="flex flex-wrap"
            children={ pictureComponentList }
        />
    )
}