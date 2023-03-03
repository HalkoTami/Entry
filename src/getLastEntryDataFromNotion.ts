import { databaseId, notion } from './sendDataToNotion';
import { EntryData } from './EntryData';
import { EntryUiData } from './EntryUIData';
type Tag={
  id:string
  name:string
  color:string
}
async function getTagList():Promise<string[]>{
  const database = await notion.databases.retrieve({database_id:databaseId})
  const dataJs = JSON.parse(JSON.stringify(database).replace(" ","_"))
  const tags = dataJs.properties.tag.select.options as [Tag]
  const tagList = fetchTagList(tags)
  console.log(tagList) 
  return new Promise((resolve,reject)=>
      resolve(tagList)
  
    )
}
function fetchTagList(tags:[Tag]):string[]{
  const tagList:string[] = []
  tags.forEach((tag:Tag)=>tagList.push(tag.name))
  return tagList
}
export async function getEntryList():Promise<EntryData[]> {
  let list:EntryData[] = []
  const databaseResponce = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'start edit',
        direction: 'descending',
      },
    ],
    page_size: 10
  });


  for(let i=0;i<databaseResponce.results.length;i++){
    const entry = databaseResponce.results[i]
    const itemJs = JSON.parse(JSON.stringify(entry).replace(" ","_")).properties
    list.push(new EntryData(
      entry.id,
      itemJs.start_edit.date.start,
      itemJs.end.date?.start,
      itemJs.名前.title[0].plain_text,
      itemJs.tag.select?.name
    ))
  }

  return new Promise((resolve,reject)=>
      resolve(list)
    )
}

export async function getLastEntryDataFromNotion():Promise<EntryUiData>{
    const tagListResponse = await getTagList()
    
    const databaseResponce = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: 'start edit',
            direction: 'descending',
          },
        ],
        page_size: 1
    });
    const firstItem = databaseResponce.results[0]
    const itemJs = JSON.parse(JSON.stringify(firstItem).replace(" ","_")).properties
    const endDateData = itemJs.end.date
    const isOpened = endDateData==null
  

    if(!isOpened) {return  new EntryUiData(tagListResponse,null)}


    const openedRowData = new EntryData(
       firstItem.id,
       itemJs.start_edit.date.start,
       itemJs.end.date?.start,
       itemJs.名前.title[0].plain_text,
       itemJs.tag.select?.name
    )
    
    return new Promise((resolve,reject)=>
      resolve(new EntryUiData(tagListResponse,openedRowData))
    )

}