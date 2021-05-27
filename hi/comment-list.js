//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList, useState } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import CommentUpdateForm from "commentUpdateForm";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "CommentList",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const CommentList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        video: UU5.PropTypes.string,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        video: "",
    },
    //@@viewOff:defaultProps

    render({ video }) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listComment,
                createItem: Calls.createComment
            },
            itemHandlerMap: {
                update: Calls.updateComment,
                delete: Calls.deleteComment
            },
            skipInitialLoad: true,
            initialDtoIn: { data: {} }
        });
        const videoListResult = useDataList({
            handlerMap: {
                load: Calls.listVideo,
            },
            initialDtoIn: { data: {} }
        });


        let videoList = [];
        videoListResult.data && videoListResult.data.forEach(video => {
            videoList.push(video.data)
        });



        const [selectedCommentData, setSelectedCommentData] = useState(null);

        const columns = [
            {
                cell: cellProps => {
                    let video = videoList.find(item => item.id == cellProps.data.data.video);

                    if(video.id == cellProps.data.data.video)
                    {                         
                        return cellProps.data.data.id+" <!>"  
                    }else
                    return cellProps.data.data.id
                },
                header: "id",
                width: "200px"
            },
            {
                cell: cellProps => cellProps.data.data.text,
                header: <UU5.Bricks.Lsi lsi={{ en: "Text", cs: "Text" }} />
            },
            {
                cell: cellProps => {
                    let video = videoList.find(item => item.id == cellProps.data.data.video);
                    if (video) { return video.title } else return ""
                },
                header: <UU5.Bricks.Lsi lsi={{ en: "Video", cs: "Videoklip" }} />
            },
            {
                cell: cellProps => {
                    return (
                        <div className={"left"}>
                            <UU5.Bricks.Button
                                content={<UU5.Bricks.Icon icon={"mdi-pencil"} />}
                                colorSchema={"blue"}
                                bgStyle={"transparent"}
                                onClick={() => setSelectedCommentData(cellProps.data)}
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


        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs({ video });
        if (dataListResult.data != undefined) {
            return (
                <div {...attrs} className={"uu5-common-padding-s"}>
                    <UU5.Bricks.Modal offsetTop={100} shown={selectedCommentData}>
                        <CommentUpdateForm
                            createItem={dataListResult.handlerMap.createItem}
                            setSelectedCommentData={setSelectedCommentData}
                            selectedCommentData={selectedCommentData}
                        />
                    </UU5.Bricks.Modal>
                    <UU5.Bricks.Header content={<UU5.Bricks.Lsi lsi={{ en: "Comments", cs: "Komentáře" }} />} level={3} />
                    <div className={"left"}>
                        <UU5.Bricks.Button
                            content={<UU5.Bricks.Lsi lsi={{ en: "Add a Comment", cs: "Přidat komentář" }} />}
                            colorSchema={"green"}
                            onClick={() => setSelectedCommentData({ data: {} })}
                        />
                        <UU5.Bricks.Button disabled={!dataListResult.handlerMap.load} onClick={() => dataListResult.handlerMap.load({ video })}>
                            <UU5.Bricks.Lsi lsi={{ en: "Reload Comments", cs: "Aktualizovat komentáře" }} />
                        </UU5.Bricks.Button>{" "}
                    </div>
                    {getChild()}
                </div>
            );
        } else {
            return (
                <div {...attrs} className={"uu5-common-padding-s"}>
                    <UU5.Bricks.Header content={<UU5.Bricks.Lsi lsi={{ en: "Comments", cs: "Komentáře" }} />} level={3} />
                    <div className={"left"}>
                    <UU5.Bricks.Button disabled={!dataListResult.handlerMap.load} onClick={() => dataListResult.handlerMap.load( {video} )}>
                        <UU5.Bricks.Lsi lsi={{ en: "Load Comments", cs: "Načíst komentáře" }} />
                    </UU5.Bricks.Button>{" "}
                    </div>                   
                </div>
            );
        }

        //@@viewOff:render
    },
});

export default CommentList;
