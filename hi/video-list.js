//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList, useState } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import VideoUpdateForm from "videoUpdateForm";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "VideoList",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const VideoList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listVideo,
                createItem: Calls.createVideo
            },
            itemHandlerMap: {
                update: Calls.updateVideo,
                delete: Calls.deleteVideo
            },
            initialDtoIn: { data: {} }
        });
        const genreListResult = useDataList({
            handlerMap: {
                load: Calls.listGenre,
            },
            initialDtoIn: { data: {} }
        });

        let genreList = [];
        genreListResult.data && genreListResult.data.forEach(genre => {
            genreList.push(genre.data)
        })



        const [selectedVideoData, setSelectedVideoData] = useState(null)

        const columns = [
            {
                cell: cellProps => {
                    return cellProps.data.data.id
                },
                header: "id",
                width: "200px"
            },
            {
                cell: cellProps => cellProps.data.data.title,
                header: <UU5.Bricks.Lsi lsi={{ en: "Title", cs: "Skladba" }} />
            },
            {
                cell: cellProps => cellProps.data.data.artist,
                header: <UU5.Bricks.Lsi lsi={{ en: "Artist", cs: "Interpret" }} />
            },
            {
                cell: cellProps => cellProps.data.data.album,
                header: <UU5.Bricks.Lsi lsi={{ en: "Album", cs: "Album" }} />
            },
            {
                cell: cellProps => {
                    let genre = genreList.find(item => item.id == cellProps.data.data.genre);
                    if (genre) { return genre.name } else return ""
                },
                header: <UU5.Bricks.Lsi lsi={{ en: "Genre", cs: "Žánr" }} />
            },
            {
                cell: cellProps => {
                    return (
                        <div className={"left"}>
                            <UU5.Bricks.Button
                                colorSchema="green"
                                content={<UU5.Bricks.Icon icon={"mdi-magnify"}  />}
                                onClick={() => showVideo(cellProps.data.data.id)}
                                bgStyle={"transparent"}
                            />
                            <UU5.Bricks.Button
                                content={<UU5.Bricks.Icon icon={"mdi-book-open"} />}
                                colorSchema={"blue"}
                                bgStyle={"transparent"}
                                onClick={() => setSelectedVideoData(cellProps.data)}
                            />
                            <UU5.Bricks.Button
                                content={<UU5.Bricks.Icon icon={"mdi-delete"} />}
                                colorSchema={"red"}
                                bgStyle={"transparent"}
                                onClick={() => cellProps.data.handlerMap.delete({ data: { id: cellProps.data.data.id } })}
                            />
                        </div>
                    )
                },
                width: 150
            },
        ];

        function getChild() {
            let child;
            switch (dataListResult.state) {
                case "pendingNoData":
                case "pending":
                    child = <UU5.Bricks.Loading />
                    break;
                case "readyNoData":
                case "ready":
                    child = (
                        <Uu5Tiles.List
                            height="auto"
                            data={dataListResult.data}
                            columns={columns}
                            rowHeight={"76px"}
                            rowAlignment={"center"}
                        />
                    );
                    break;
                case "errorNoData":
                case "error":
                    child = "error";
                    break;
            }
            return child;
        }

        function showVideo(id) {
            UU5.Environment.getRouter().setRoute("videoDetail", { id: id })
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Bricks.Modal offsetTop={100} shown={selectedVideoData}>
                    <VideoUpdateForm
                        createItem={dataListResult.handlerMap.createItem}
                        setSelectedVideoData={setSelectedVideoData}
                        selectedVideoData={selectedVideoData}
                    />
                </UU5.Bricks.Modal>
                <UU5.Bricks.Header 
                content={<UU5.Bricks.Lsi lsi={{en: "Video List", cs: "Seznam videoklipů"}}/>} 
                level={1}
                
                />
                <div className={"left"}>
                    <UU5.Bricks.Button
                        content={<UU5.Bricks.Lsi lsi={{ en: "Add a Video", cs: "Přidat videoklip" }} />}
                        colorSchema={"green"}
                        onClick={() => setSelectedVideoData({ data: {} })}
                    />
                </div>
                {getChild()}
            </div>
        );
        //@@viewOff:render
    },
});

export default VideoList;
