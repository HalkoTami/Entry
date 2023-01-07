import { Client } from '@notionhq/client'
const token = 'secret_5NlCmKB8tpMouUNxZdlNo0sGaTNJg5HnVxPIgWXht45'
const databaseId = 'a260799631664f0d8d23e80cae917495'
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
        getLastInsertedRow()
    } catch (error) {
        console.log("error")
    }
}
export async function getLastInsertedRow(){
    const notion = new Client({
        auth: token,
    })
    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: 'created time',
            direction: 'descending',
          },
        ],
        
      });


        console.log(response);
    }