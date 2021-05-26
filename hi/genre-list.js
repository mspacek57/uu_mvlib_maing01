//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent, useDataList, useState} from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import GenreUpdateForm from "genreUpdateForm";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "GenreList",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const GenreList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listGenre,
                createItem: Calls.createGenre
            },
            itemHandlerMap: {
                update: Calls.updateGenre,
                delete: Calls.deleteGenre
            },
            initialDtoIn: {data: {}}
        });

        const [selectedGenreData, setSelectedGenreData] = useState(null)

        const columns = [
                        {
                cell: cellProps => {
                    return cellProps.data.data.id
                },
                header: "id",
                width: "200px"
            },
            {
                cell: cellProps => cellProps.data.data.name,
                header: <UU5.Bricks.Lsi lsi={{en: "Name", cs: "Název"}}/>
            },
                        {
                cell: cellProps => {
                    return (
                        <div className={"right"}>
                            <UU5.Bricks.Button
                                content={<UU5.Bricks.Icon icon={"mdi-pencil"}/>}
                                colorSchema={"blue"}
                                bgStyle={"transparent"}
                                onClick={() => setSelectedGenreData(cellProps.data)}
                            />
                            <UU5.Bricks.Button
                                content={<UU5.Bricks.Icon icon={"mdi-delete"}/>}
                                colorSchema={"red"}
                                bgStyle={"transparent"}
                                onClick={() => cellProps.data.handlerMap.delete({data: {id: cellProps.data.data.id}})}
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
                    child = <UU5.Bricks.Loading/>
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
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Bricks.Modal offsetTop={100} shown={selectedGenreData}>
                    <GenreUpdateForm
                        createItem={dataListResult.handlerMap.createItem}
                        setSelectedGenreData={setSelectedGenreData}
                        selectedGenreData={selectedGenreData}
                    />
                </UU5.Bricks.Modal>
                <UU5.Bricks.Header content={<UU5.Bricks.Lsi lsi={{en: "Genre List", cs: "Seznam žánrů"}}/>} level={3}/>
                <div className={"right"}>
                    <UU5.Bricks.Button
                        content={<UU5.Bricks.Lsi lsi={{en: "Create a Genre", cs: "Vytvořit žánr"}}/>}
                        colorSchema={"green"}
                        onClick={() => setSelectedGenreData({data: {}})}
                    />
                </div>
                {getChild()}
            </div>
        );
        //@@viewOff:render
    },
});

export default GenreList;
