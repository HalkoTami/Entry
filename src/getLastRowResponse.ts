import { Client } from '@notionhq/client'
import { convertStringToDate } from './dateConverter';
import { token,databaseId } from './getNotionClient';
import { LastRowResponse } from './LastRowResponse';
import { OpenedRowData } from './OpenedRowData';
export async function getLastRowResponse():Promise<LastRowResponse>{
    const notion = new Client({
        auth: token,
    })
  
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

    if(!isOpened) {return  new LastRowResponse(isOpened,null)}


    const editStartDate = convertStringToDate(itemJs.start_edit.date.start)
    const id = firstItem.id
    const comment = itemJs.名前.title[0].plain_text
    const tagData = itemJs.tag.select?.name

    const openedRowData = new OpenedRowData(
      id,editStartDate,null,comment,tagData
    )
    
    return new LastRowResponse(isOpened,openedRowData)

}