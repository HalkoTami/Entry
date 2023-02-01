import { Action, ActionPanel,Detail,popToRoot} from '@raycast/api'

export function Data() {
    const dataMd = `## Today’s Data

**2032/02/01**

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