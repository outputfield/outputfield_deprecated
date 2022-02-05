import React from "react";
import parse from "html-react-parser";
import { useEffect } from "react";

interface Props {
  headers?: string[];
  children?: React.ReactNode[];
  activeTab?: number;
}

const Tabs = ({ color, headers, children }) => {
  const [openTab, setOpenTab] = React.useState(0);

  if (
    Array.isArray(headers) &&
    Array.isArray(children) &&
    headers.length != children.length
  ) {
    return (
      <div style={{ backgroundColor: "#fcc" }}>
        error: number of headers does not match number of tab panes
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        {/* TAB HEADER */}
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist">
          {headers.map((header, index) => (
            <li
              key={header}
              className="-mb-px mr-2 last:mr-0 flex-auto text-left">
              <a
                className={
                  "text-s font-bold uppercase px-5 py-3 block leading-normal underline-offset-4 decoration-blue-600 decoration-2 " +
                  (openTab === index
                    ? "underline text-blue-600"
                    : "no-underline")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(index);
                }}
                data-toggle="tab"
                href={`#${header}`}
                role="tablist">
                {header}
              </a>
            </li>
          ))}
        </ul>
        {/* TAB HEADERS END */}

        {/* TAB PANELS */}
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              {children.map((panel, index) => (
                <div
                  className={openTab === index ? "block" : "hidden"}
                  id={`${headers[index]}`}>
                  {panel}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

// export const TabView = ({
//   headers,
//   children,
//   activeTab = 0,
// }:Props) => {
//   if(!Array.isArray(children)){
//     let a = [];
//     a.push(children);
//     children = a as React.ReactNode[];
//   }

//   if(Array.isArray(headers) && Array.isArray(children) && headers.length != children.length){
//     return (
//       <div style={{backgroundColor:"#fcc"}}>
//         error: number of headers does not match number of tab panes
//       </div>
//     )
//   }

//   function selectTab(i){
//     let t = document.querySelector("#tabHeader");
//     let f = document.querySelector("#tabFrame");
//     t.querySelectorAll(".tabButton").forEach(
//       tab => tab.classList.remove("active")
//     );
//     f.querySelectorAll(".tabPanel").forEach(
//       frame => frame.classList.remove("active")
//     );
//     t.querySelectorAll(".tabButton")[i].classList.add("active");
//     console.log(f.querySelectorAll(".tabPanel"))
//     f.querySelectorAll(".tabPanel")[i].classList.add("active");
//   }

//   useEffect(() => {
//     let parsedText, updatedChildren = [];
//     for(let i = 0; i < children.length; i++) {
//       if(typeof children[i] == "string"){
//         parsedText = parse(children[i]);
//       } else {
//         parsedText = children[i];
//       }
//       let cN = `${parsedText.props.className + " " || ""}tabPanel display-none active:display-block`;
//       updatedChildren[i] = React.cloneElement(parsedText, {className : cN, key: "pane_"+i});
//     }
//     children = updatedChildren;
//   }, [])

//   return (
//     <div>
//       <div className={`grid grid-cols-${(Array.isArray(headers) && headers.length) || 1} box-border px-36 mr-28`} id="tabHeader">
//         {
//           headers.map((t, i) => {
//             return (<div key={"tabWrap_"+i}><div key={"tabButton_"+i} className={`tabButton inline-block cursor-pointer border-solid border-2 border-sky-500 active:blue-500`} onClick={()=>selectTab(i)}>{t}</div></div>);
//           })
//         }
//       </div>
//       <div id="tabFrame">
//         {
//           children
//         }
//       </div>
//     </div>
//   );
// }
