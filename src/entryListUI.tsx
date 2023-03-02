import { useEffect, useRef, useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { getEntryList } from "./getLastEntryDataFromNotion";

const items = ["Augustiner Helles", "Camden Hells", "Leffe Blonde", "Sierra Nevada IPA"];

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getEntryList()
      return result;
    },[],
    {abortable}
  );
  useEffect(() => {
    filterList(items.filter((item) => item.includes(searchText)));
  }, [searchText]);

  return (
    <List
      filtering={false}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Beers"
      searchBarPlaceholder="Search your favorite beer"
    >
      {data?.map((item) => (
        <List.Item
          key={item.id}
          title={item.comment}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => console.log(`${item} selected`)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}