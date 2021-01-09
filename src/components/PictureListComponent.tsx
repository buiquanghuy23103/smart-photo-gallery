import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Picture } from "../types/PictureResponseTypes";
import LoadingComponent from "./LoadingComponent";
import PictureComponent from "./PictureComponent";

type PictureListProps = {
    pictureList: Array<Picture>,
    removePicture: (pictureId: string) => void,
    loadMore: () => void
};

export function PictureListComponent(props: PictureListProps) {

    const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

    function showPreview(picture: Picture) {
        setSelectedPicture(picture);
    }

    function hidePreview() {
        setSelectedPicture(null);
    }

    return (
        <AnimateSharedLayout>
            {/* TODO: Fix freezing infinite scrolling when there are 5 pictures in a roll */ }
            <InfiniteScroll
                dataLength={ props.pictureList.length }
                next={ props.loadMore }
                hasMore={ true }
                loader={ <LoadingComponent /> }
                className="flex flex-wrap"
            >
                {
                    props.pictureList.map(picture => {
                        return (
                            <motion.div
                                className="w-1/4 p-1 border my-4 flex justify-center"
                                key={ picture.id }
                                layoutId={ picture.id }
                            >
                                <PictureComponent
                                    picture={ picture }
                                    removePicture={ () => props.removePicture(picture.id) }
                                    showPreview={ showPreview }
                                />
                            </motion.div>
                        )
                    })
                }
            </InfiniteScroll>

            <AnimatePresence>
                { selectedPicture &&
                    (
                        <motion.section
                            className="fixed h-full w-full flex justify-center items-center top-0 left-0 z-40"
                            onClick={ hidePreview }
                            layoutId={ selectedPicture.id }
                            exit={ { opacity: 0 } }
                        >
                            <div className="w-1/3 bg-white">
                                <img
                                    src={ selectedPicture.urls.regular }
                                    alt={ selectedPicture.description }
                                    className="rounded-lg"
                                    width="100%"
                                    height="auto"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        </motion.section>
                    )
                }
            </AnimatePresence>
        </AnimateSharedLayout>
    )
}