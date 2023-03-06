import { useEffect, useRef, useState } from "react";
import { Action, ActionPanel, Color, Icon, List, Navigation, popToRoot, useNavigation } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { getEntryList } from "./getLastEntryDataFromNotion";
import { EntryData } from "./EntryData";
import { Entry } from "./entryUI";
import { getTimeDiffInMilli } from "./dateConverter";

const items = ["Augustiner Helles", "Camden Hells", "Leffe Blonde", "Sierra Nevada IPA"];

export function EntryList() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getEntryList()
      return result;
    },[],
    {abortable}
  );
  useEffect(() => {
    filterList(items.filter((item) => item.includes(searchText)));
  }, [searchText]);
  
  const { push }:Navigation = useNavigation();
  const edit = (id:string)=>{
    function ToPage(){
      return Entry(id)
    }
    push(<ToPage />)
  }
  const content = ()=>{
    if(data==undefined) return
    const map = getDateList(data)
    var arr = Array.from(map.keys())
    return arr.map((item)=>(
      getSection(item,map.get(item),edit)
    ))
  }

  return (
    <List
      filtering={false}
      isLoading={isLoading}
      navigationTitle="Entry List"
      
    >
      { content()}
      
    </List>
  );
}
function getDaysCountFromDate(date:Date):number{
  return Math.floor(date.getTime()/1000/60/60/24)
}
function getDateFromDaysCount(days:number):Date{
  return new Date(days*1000*60*60*24)
}
function getDateList(list:EntryData[]):Map<number,EntryData[]>{
  let map = new Map<number,EntryData[]>()
  const completedList = list.filter((item)=>(item.end!=undefined))
  const startDate = completedList[0].start
  const lastDate  = completedList[completedList.length-1].start

  const startDayCount = getDaysCountFromDate(startDate)
  const endDayCount = getDaysCountFromDate(lastDate)
  
  for(let i=startDayCount; i>endDayCount-1;i--){
    const entries = list.filter((item)=>{
      return getDaysCountFromDate(item.start)==i
    })
    map.set(i,entries)
  } 
  return map
  
}
function getWeekDayMondayStart(date:Date):number{
  const day = date.getDay()-1
  if(day>=0) return day
  else return 7
}
function getDateRelationString(date:Date):string{
  const dayDiff = getDaysCountFromDate(new Date())-getDaysCountFromDate(date)
  const todayDay = getWeekDayMondayStart(new Date())
  switch(dayDiff){
    case 0: return "Today"
    case 1: return "Yesterday"
    default :{
      if(dayDiff<7+todayDay&&dayDiff<todayDay)return "This Week"
      else if((dayDiff<7+todayDay&&dayDiff>todayDay)
      ||(dayDiff<14+todayDay&&dayDiff<7+todayDay)) return "Last Week"
      else if(dayDiff<14+todayDay&&dayDiff>7+todayDay
        ||(dayDiff<21+todayDay&&dayDiff<14+todayDay)) return "2 Weeks Ago"
      else return ""  
    }
  }
}
function getSection(dayCount:number,data:EntryData[]|undefined,edit:(id:string)=>void){
  const dateString =()=>{
    const dayDiff = getDaysCountFromDate(new Date())-dayCount
    switch(dayDiff){
      case 0: return "Today"
      case 1: return "Yesterday"
      default : return getDateFromDaysCount(dayCount).toDateString()
    }
  }
  return (
    <List.Section title={dateString()} subtitle=""
    >
      {data?.map((item) => (
        getListItem(item,edit)
      ))}
      </List.Section>
  )
}
function getListItem(item:EntryData,edit:(id:string)=>void){
  const timeRange = ()=>{
    const rangeEnd = ()=>{
      if(item.end!=undefined)
        return item.end?.toLocaleTimeString().slice(0,5)
      else return "now "
    }
    return item.start.toLocaleTimeString().slice(0,5)
    +" - " +rangeEnd()
  }
  const durationText=()=>{
    const end = ()=>{if(item.end==null) return new Date() 
    else return item.end }
    const diff = getTimeDiffInMilli(item.start,end())
    const hour = diff/1000/60/60
    if(hour>1)return (Math.floor(hour*10)/10).toString()+"h"
    else return (Math.floor((diff/1000/60))).toString()+"min"
  }
  const subTitle = ()=>{
    return "⏱️ "+durationText()+" | 🗒️ "+ item.comment
  }  
  return (
    <List.Item
          key={item.id}
          title={timeRange()}
          subtitle={subTitle()}
          accessories={[
            { tag: { value: item.tag, color: Color.Magenta } },
          ]}
          actions={
            <ActionPanel>
                <Action title="Edit" onAction={() => edit(item.id)} />
                <Action title="Delete" onAction={() => console.log(`${item} deleted`)} />
                <Action title="home" shortcut={{ modifiers: [], key: "escape" }} onAction={()=>popToRoot()}/>
            </ActionPanel>
          }
        />
  )
}
export default function Command(){
  return EntryList()
}
