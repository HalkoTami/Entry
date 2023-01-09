import { Client} from '@notionhq/client'
import { List } from '@raycast/api'
export const token = 'secret_5NlCmKB8tpMouUNxZdlNo0sGaTNJg5HnVxPIgWXht45'
export const databaseId = 'a260799631664f0d8d23e80cae917495'
export async function insertRow(comment:string,dateString:string,doOnsuccess:()=>void){
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
        doOnsuccess()
    } catch (error) {
        console.log("error")
    }
}
export async function checkEntryStatus() {
    
}



