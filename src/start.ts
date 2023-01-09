
import { showToast,popToRoot } from "@raycast/api";
import { insertRow } from './getNotionClient';

export function start(comment:string,date:Date) {
    date.setTime(date.getTime() + (9*60*60*1000));
    const dateString:string = date.toISOString()
    const doOnSccess = async()=>{
        await showToast({ title: "Dinner is ready", message: "Success! Entry added." });
            popToRoot()
    }
    insertRow(comment,dateString,doOnSccess)
}  