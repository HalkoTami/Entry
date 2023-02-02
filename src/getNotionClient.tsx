import { Client} from '@notionhq/client'
import { popToRoot, showToast } from '@raycast/api'
import { convertDateToString } from './dateConverter'
import { EntryValues } from './EntryValues'
import { database_id, my_token } from './key/secret_values'
import { OpenedRowData } from './OpenedRowData'
export const token = my_token
export const databaseId = database_id
export const notion = new Client({
    auth: token,
})
export async function insertRow(entryValues:EntryValues){
    try {
        const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            "名前": { 
            title:[
                {
                "text": {
                    "content": entryValues.contentField
                }
                }
            ]
            } ,
            "start edit": {
                "date": {
                  "start":  convertDateToString(entryValues.dateTime),
                  "time_zone": "Asia/Tokyo"
                },
            },
            "tag": {
                select: {
                    name:entryValues.tag
                }
              }
        },
        })
        console.log(response)
        console.log("Success! Entry added.")
        await showToast({ title: "Activity Started", message: "Success! Entry added." });
        popToRoot()
    } catch (error) {
        console.log("error")
    }
}
export class UpDatingData{
    pageId:string
    entryValues:EntryValues
    constructor(row:OpenedRowData,
        entryValues:EntryValues){
            this.pageId = row.id
            this.entryValues = entryValues
        }
}
export async function updatePage(data:UpDatingData){
    const notion = new Client({
        auth: token,
    })
    try {
        const response = await notion.pages.update({
            page_id: data.pageId,
            properties: {
              "名前": { 
                  title:[
                      {
                      "text": {
                          "content": data.entryValues.contentField
                      }
                      }
                  ]
              } ,
              "end":{
                  "date": {
                      "start": convertDateToString(data.entryValues.dateTime),
                      "time_zone": "Asia/Tokyo"
                    },
              },
              "tag": {
                  select: {
                      name:data.entryValues.tag
                  }
                }
            },
        });
        console.log(response)
        console.log("Success! Entry closed.")
        await showToast({ title: "Activity Ended", message: "Success! Entry updated." });
    } catch (error) {
        console.log(error)
    }
    
} 




