import { Client } from '@notionhq/client'
import { showToast,popToRoot } from "@raycast/api";
import { insertRow } from './getNotionClient';

const token = 'secret_5NlCmKB8tpMouUNxZdlNo0sGaTNJg5HnVxPIgWXht45'
const databaseId = 'a260799631664f0d8d23e80cae917495'
export function start(comment:string,date:Date) {
    date.setTime(date.getTime() + (9*60*60*1000));
    const dateString:string = date.toISOString()
    const insert = async () => {
        const notion = new Client({
            auth: token,
        })

        try {
            const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "名前": { 
                title:[
                    {
                    "text": {
                        "content": comment
                    }
                    }
                ]
                } ,
                "start edit": {
                    "date": {
                      "start": dateString,
                      "time_zone": "Asia/Tokyo"
                    },
                
        
                  }
                
            },
            })
            console.log(response)
            console.log("Success! Entry added.")
            await showToast({ title: "Dinner is ready", message: "Success! Entry added." });
            popToRoot()
        } catch (error) {
            console.log("error")
        }
    }
    const doOnSccess = async()=>{
        await showToast({ title: "Dinner is ready", message: "Success! Entry added." });
            popToRoot()
    }
    insertRow(comment,dateString,doOnSccess)
}  