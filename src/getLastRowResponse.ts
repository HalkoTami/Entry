import { Client } from '@notionhq/client'
import { token,databaseId } from './getNotionClient';
import { LastRowResponse } from './LastRowResponse';
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
    const itemJs = JSON.parse(JSON.stringify(firstItem))
    
    console.log(itemJs.properties.名前.title[0])

    // console.log(databaseResponce)
    const pageResponse:Object = await notion.pages.properties.retrieve
    ({ page_id: firstItem.id,property_id:'AYTm' });

    // console.log(pageResponse)
    const propDate = JSON.parse(JSON.stringify(pageResponse))
    // console.log(propDate.date);
    return new LastRowResponse(propDate.date ==null,null)

}