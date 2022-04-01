import React from "react";
import parse from "html-react-parser";

interface Props {
  headers?: string[];
  children?: React.ReactNode[];
  activeTab?: number;
}

export const TabView = ({
  headers,
  children,
  activeTab = 0,
}:Props) => {
  if(!Array.isArray(children)){
    let a = [];
    a.push(children);
    children = a as React.ReactNode[];
  }

  if(Array.isArray(headers) && Array.isArray(children) && headers.length != children.length){
    return (
      <div style={{backgroundColor:"#fcc"}}>
        error: number of headers does not match number of tab panes
      </div>
    )
  }

  function selectTab(i: any){
    let t = document.querySelector("#tabHeader");
    let f = document.querySelector("#tabFrame");
    t?.querySelectorAll(".tabButton")?.forEach(
      tab => tab.classList.remove("active")
    );
    f?.querySelectorAll(".tabPanel")?.forEach(
      frame => frame.classList.remove("active")
    );
    t?.querySelectorAll(".tabButton")[i]?.classList?.add("active");
    f?.querySelectorAll(".tabPanel")[i]?.classList?.add("active");
  }


  let parsedText, updatedChildren = [];
  for(let i = 0; i < children.length; i++) {
    if(typeof children[i] == "string"){
      // parsedText = parse(children[i]);
    } else {
      parsedText = children[i];
    }
    let cN = `tabPanel display-none active:display-block`;
    // updatedChildren[i] = React.cloneElement(parsedText, {className : cN, key: "pane_"+i});
  }
  // children = updatedChildren;

  return (
    <div>
      <div className={`grid grid-cols-${(Array.isArray(headers) && headers.length) || 1} box-border px-36 mr-28`} id="tabHeader">
        {
          headers?.map((t, i) => {
            return (<div key={"tabWrap_"+i}><div key={"tabButton_"+i} className={`tabButton inline-block cursor-pointer border-solid border-2 border-sky-500 active:blue-500`} onClick={()=>selectTab(i)}>{t}</div></div>);
          })
        }
      </div>
      <div id="tabFrame">
        {
          children
        }
      </div>
    </div>
  );
}
