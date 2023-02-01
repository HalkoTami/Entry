import { Client} from '@notionhq/client'
import { popToRoot, showToast } from '@raycast/api'
import { convertDateToString } from './dateConverter'
import { EntryValues } from './EntryValues'
import { database_id, my_token } from './key/secret_values'
import { OpenedRowData } from './OpenedRowData'
export const token = my_token
export const databaseId = database_id
export async function insertRow(entryValues:EntryValues){
    const notion = new Client({
        auth: token,
    })
    const pageData = new PageContentFromEntryValues(entryValues)
    try {
        const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            "名前": { 
            title:[
                {
                "text": {
                    "content": pageData.comment
                }
                }
            ]
            } ,
            "start edit": {
                "date": {
                  "start":  pageData.date,
                  "time_zone": "Asia/Tokyo"
                },
            },
            "tag": {
                select: {
                    name:pageData.tag
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
class PageContentFromEntryValues{
    comment:string
    date:string
    tag:string
    constructor(entryValues:EntryValues){
            this.comment = entryValues.contentField
            this.date = convertDateToString(entryValues.dateTime) 
            this.tag    = entryValues.tag
    }
}
export class UpDatingData{
    pageId:string
    comment:string
    endDate:string
    tag:string
    constructor(row:OpenedRowData,
        entryValues:EntryValues){
            this.pageId = row.id
            const pageContent = new PageContentFromEntryValues(entryValues)
            this.comment = pageContent.comment
            this.endDate = pageContent.date
            this.tag    = pageContent.tag
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
                          "content": data.comment
                      }
                      }
                  ]
              } ,
              "end":{
                  "date": {
                      "start": data.endDate,
                      "time_zone": "Asia/Tokyo"
                    },
              },
              "tag": {
                  select: {
                      name:data.tag
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




