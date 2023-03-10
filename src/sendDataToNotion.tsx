import { Client} from '@notionhq/client'
import { popToRoot, showToast,useNavigation } from '@raycast/api'
import { convertDateToString } from './dateConverter'
import { EntryValues } from './EntryValues'
import { database_id, my_token } from './key/secret_values'
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
                  "start":  convertDateToString(entryValues.startDateTime),
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
export async function updatePage(pageId:string,entryValues:EntryValues){
    const notion = new Client({
        auth: token,
    })
    
    const end =()=>{
        if(entryValues.endDateTime==null) return null
        else return convertDateToString(entryValues.endDateTime)
    }
    const endDate = end() 
    const completedMessage = ()=>{
        if(endDate==null) return "Parent Activity Updated"
        else return "Activity ended on "+new Date(endDate).toTimeString()
    }
    try {
        const response = await notion.pages.update({
            page_id: pageId,
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
              "start edit":{
                "date": {
                    "start": convertDateToString(entryValues.startDateTime),
                    end: endDate,
                    "time_zone": "Asia/Tokyo"
                  },
                },
              "tag": {
                  select: {
                      name:entryValues.tag
                  }
                }
            },
        });
        console.log(response)
        console.log("Success! Entry closed.")
        if(endDate==null) popToRoot()
        await showToast({ title: "Succeed!", message: completedMessage() });
    } catch (error) {
        console.log(error)
    }
    
} 




