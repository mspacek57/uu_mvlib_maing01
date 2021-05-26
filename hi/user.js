//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent, useDataObject} from "uu5g04-hooks";
import UserUpdateForm from "userUpdateForm";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "User",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;

    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}

    .uu5-bricks-header {
      margin-top: 8px;
    }

    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const User = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        //@@viewOn:private
        let userDataObject = useDataObject({
            handlerMap: {
                load: Calls.getUser
            },
            initialDtoIn: {
                data: {
                    id: urlParams.get("id")
                }
            }
        })
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <div {...attrs}>
                <UserUpdateForm />
                <pre>{JSON.stringify(userDataObject.data || {}, null, 2)}</pre>
            </div>
        );
        //@@viewOff:render
    },
});

export default User;
