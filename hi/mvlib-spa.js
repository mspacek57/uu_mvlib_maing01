//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent} from "uu5g04-hooks";

import Genre from "genre";
import GenreList from "genreList";
import User from "user";
import UserList from "userList";
import Video from "video";
import VideoList from "videoList";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "MVLibSpa",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css`
    padding: 36px 15px 36px;
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

export const MVLibrarySpa = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        function goToVideoList() {
            UU5.Environment.getRouter().setRoute("videoList")
        }

        function goToArtistList() {
            UU5.Environment.getRouter().setRoute("artistList")
        }
        function goToGenreList() {
            UU5.Environment.getRouter().setRoute("genreList")
        }
        function goToUserList() {
            UU5.Environment.getRouter().setRoute("userList")
        }
        function goToVideoList() {
            UU5.Environment.getRouter().setRoute("videoList")
        }


        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <UU5.Bricks.Page
                {...attrs}
                type="1"
                leftWrapperProps={{style: {backgroundColor: '#e3a8a8'}}}
                top={
                    <UU5.Bricks.Box colorSchema="brown-rich" className="center">
                        <UU5.Bricks.Lsi lsi={{en: "MV Library - The best videoclips from whole world", cs: "MV Library - nejlepší videoklipy z celého světa"}}/>
                    </UU5.Bricks.Box>
                }
                bottom={<UU5.Bricks.Box colorSchema="brown" className="center">Created by TEAM 13</UU5.Bricks.Box>}
                left={
                    <UU5.Bricks.Div>
                        <UU5.Bricks.Box colorSchema='yellow-rich' content='MENU'/>
                        <UU5.Bricks.Button colorSchema="yellow" bgStyle="outline">Přihlásit se/Sign</UU5.Bricks.Button>
                        <UU5.Bricks.Icon icon="mdi-magnify"/>
                        <UU5.Bricks.LanguageSelector displayedLanguages={["cs", "en"]}/>
                        <div className="uu5-common-padding-s">
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToVideoList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-library-books"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Videos", cs: "Videoklipy"}}/>
                                </UU5.Bricks.Button>

                            </div>
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToGenreList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-library-books"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Genres", cs: "Žánry"}}/>
                                </UU5.Bricks.Button>

                            </div>
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToUserList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-library-books"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Users", cs: "Uživatelé"}}/>
                                </UU5.Bricks.Button>

                            </div>
                        </div>
                    </UU5.Bricks.Div>
                }
                leftWidth="xs-25 s-20 m-15 l-15 xl-15"
                leftFixed={true}
                topFixed={"smart"}
                leftSwipe={true}
            >
                <UU5.Common.Router
                    basePath={""}
                    routes={{
                        "": {component: <VideoList/>},
                        "genreList": {component: <GenreList/>},
                        "genre": {component: <Genre/>},
                        "userList": {component: <UserList/>},
                        "user": {component: <User/>},
                        "videoList": {component: <VideoList/>},
                        "video": {component: <Video/>},
                    }}/>
            </UU5.Bricks.Page>
        );
        //@@viewOff:render
    },
})
;

export default MVLibrarySpa;
