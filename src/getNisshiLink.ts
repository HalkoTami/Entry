import { Client} from '@notionhq/client'
import { BlockObjectRequest } from '@notionhq/client/build/src/api-endpoints'
import { convertDateToString, getDateStringWithoutTime } from './dateConverter'
import { database_id_writing } from './key/secret_values'
import { notion } from './sendDataToNotion'

export async function getNisshiLink() :Promise<string>{
    const databaseResponce = await notion.databases.query({
        database_id: database_id_writing,
        filter: {
            "property": "日付",
            date: {
              on_or_after: getDateStringWithoutTime(new Date())
            }
          },
        page_size: 1
      })
    var url = ""
    if(databaseResponce.results.length!=0) {
        const todayNisshi = databaseResponce.results[0]
        const nisshiJs = JSON.parse(JSON.stringify(todayNisshi))
        url = nisshiJs.url
    } else url = await createTodayNisshi()  
   return new Promise((resolve,reject)=>
    resolve(url)
  )
}
async function createTodayNisshi():Promise<string> {
    const response = await notion.pages.create({
        parent: { database_id: database_id_writing },
        properties: {
            "名前": { 
            title:[
                {
                "text": {
                    "content": "ほげ"
                }
                }
            ]
            } ,
            "日付": {
                "date": {
                  "start":  convertDateToString(new Date()),
                  "time_zone": "Asia/Tokyo"
                },
            },
            "タグ": {
                multi_select: [{"name": "日誌"}]
              }
        },
        })
    const nisshiJs = JSON.parse(JSON.stringify(response))
    return new Promise((resolve,reject)=>
    resolve(nisshiJs.url)
    )
    
}