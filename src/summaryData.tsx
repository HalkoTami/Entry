import { Action, ActionPanel,Detail,popToRoot} from '@raycast/api'
import { usePromise } from '@raycast/utils';
import { useRef } from 'react';
import { getSummaryDataFromNotion } from './getSummaryDataFromNotion';

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
    const dataMd = `## Today’s Data

**`+ data?.date +`**

worked **1h 32min** on Raycast Extension

week average: **20min**`;
    return (
      <Detail
        markdown={dataMd}
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