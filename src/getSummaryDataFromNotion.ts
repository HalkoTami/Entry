import {  convertStringToDate } from "./dateConverter";
import { databaseId, notion } from "./getNotionClient";
import { ActivityData, SummaryUIData } from "./SummaryUIData";


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
  const todayList:ActivityResponce[] = []
  databaseResponce.results.forEach((item)=>{
    const js = JSON.parse(JSON.stringify(item).replace(" ","_")).properties
    const itemAsActivityData = new ActivityResponce(js.tag.select.name, js.start_edit.date.start,js.end.date.start)
    todayList.push(itemAsActivityData)
  })
  
    return new Promise((resolve,reject)=>
      resolve(new SummaryUIData(getActivityDataListForEachTag(todayList,todayList)))
    )
}
class ActivityResponce{
  tag:string
  duration:number
  constructor(tag:string,startTime:string,endTime:string){
    this.tag = tag
    this.duration = (convertStringToDate(endTime).getTime()-convertStringToDate(startTime).getTime())/1000/60
  }
}
function getTotalMinFilteredByTag(filterTag:string,list:ActivityResponce[]):number{
  let totalDuration:number = 0
  list.filter((item)=>{
    return item.tag == filterTag
  }).forEach((item)=>{
    totalDuration += item.duration
  })
  return totalDuration
}
function getActivityDataListForEachTag(todaysList:ActivityResponce[],thisWeeksList:ActivityResponce[]):ActivityData[]{
  let list:ActivityData[] = []
  new Set(todaysList.map((item)=>{
    return item.tag
  })).forEach((eachTag)=>{
    list.push(new ActivityData(
      eachTag,
      getTotalMinFilteredByTag(eachTag,todaysList),
      getTotalMinFilteredByTag(eachTag,thisWeeksList)))
  })
  return list

}