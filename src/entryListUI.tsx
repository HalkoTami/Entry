import { useEffect, useRef, useState } from "react";
import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { getEntryList } from "./getLastEntryDataFromNotion";
import { EntryData } from "./EntryData";

const items = ["Augustiner Helles", "Camden Hells", "Leffe Blonde", "Sierra Nevada IPA"];

export default function Command() {
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

  
  const content = ()=>{
    if(data==undefined) return
    const map = getDateList(data)
    var arr = Array.from(map.keys())
    return arr.map((item)=>(
      getSection(item,map.get(item))
    ))
  }


  return (
    <List
      filtering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite beer"
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
  const lastDate  = completedList[completedList.length-1].end

  if(lastDate==undefined) return map
  const startDayCount = getDaysCountFromDate(startDate)
  const endDayCount = getDaysCountFromDate(lastDate)
  
  for(let i=startDayCount; i>endDayCount-1;i--){
    console.log(getDateFromDaysCount(i).toDateString())
    const entries = list.filter((item)=>{
      if(item.end!=undefined)
      return getDaysCountFromDate(item.end)==i
    })
    map.set(i,entries)
  } 
  return map
  
}
function getSection(dayCount:number,data:EntryData[]|undefined){
  const dateString =getDateFromDaysCount(dayCount).toDateString() 
  console.log(getDateFromDaysCount(dayCount).toDateString())
  return (
    <List.Section title={dateString} subtitle="Optional subtitle">
      {data?.map((item) => (
        getListItem(item)
      ))}
      </List.Section>
  )
}
function getListItem(item:EntryData){
  return (
    <List.Item
          key={item.id}
          title={item.comment}
          subtitle="experiment"
          accessories={[
            { text: `An Accessory Text`, icon: Icon.Hammer },
            { text: { value: `A Colored Accessory Text`, color: Color.Orange }, icon: Icon.Hammer },
            { icon: Icon.Person, tooltip: "A person" },
            { text: "Just Do It!" },
            { date: new Date() },
            { tag: new Date() },
            { tag: { value: new Date(), color: Color.Magenta } },
            { tag: { value: "User", color: Color.Magenta }, tooltip: "Tag with tooltip" },
          ]}
          actions={
            <ActionPanel>
                <Action title="Edit" onAction={() => console.log(`${item} edited`)} />
                <Action title="Delete" onAction={() => console.log(`${item} deleted`)} />
            </ActionPanel>
          }
        />
  )
}
