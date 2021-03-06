import React, { useEffect, useState, useRef } from "react";
import ReactTooltip from "react-tooltip";
import { calculate, compare } from "specificity";
import styled from "styled-components";

const PrintContainer = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PrintDescriptionContainer = styled.div`
  width: 550px;
  margin-top: 10px;
  /* height: 100px; */
  display: flex;
`;

const PrintDescription = styled.div`
  font-size: 10px;
  flex: 1;
  flex-basis: 50%;
  text-align: center;
  h4 {
    font-size: 15px;
    font-weight: bold;
  }
`;

const CasecadingContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CASECADING_LIST_WRAP = styled.div`
  padding: 5px;
  margin-top: 8px;
  flex-basis: 33.33%;

  + div {
    border-left: 1px solid #ccc;
  }

  h4 {
    font-size: 12px;
    height: 24px;
    font-weight: bold;
  }
`;

const CASECADING_LIST = styled.ul`
  /* margin-top: 10px;
    margin-right: 5px; */
  margin: 5px 0;
  /* flex:1; */
  max-height: 150px;
  overflow: auto;
  flex-basis: 33%;
  text-align: center;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: #555;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }
`;

const UnusedList = styled.ul`
  margin-top: 10px;
  text-align: left;
  strong {
    font-size: 12px;
    color: red;
  }
  li {
    margin-bottom: 5px;
    text-align: center;
  }
  :only-of-type {
    li {
      padding: 2px 5px;
      background-color: transparent;
    }
  }
`;

const PrintTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  border-top: 1px solid #e4e4e4;
`;

const PrintTextHeader = styled.div`
  flex: 1;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #e4e4e4;
  :nth-child(1) {
    border-right: 1px solid #e4e4e4;
  }
  h4 {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    color: #0c3b45;
    padding: 10px 0;
  }
`;
const SelectItem = styled.li`
  padding: 4px 5px;
  margin: 5px;
  background-color: #ccc;
  box-sizing: border-box;
  color: #000;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace !important;
  display: flex;
  justify-content: center;
  gap: 5px;
  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const PrintTextForm = styled.pre`
  width: 100%;
  font-size: 12px;
  overflow-y: auto;
  height: 200px;
  line-height: 15px;
  padding: 10px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace !important;
  white-space: pre-wrap;
  word-break: break-all;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: #555;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }
`;

const ReturnBtnContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const RemoveBtn = styled.button`
  color: #333;
  border: 1px solid #999;
  background-color: #fff;
  width: 33px;
  font-size: 10px;
  height: 17px;
  white-space: nowrap;
  :hover {
    transition: 0.3s;
    border-color: transparent;
    background-color: red;
    color: white;
  }
`;

const ReturnBtn = styled.button`
  color: #333;
  border: 1px solid #999;
  background-color: #fff;
  border-radius: 30px;
  width: 100px;
  font-size: 13px;
  height: 30px;
  :hover {
    transition: 0.3s;
    border-color: transparent;
    background-color: #0c3b45;
    color: white;
  }
`;

const Tooltip = styled.span`
  display: inline-block;
  font-size: 10px;
  color: white;
  strong {
    display: inline-block;
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

const MinifyBtn = styled.button`
  color: #333;
  border: 1px solid #999;
  background-color: #fff;

  /* width: 20px; */
  font-size: 10px;
  height: 15px;
  box-sizing: border-box;
  white-space: nowrap;
  :hover {
    transition: 0.3s;
    border-color: transparent;
    background-color: #0c3b45;
    color: white;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StatusHead = styled.span`
  font-size: 12px;
  color: #0c3b45;
  font-weight: bold;
`;
const Status = styled.span`
  font-size: 10px;
  strong {
    font-weight: bold;
    color: green;
  }
`;

const CssHeader = styled.h4`
  line-height: 10px;
  span {
    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  }
`;

const PrintData = ({ HTMLText, CSSText }) => {
  const ResultRef = useRef(null);

  const [SelectorArray, SetSelectorArray] = useState([]);
  const [SelectorScore, SetSelectorScore] = useState([]);

  const [IDSelector, SetIDSelector] = useState([]);
  const [ClassSelector, SetClassSelector] = useState([]);
  const [DefaultSelector, SetDefaultSelector] = useState([]);
  const [UnusedSelector, SetUnusedSelector] = useState([]);

  const [HTML, SetHTML] = useState(HTMLText);
  const [CSS, SetCSS] = useState(CSSText);
  const [ResultCSS, SetResultCSS] = useState("??????");

  const [Source, SetSource] = useState(undefined);
  const [Minified, SetMinified] = useState(undefined);
  const [Efficiency, SetEfficiency] = useState(null);

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(ResultCSS);
    alert("?????????????????????.");
  };

  const handleRemoveSelector = (id) => {
    let arr = [...UnusedSelector];
    let css = ResultCSS;
    let query = arr[id];
    css = css.split(query);
    css[1] = css[1].replace("}", "]");
    css = css[0].concat(css[1].split("]")[1].replace(/\s+/, ""));

    console.log(css);
    SetResultCSS(css);
    arr.splice(id, 1);
    SetUnusedSelector(arr);
  };

  const handlerCSSminify = () => {
    const CleanCSS = require("clean-css");
    const output = new CleanCSS().minify(ResultCSS);
    console.log(output);
    SetResultCSS(output.styles);
    SetSource(output.stats.originalSize);
    SetMinified(output.stats.minifiedSize);
    const calc = Math.round(output.stats.efficiency * 10000) / 100;
    SetEfficiency(calc);
  };

  // ????????? Filter
  const handleSelector = () => {
    let TempArray = [];
    let ScoreArray = [];
    let ID = [];
    let Class = [];
    let Default = [];
    let Unused = [];
    // HTML Filter

    SetSource(undefined);
    SetMinified(undefined);
    SetEfficiency(null);
    SetResultCSS(CSSText);

    let RemarkSplit_HTML = HTMLText.replace(/<!--[^>](.*?)-->/g, "");
    // RemarkSplit_HTML = RemarkSplit_HTML.replace(/\n/gi,"");
    // RemarkSplit_HTML = RemarkSplit_HTML.replace(/\s+/gi,"");
    let FilterClasses = RemarkSplit_HTML.match(/class=".*"/gi);

    FilterClasses = FilterClasses.map((value) => {
      value = value.replace("class=", "");
      value = value.replace(/"/gi, "");
      return `.${value}`;
    });

    let FilterId = RemarkSplit_HTML.match(/id=".*"/gi);
    if (FilterId !== undefined) {
      FilterId = FilterId.filter((value) => !value.includes(" "));
      FilterId = FilterId.map((value) => {
        value = value.replace("id=", "");
        value = value.replace(/"/gi, "");
        return `#${value}`;
      });
    }

    RemarkSplit_HTML = FilterClasses.concat([...FilterId]);
    const set = new Set(RemarkSplit_HTML);
    RemarkSplit_HTML = [...set];

    SetHTML(RemarkSplit_HTML);

    // CSS Filter
    // CSS ????????? ??????
    // ????????? ???, } ??? ?????? {??? ?????? - split ???????????????
    // ????????? ??????
    // ?????? ??????
    let RemarkSplit_CSS = CSSText.replace(/(\/\*)[^(\*\/)]*(\*\/)/g, "");

    console.log(RemarkSplit_CSS);
    SetCSS(RemarkSplit_CSS); // ???????????? CSS
    console.log(RemarkSplit_HTML);
    let SplitText = RemarkSplit_CSS.replace(/}/gi, "{");
    let temp1 = SplitText.replace(/\n/gi, "");
    let TextSplit = temp1.split("{");
    // ?????? ??? ???????????? ?????? ??????.
    for (let i = 0; i < TextSplit.length; i = i + 2) {
      if (TextSplit[i] !== "") {
        TempArray = [...TempArray, TextSplit[i].trim()];
      }
    }
    // ?????????????????? ??????
    TempArray = TempArray.sort(compare).reverse();
    SetSelectorArray(TempArray);
    console.log(TempArray);
    // ????????? ????????? ??????
    SelectorArray.map((item) => {
      if (item.includes("#")) {
        ID.push(item);
      }
    });
    SetIDSelector(ID);
    console.log(IDSelector);

    // Class ????????? ??????
    SelectorArray.map((item) => {
      if (item.includes(".")) {
        Class.push(item);
      }
    });
    SetClassSelector(Class);
    console.log(ClassSelector);

    // Default ????????? ??????
    SelectorArray.map((item) => {
      if (!item.includes(".") && !item.includes("#")) {
        Default.push(item);
      }
    });
    SetDefaultSelector(Default);
    console.log(DefaultSelector);

    ID.map((value) => {
      if (!HTML.includes(value)) Unused.push(value);
    });

    Class.map((value) => {
      if (!HTML.includes(value)) Unused.push(value);
    });

    SetUnusedSelector(Unused);

    // ??????????????? ??????
    SelectorArray.map((item) => {
      let result = calculate(item);
      ScoreArray.push(result[0].specificityArray);
    });
    SetSelectorScore(ScoreArray);
    console.log(SelectorScore);
  };

  const renderIDlist = () =>
    IDSelector.length > 0 &&
    IDSelector.map((item, key) => (
      <SelectItem color={"red"} key={key}>
        {item}
      </SelectItem>
    ));
  const renderClasslist = () =>
    ClassSelector.length > 0 &&
    ClassSelector.map((item, key) => (
      <SelectItem color={"red"} key={key}>
        {item}
      </SelectItem>
    ));
  const renderDefaultlist = () =>
    DefaultSelector.length > 0 &&
    DefaultSelector.map((item, key) => (
      <SelectItem color={"red"} key={key}>
        {item}
      </SelectItem>
    ));
  const renderUnusedlist = () =>
    UnusedSelector.length > 0 &&
    UnusedSelector.map((item, key) => (
      <SelectItem onClick={() => handleRemoveSelector(key)} key={key}>
        <strong>{item}</strong>
        <RemoveBtn className="remove-button">??????</RemoveBtn>
      </SelectItem>
    ));
  useEffect(() => {
    // CASECADE LIST RENDER
    renderIDlist();
    renderClasslist();
    renderDefaultlist();
    renderUnusedlist();
  }, [IDSelector, ClassSelector, DefaultSelector, UnusedSelector]);

  return (
    <>
      <PrintContainer>
        <PrintDescriptionContainer>
          <PrintDescription>
            <h4>
              CSS ?????? ??????{" "}
              <span
                class="material-icons"
                style={{ fontSize: "12px" }}
                data-tip
                data-for="tooltip"
              >
                help_outline
              </span>
            </h4>
            <ReactTooltip
              place="bottom"
              type="info"
              effect="solid"
              id="tooltip"
            >
              <Tooltip>
                <strong>????????? ??????????</strong>
                <br />
                ??????????????? ????????? ????????? ????????? ???????????? ????????? ???????????????.
                <br />
                ??????????????? ID, Class, Element ?????? ???????????? ???????????????.
              </Tooltip>
            </ReactTooltip>
            <CasecadingContainer>
              <CASECADING_LIST_WRAP>
                <h4>ID Selector Rank</h4>
                <CASECADING_LIST>{renderIDlist()}</CASECADING_LIST>
              </CASECADING_LIST_WRAP>
              <CASECADING_LIST_WRAP>
                <h4>Class Selector Rank</h4>
                <CASECADING_LIST>{renderClasslist()}</CASECADING_LIST>
              </CASECADING_LIST_WRAP>
              <CASECADING_LIST_WRAP>
                <h4>Default Selector</h4>
                <CASECADING_LIST>{renderDefaultlist()}</CASECADING_LIST>
              </CASECADING_LIST_WRAP>
            </CasecadingContainer>
          </PrintDescription>
          <PrintDescription>
            <h4>
              ???????????? ?????? Selector{" "}
              <span
                class="material-icons"
                style={{ fontSize: "12px" }}
                data-tip
                data-for="tooltip-2"
              >
                help_outline
              </span>
            </h4>
            <ReactTooltip
              place="bottom"
              type="info"
              effect="solid"
              id="tooltip-2"
            >
              <Tooltip>
                <strong>???????????? ?????? ??????????</strong>
                <br />
                ???????????? HTML/CSS ????????? ?????? ???????????? ???????????????.
                <br />
                ??? ??? CSS??? ???????????? ?????? ???????????? ???????????? ??????????????? ????????????
                <br />
                ????????? ?????? ????????? ????????? ?????? ????????? ????????? ?????? ?????????
                ????????????.
              </Tooltip>
            </ReactTooltip>
            <UnusedList>{renderUnusedlist()}</UnusedList>
          </PrintDescription>
        </PrintDescriptionContainer>
        <PrintTextContainer>
          <PrintTextHeader>
            <h4>CSS</h4>
            <PrintTextForm>{CSS}</PrintTextForm>
          </PrintTextHeader>
          <PrintTextHeader>
            <CssHeader>
              Result CSS{" "}
              <span
                onClick={handleCopyText}
                class="material-icons"
                style={{ fontSize: "12px" }}
              >
                content_paste
              </span>
            </CssHeader>

            <PrintTextForm ref={ResultRef}>{ResultCSS}</PrintTextForm>
          </PrintTextHeader>
        </PrintTextContainer>
      </PrintContainer>
      <ReturnBtnContainer>
        <ReturnBtn onClick={handleSelector}>????????????</ReturnBtn>
        <ReturnBtn onClick={handlerCSSminify}>Minify</ReturnBtn>

        {Source && Minified && Efficiency ? (
          <>
            <StatusContainer>
              <StatusHead>?????? ?????? ?????? </StatusHead>
              <Status>
                <strong>{Source}</strong> byte
              </Status>
            </StatusContainer>
            <StatusContainer>
              <StatusHead>?????? ?????? ?????? </StatusHead>
              <Status>
                <strong style={{ color: "red" }}>{Minified}</strong> byte
              </Status>
            </StatusContainer>
            <StatusContainer>
              <StatusHead>?????? ??????(????????????)</StatusHead>
              <Status>
                <strong>{Efficiency}</strong>%
              </Status>
            </StatusContainer>
          </>
        ) : (
          ""
        )}
      </ReturnBtnContainer>
    </>
  );
};

export default PrintData;
