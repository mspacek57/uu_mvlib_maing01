//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "VideoUpdateForm",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const VideoUpdateForm = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        createItem: UU5.PropTypes.func,
        setSelectedVideoData: UU5.PropTypes.func,
        selectedVideoData: UU5.PropTypes.object
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listGenre,
            },
            initialDtoIn: { data: {} }
        });

        let genreList = [];
        dataListResult.data && dataListResult.data.forEach(genre => {
            genreList.push(
                <UU5.Forms.Select.Option
                    key={genre.data.id}
                    value={genre.data.id}
                    content={genre.data.name}
                />
            )

        })


        function onSave(opt) {
            if (props.selectedVideoData && props.selectedVideoData.data && props.selectedVideoData.data.id) {
                props.selectedVideoData.handlerMap.update({ data: opt.values })
            } else {
                props.createItem({ data: opt.values })
            }
            props.setSelectedVideoData(null)
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        let selectedVideoData = props.selectedVideoData && props.selectedVideoData.data || {}

        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Forms.Form
                    onSave={onSave}
                    onCancel={() => props.setSelectedVideoData(null)}
                    header={selectedVideoData && selectedVideoData.id
                        ? <UU5.Bricks.Lsi lsi={{ en: "Update Video", cs: "Upravit videoklip" }} />
                        : <UU5.Bricks.Lsi lsi={{ en: "Add Video", cs: "Přidat videoklip" }} />
                    }
                    spacing={4}
                    level={5}
                    labelColWidth={"xs-12 s-12 m4 l4 xl4"}
                    inputColWidth={"xs-12 s-12 m6 l6 xl6"}
                >
                    <UU5.Forms.Text
                        name="id"
                        label="id"
                        placeholder="id"
                        required
                        value={selectedVideoData && selectedVideoData.id}
                        readOnly={selectedVideoData && selectedVideoData.id}
                    />
                    <UU5.Forms.Text
                        name="title"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Title", cs: "Skladba" }} />}
                        placeholder="Some text..."
                        required
                        value={selectedVideoData && selectedVideoData.title}
                    />
                    <UU5.Forms.Text
                        name="artist"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Artist", cs: "Interpret" }} />}
                        placeholder="Some text..."
                        required
                        value={selectedVideoData && selectedVideoData.artist}
                    />
                    <UU5.Forms.Text
                        name="album"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Album", cs: "Album" }} />}
                        placeholder="Some text..."
                        value={selectedVideoData && selectedVideoData.album}
                    />
                    <UU5.Forms.Text
                        name="year"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Year", cs: "Rok" }} />}
                        placeholder="Some text..."
                        value={selectedVideoData && selectedVideoData.year}
                    />
                    <UU5.Forms.TextArea
                        name="description"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Description", cs: "Popis" }} />}
                        placeholder="Some text..."
                        rows="3"
                        value={selectedVideoData && selectedVideoData.description}
                    />
                    <UU5.Forms.Select
                        name="genre"
                        label={<UU5.Bricks.Lsi lsi={{en: "Genre", cs: "Žánr"}}/>}
                        value={selectedVideoData && selectedVideoData.genre}
                    >
                        {genreList}
                    </UU5.Forms.Select>
                    <UU5.Forms.Text
                        name="link"
                        label={<UU5.Bricks.Lsi lsi={{ en: "YouTube link", cs: "YouTube odkaz" }} />}
                        placeholder="Some text..."
                        required
                        value={selectedVideoData && selectedVideoData.link}
                    />
                    <UU5.Forms.Checkbox
                        name="isRestricted"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Registered only", cs: "Pouze pro registrované" }} />}
                        placeholder="Some text..."
                        value={selectedVideoData && selectedVideoData.isRestricted}
                    />
                    <UU5.Bricks.Line size={"s"} />
                    <UU5.Forms.Controls />
                </UU5.Forms.Form>
            </div>
        );
        //@@viewOff:render
    },
});

export default VideoUpdateForm;
