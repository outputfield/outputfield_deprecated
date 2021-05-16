import * as React from "react";
import styles from "./workPanel.module.scss";
import Work from "../data/work";

interface Props {
  works: Work[];
  className?: string;
}

export const WorkPanel = ({
  works,
  className,
}:Props) => {
  return (
    <div className={className+" "+styles.root}>
      {/*<div className={styles.reminder}>need to add scroll/carousel/lightbox</div>*/}
      {
        works.map((e,i)=>{
          if(e.type=="image"){
            return (<img key={"work_"+i} src={e.link}/>)
          } else {
            return (<div key={"work_"+i} className={styles.unimplemented}>* still need to implement widget for {e.type} *</div>)
          }
        })
      }
    </div>
  );
}
