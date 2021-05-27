//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "GenreUpdateForm",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css``,
};

export const GenreUpdateForm = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        createItem: UU5.PropTypes.func,
        setSelectedGenreData: UU5.PropTypes.func,
        selectedGenreData: UU5.PropTypes.object
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const dataListResult = useDataList({
            initialDtoIn: { data: {} }
        });



        function onSave(opt) {
            if (props.selectedGenreData && props.selectedGenreData.data && props.selectedGenreData.data.id) {
                props.selectedGenreData.handlerMap.update({ data: opt.values })
            } else {
                props.createItem({ data: opt.values })
            }
            props.setSelectedGenreData(null)
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        let selectedGenreData = props.selectedGenreData && props.selectedGenreData.data || {}

        return (
            <div {...attrs} className={"uu5-common-padding-s"}>
                <UU5.Forms.Form
                    onSave={onSave}
                    onCancel={() => props.setSelectedGenreData(null)}
                    header={selectedGenreData && selectedGenreData.id
                        ? <UU5.Bricks.Lsi lsi={{ en: "Update Genre", cs: "Upravit žánr" }} />
                        : <UU5.Bricks.Lsi lsi={{ en: "Create Genre", cs: "Vytvořit žánr" }} />
                    }
                    spacing={4}
                    level={5}
                    labelColWidth={"xs-12 s-12 m4 l4 xl4"}
                    inputColWidth={"xs-12 s-12 m6 l6 xl6"}
                >

                    {idField(selectedGenreData)}

                    <UU5.Forms.Text
                        name="name"
                        label={<UU5.Bricks.Lsi lsi={{ en: "Name", cs: "Název" }} />}
                        placeholder="Some text..."
                        required
                        value={selectedGenreData && selectedGenreData.name}
                    />
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

export default GenreUpdateForm;
