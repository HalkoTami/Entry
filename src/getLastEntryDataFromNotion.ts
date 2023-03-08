import { databaseId, notion } from './sendDataToNotion';
import { EntryData } from './EntryData';
import { EntryUiData } from './EntryUIData';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
type Tag={
  id:string
  name:string
  color:string
}
export async function getTagList():Promise<string[]>{
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
function fetchEntryData(page:PageObjectResponse|PartialPageObjectResponse):EntryData{
  const itemJs = JSON.parse(JSON.stringify(page).replace(" ","_")).properties
  return new EntryData(
    page.id,
    itemJs.dateTime.date.start,
    itemJs.dateTime.date.end,
    itemJs.title.title[0].plain_text,
    itemJs.tag.select?.name
  )
}
export async function getEntryList():Promise<EntryData[]> {
  let list:EntryData[] = []
  const databaseResponce = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'dateTime',
        direction: 'descending',
      },
    ],
    page_size: 10
  });


  for(let i=0;i<databaseResponce.results.length;i++){
    const entry = databaseResponce.results[i]
    list.push(fetchEntryData(entry))
  }

  return new Promise((resolve,reject)=>
      resolve(list)
    )
}
async function getEntryById(id:string):Promise<EntryData> {
  const pageId = id;
  const response = await notion.pages.retrieve({ page_id: pageId });
  return new Promise((resolve,reject)=>
      resolve(fetchEntryData(response))
    )
}
async function getLastInsertedEntry():Promise<EntryData|null>{
  const databaseResponce = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'dateTime',
        direction: 'descending',
      },
    ],
    page_size: 1
  });
  const firstItem = databaseResponce.results[0]
  const lastEntry = fetchEntryData(firstItem)
  const isOpened = lastEntry.end==null
  const getResult = ()=>{
    if(!isOpened) return null
    else return lastEntry
  }
  return new Promise((resolve,reject)=>
      resolve(getResult())
    )

}

export async function getLastEntryDataFromNotion(id:string|undefined):Promise<EntryUiData>{
    const tagListResponse = await getTagList()
    const getEntry =async ()=>{
      if(id==undefined) return await getLastInsertedEntry()
      else return await getEntryById(id)
    }
    const entry = await getEntry()
    return new Promise((resolve,reject)=>
      resolve(new EntryUiData(tagListResponse,entry))
    )

}