import { Action, ActionPanel,Detail,popToRoot} from '@raycast/api'
import { usePromise } from '@raycast/utils';
import { useRef } from 'react';
import { getSummaryDataFromNotion } from './getSummaryDataFromNotion';
import { SummaryUIData } from './SummaryUIData';

export function Data() {
    const abortable = useRef<AbortController>();
    const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getSummaryDataFromNotion()
    console.log(result)
      return result;
    },[],
    {abortable}
  );

    return (
      <Detail
        isLoading ={isLoading}
        markdown={getMarkDown(data)}
        actions={
          <ActionPanel>
            <Action title="exit" onAction={()=>{ 
              popToRoot()}
             } />
             <Action
             title='reload'
             onAction={()=>{revalidate()}}/>
          </ActionPanel>
        }
      />
    );
  }

  function getMarkDown(data:SummaryUIData|undefined):string{
    if(data==undefined) return ""
    let markdown:string = "## Today’s Data \n\n **"+
    data?.date+"**\n\n"
    data?.activityDataList.forEach((item)=>{
        markdown+=" ## worked **"+ item.todaysTotal+"** on `"+ item.activityTag 
        +"` \n\n > week total: **"+item.weekTotal +"**  \n\n > week average: **"+item.weekkyAverage+"** \n\n "+
        "--- \n\n"
    })
    return markdown 
  }