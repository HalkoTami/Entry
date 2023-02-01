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

const newMd = getMarkDown(data)
    return (
      <Detail
        markdown={newMd}
        actions={
          <ActionPanel>
            <Action title="Pop" onAction={popToRoot} />
          </ActionPanel>
        }
        metadata={
            <Detail.Metadata>
                
            </Detail.Metadata>
        }
      />
    );
  }

  function getMarkDown(data:SummaryUIData|undefined):string{
    let markdown:string = "## Today’s Data \n\n **"+
    data?.date+"**\n\n"
    data?.activityDataList.forEach((item)=>{
        markdown+=" ## worked **"+ item.todaysTotal+"** on `"+ item.activityTag 
        +"` \n\n > week average: **"+item.weekkyAverage+"** \n\n --- \n\n"
    })
    return markdown 
  }