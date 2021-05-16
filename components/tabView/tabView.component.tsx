import * as React from "react";
import styles from "./tabView.module.scss";

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

  function selectTab(i){
    let t = document.querySelector("#tabHeader");
    let f = document.querySelector("#tabFrame");
    t.querySelectorAll("."+styles.tabButton).forEach(
      tab => tab.classList.remove(styles.active)
    );
    f.querySelectorAll("."+styles.tabPanel).forEach(
      frame => frame.classList.remove(styles.active)
    );
    t.querySelectorAll("."+styles.tabButton)[i].classList.add(styles.active);
    f.querySelectorAll("."+styles.tabPanel)[i].classList.add(styles.active);
  }

  const parse = require('html-react-parser');
  let parsedText, updatedChildren = [];
  for(let i = 0; i < children.length; i++){
    if(typeof children[i] == "string"){
      parsedText = parse(children[i]);
    } else {
      parsedText = children[i];
    }
    let cN = (parsedText.props.className || "") + " "+styles.tabPanel+(i==activeTab?" "+styles.active:" ");
    updatedChildren[i] = React.cloneElement(parsedText, {className : cN, key: "pane_"+i});
  }
  children = updatedChildren;

  return (
    <div className={styles.root}>
      <div className={styles.tabHeader} id="tabHeader" style={{"--col":(Array.isArray(headers)?headers.length:1)}}>
        {
          headers.map((t, i) => {
            return <div key={"tabWrap_"+i}><div key={"tabButton_"+i} className={`${styles.tabButton}`+(i==activeTab?` ${styles.active}`:``)} onClick={()=>selectTab(i)}>{t}</div></div>;
          })
        }
      </div>
      <div className={styles.tabFrame} id="tabFrame">
        {
          children
        }
      </div>
    </div>
  );
}
