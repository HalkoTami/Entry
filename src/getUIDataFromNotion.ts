import { Client } from '@notionhq/client'
import { convertStringToDate } from './dateConverter';
import { token,databaseId, notion } from './getNotionClient';
import { OpenedRowData } from './OpenedRowData';
import { EntryUiData } from './UiData';
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
export async function getUIDataFromNotion():Promise<EntryUiData>{
    const tagListResponse = await getTagList()
    
    const databaseResponce = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: 'start edit',
            direction: 'descending',
          },
        ],
    });
    const firstItem = databaseResponce.results[0]
    const itemJs = JSON.parse(JSON.stringify(firstItem).replace(" ","_")).properties
    const endDateData = itemJs.end.date
    const isOpened = endDateData==null
  

    if(!isOpened) {return  new EntryUiData(tagListResponse,null)}


    const openedRowData = new OpenedRowData(
       firstItem.id,
       itemJs.start_edit.date.start,
       itemJs.名前.title[0].plain_text,
       itemJs.tag.select?.name
    )
    
    return new Promise((resolve,reject)=>
      resolve(new EntryUiData(tagListResponse,openedRowData))
    )

}