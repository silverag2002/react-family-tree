import React, { Component } from "react";
import FamilyTree from "@balkangraph/familytree.js";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      selectedCountry: "", // Initialize the state to store the selected value
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    this.setState({ selectedCountry });
  };

  componentDidMount() {
    FamilyTree.templates.tommy.field_0 =
      '<text data-width="230" data-text-overflow="multiline-4-ellipsis" style="font-size: 20px;" fill="#fff" x="10" y="28" text-anchor="start">{val}</text>';
    FamilyTree.elements.myTextArea = function (
      data,
      editElement,
      minWidth,
      readOnly
    ) {
      var id = FamilyTree.elements.generateId();
      var value = data[editElement.binding];
      if (value == undefined) value = "";
      if (readOnly && !value) {
        return {
          html: "",
        };
      }
      var rOnlyAttr = readOnly ? "readonly" : "";
      var rDisabledAttr = readOnly ? "disabled" : "";
      return {
        html: `<label for="${id}">${editElement.label}</label>
                          <textarea ${rDisabledAttr} ${rOnlyAttr} id="${id}" name="${id}" style="width: 100%;height: 100px;" data-binding="${editElement.binding}">${value}</textarea>`,
        id: id,
        value: value,
      };
    };

    this.family = new FamilyTree(this.divRef.current, {
      nodes: this.props.nodes,
      mode: "dark",

      editForm: {
        addMore: null,
        generateElementsFromFields: false,
        elements: [
          { type: "myTextArea", label: "Description:", binding: "desc" },
        ],
      },

      nodeBinding: {
        field_0: "name",
        img_0: "img",
      },
    });
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>;
  }
}
