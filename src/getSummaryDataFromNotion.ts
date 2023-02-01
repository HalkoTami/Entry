import { convertDateToString, convertStringToDate } from "./dateConverter";
import { databaseId, notion } from "./getNotionClient";
import { SummaryUIData } from "./SummaryUIData";


export async function getSummaryDataFromNotion() :Promise<SummaryUIData>{
  const databaseResponce = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'start edit',
        direction: 'descending',
      },
    ],
    filter: {
      property:'start edit',
      date:{
        on_or_after:new Date().toISOString().slice(0,10)
      }
    }
  })
  const todayList:ActivityData[] = []
  databaseResponce.results.forEach((item)=>{
    const js = JSON.parse(JSON.stringify(item).replace(" ","_")).properties
    const itemAsActivityData = new ActivityData(js.tag.select.name, js.start_edit.date.start,js.end.date.start)
    todayList.push(itemAsActivityData)
  })
  
  console.log(todayList[5])
    return new Promise((resolve,reject)=>
      resolve(new SummaryUIData())
    )
}
class ActivityData{
  tag:string
  duration:number
  constructor(tag:string,startTime:string,endTime:string){
    this.tag = tag
    this.duration = (convertStringToDate(endTime).getTime()-convertStringToDate(startTime).getTime())/1000
  }
}