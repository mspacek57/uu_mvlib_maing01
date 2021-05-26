//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent, useDataList} from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UserUpdateForm",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const UserUpdateForm = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        createItem: UU5.PropTypes.func,
        setSelectedUserData: UU5.PropTypes.func,
        selectedUserData: UU5.PropTypes.object
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            initialDtoIn: {data: {}}
        });

        

        function onSave(opt) {
            if (props.selectedUserData && props.selectedUserData.data && props.selectedUserData.data.id) {
                props.selectedUserData.handlerMap.update({data: opt.values})
            } else {
                props.createItem({data: opt.values})
            }
            props.setSelectedUserData(null)
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        let selectedUserData = props.selectedUserData && props.selectedUserData.data || {}

        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Forms.Form
                    onSave={onSave}
                    onCancel={() => props.setSelectedUserData(null)}
                    header={selectedUserData && selectedUserData.id
                        ? <UU5.Bricks.Lsi lsi={{en: "Update User", cs: "Upravit uživatele"}}/>
                        : <UU5.Bricks.Lsi lsi={{en: "Create User", cs: "Vytvořit uživatele"}}/>
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
                        value={selectedUserData && selectedUserData.id}
                        readOnly={selectedUserData && selectedUserData.id}
                    />
                    <UU5.Forms.Text
                        name="username"
                        label={<UU5.Bricks.Lsi lsi={{en: "Username", cs: "Uživatelské jméno"}}/>}
                        placeholder="Some text..."
                        required
                        value={selectedUserData && selectedUserData.username}
                    />
                    <UU5.Forms.Text
                        name="password"
                        label={<UU5.Bricks.Lsi lsi={{en: "Password", cs: "Heslo"}}/>}
                        placeholder="Some text..."
                        required
                        value={selectedUserData && selectedUserData.password}
                        password={true}
                    />
                    <UU5.Bricks.Line size={"s"}/>
                    <UU5.Forms.Controls/>
                </UU5.Forms.Form>
            </div>
        );
        //@@viewOff:render
    },
});

export default UserUpdateForm;
