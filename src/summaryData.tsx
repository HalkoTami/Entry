import { Action, ActionPanel,Detail,popToRoot} from '@raycast/api'
export function Data() {
    return (
      <Detail
        markdown="Pong"
        actions={
          <ActionPanel>
            <Action title="Pop" onAction={popToRoot} />
          </ActionPanel>
        }
      />
    );
  }