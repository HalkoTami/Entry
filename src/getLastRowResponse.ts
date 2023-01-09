import { Client } from '@notionhq/client'
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
    
  
    const editStartDate = new Date(itemJs.start_edit.date.start)
    console.log(editStartDate )

    const openedRowData = new OpenedRowData()
    return new LastRowResponse(editStartDate ==null,null)

}