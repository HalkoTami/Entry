
import { showToast,popToRoot } from "@raycast/api";

import { insertRow } from './getNotionClient';
import { EntryValues } from "./UiData";

export function start(entryValues:EntryValues) {
    const date = entryValues.dateTime
    const comment = entryValues.contentField
    date.setTime(date.getTime() + (9*60*60*1000));
    const dateString:string = date.toISOString()
    const doOnSccess = async()=>{
        await showToast({ title: "Dinner is ready", message: "Success! Entry added." });
            popToRoot()
    }
    insertRow(comment,dateString,doOnSccess)
}  