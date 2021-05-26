//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import CommentList from "commentList";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "VideoDetail",
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

export const VideoDetail = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        //@@viewOn:private
        let videoDataObject = useDataObject({
            handlerMap: {
                load: Calls.getVideo
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
        const videoInfo = videoDataObject.data
        if (videoInfo != undefined) {
            return (
                <div {...attrs}>
                    <UU5.Bricks.YoutubeVideo src={videoInfo.link} />
                    <UU5.Bricks.Container header={videoInfo.artist + " - " + videoInfo.title}>
                        <UU5.Bricks.Row>
                            {"Album: " + videoInfo.album}
                        </UU5.Bricks.Row>
                        <UU5.Bricks.Row>
                            {"Year: " + videoInfo.year}
                        </UU5.Bricks.Row>
                        <UU5.Bricks.Row>
                            Description:
                    </UU5.Bricks.Row>
                        <UU5.Bricks.Row>
                            {videoInfo.description}
                        </UU5.Bricks.Row>

                    </UU5.Bricks.Container>
                    <CommentList /* video={videoInfo ? videoInfo.id : ""} *//>
                </div>
            );
        } else return (
            <div {...attrs}>
            </div>)
        //@@viewOff:render
    },
});

export default VideoDetail;
