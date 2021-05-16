import React, { useState } from "react";
import styles from "./contactPanel.module.scss";
import Artist from "../data/artist";
import { Button } from "../button/button.component";
import { sendMessage } from "../../pages/api/sendMessage";

interface Props {
  artist: Artist;
  separateTab?: boolean;
  className?: string;
  onClick?: (event: any) => any;
}

export const ContactPanel = ({
  artist,
  separateTab = false,
  className,
  onClick,
}:Props) => {

  const [error, setError] = useState("");

  function selectTopic(event){
    let e = event.target;
    document.querySelectorAll("."+styles.topicSelector+" div").forEach(
      t => {if(t.classList!=undefined) t.classList.remove(styles.active)}
    );
    e.classList.add(styles.active);

    let i = document.querySelector("#contactSubject") as HTMLInputElement;
    if(i.disabled){
      setError("");
      let c = document.getElementById("contactSubject") as HTMLInputElement;
      c.disabled = false;
      c = document.getElementById("contactMessage") as HTMLInputElement;
      c.disabled = false;
    }
  }

  function messageClick(event){
    let i = document.querySelector("#contactSubject") as HTMLInputElement;
    if(i.disabled && event.target.type != undefined && event.target.type.includes("text")){
      setError("select a topic");
      document.querySelector("."+styles.messageWrap).removeAttribute("onClick");
    }
  }

  async function prepMessage(){
    let top = document.querySelector("."+styles.topicSelector+" div."+styles.active);
    let sub = document.querySelector("#contactSubject") as HTMLInputElement;
    let mes = document.querySelector("#contactMessage") as HTMLInputElement;
    if((sub.value == undefined || sub.value == "") &&
       (mes.value == undefined || mes.value == "")){
      setError("subject and message can't be blank");
    }else if(sub.value == undefined || sub.value == ""){
      setError("subject can't be blank");
    }else if(mes.value == undefined || mes.value == ""){
      setError("message can't be blank");
    } else {
      await sendMessage(
        artist.email,
        top.textContent,
        sub.value,
        mes.value
      ).then((res)=>{
        if(!res){
          (document.querySelector("#contactButton") as HTMLButtonElement).innerHTML = "EMAIL NOT SET UP"
        }
      });
    }
  }

  return (
    <div className={className+" "+styles.root+(separateTab?" "+styles.separateTab:"")}>
      <div className={styles.header}>
        Select a message topic:
      </div>
      <div className={styles.topicSelector}>
        <div onClick={selectTopic}>Collab</div>
        <div onClick={selectTopic}>Business</div>
        <div onClick={selectTopic}>Other</div>
      </div>
      <div className={styles.messageWrap} onClick={messageClick}>
        <input className={styles.subject} type="text" placeholder="Subject" id="contactSubject" disabled autoComplete="off"/>
        <div className={styles.contactSpacer}/>
        <textarea className={styles.message} placeholder="Message" id="contactMessage" disabled/>
      </div>
      <div className={styles.error}>
        {
          error==undefined||error==""?
          "":
          "Error: "+error
        }
      </div>
      <Button onClick={prepMessage} id="contactButton">
        contact
      </Button>
      { separateTab?
        ""
        :
        (
          <div className={styles.contactBack} onClick={onClick}>Back to artist info</div>
        )
      }
    </div>
  );
}
