//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "CommentUpdateForm",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const CommentUpdateForm = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        createItem: UU5.PropTypes.func,
        setSelectedCommentData: UU5.PropTypes.func,
        selectedCommentData: UU5.PropTypes.object
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            handlerMap: {
                load: Calls.listVideo,
            },
            initialDtoIn: { data: {} }
        });

        let videoList = [];
        dataListResult.data && dataListResult.data.forEach(video => {
            videoList.push(
                <UU5.Forms.Select.Option
                    key={video.data.id+""}
                    value={video.data.id+""}
                    content={video.data.title}
                />
            )

        })

        const userListResult = useDataList({
            handlerMap: {
                load: Calls.listUser,
            },
            initialDtoIn: { data: {} }
        });

        let userList = [];
        userListResult.data && userListResult.data.forEach(user => {
            userList.push(
                <UU5.Forms.Select.Option
                    key={user.data.id+""}
                    value={user.data.id+""}
                    content={user.data.username}
                />
            )

        })


        function onSave(opt) {
            if (props.selectedCommentData && props.selectedCommentData.data && props.selectedCommentData.data.id) {
                props.selectedCommentData.handlerMap.update({ data: opt.values })
            } else {
                props.createItem({ data: opt.values })
            }
            props.setSelectedCommentData(null)
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        let selectedCommentData = props.selectedCommentData && props.selectedCommentData.data || {}

        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Forms.Form
                    onSave={onSave}
                    onCancel={() => props.setSelectedCommentData(null)}
                    header={selectedCommentData && selectedCommentData.id
                        ? <UU5.Bricks.Lsi lsi={{ en: "Update Comment", cs: "Upravit komentář" }} />
                        : <UU5.Bricks.Lsi lsi={{ en: "Add a Comment", cs: "Přidat komentář" }} />
                    }
                    spacing={4}
                    level={5}
                    labelColWidth={"xs-12 s-12 m4 l4 xl4"}
                    inputColWidth={"xs-12 s-12 m6 l6 xl6"}
                >
                    {idField(selectedCommentData)}

                    <UU5.Forms.TextArea
                        name="text"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Text", cs: "Text" }} />}
                        placeholder="Some text..."
                        rows="5"
                        value={selectedCommentData && selectedCommentData.text}
                    />
                    <UU5.Forms.Select
                        name="video"
                        label={<UU5.Bricks.Lsi lsi={{en: "Video", cs: "Videoklip"}}/>}
                        value={selectedCommentData && selectedCommentData.video}
                    >
                        {videoList}
                    </UU5.Forms.Select>
                    <UU5.Forms.Select
                        name="user"
                        label={<UU5.Bricks.Lsi lsi={{en: "User", cs: "Uživatel"}}/>}
                        value={selectedCommentData && selectedCommentData.video}
                    >
                        {userList}
                    </UU5.Forms.Select>
                    <UU5.Bricks.Line size={"s"} />
                    <UU5.Forms.Controls />
                </UU5.Forms.Form>
            </div>
        );
        //@@viewOff:render
    },
});

function idField(data) {
    if (data && data.id) {
        return(<UU5.Forms.Text
            name="id"
            label="id"
            placeholder="id"
            required
            value={data && data.id}
            readOnly={true}
        />)
    }else{
        return(<div/>)
    }

}

export default CommentUpdateForm;
