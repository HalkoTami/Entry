import { useEffect, useRef, useState } from "react";
import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
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
        <List.Section title="Section 1">
        <List.Item title="Item 1" />
      </List.Section>
      <List.Section title="Section 2" subtitle="Optional subtitle">
        <List.Item title="Item 1" />
      </List.Section>
      {data?.map((item) => (
        <List.Item
          key={item.id}
          title={item.comment}
          subtitle="helllooooooooo"
          accessories={[
            { text: `An Accessory Text`, icon: Icon.Hammer },
            { text: { value: `A Colored Accessory Text`, color: Color.Orange }, icon: Icon.Hammer },
            { icon: Icon.Person, tooltip: "A person" },
            { text: "Just Do It!" },
            { date: new Date() },
            { tag: new Date() },
            { tag: { value: new Date(), color: Color.Magenta } },
            { tag: { value: "User", color: Color.Magenta }, tooltip: "Tag with tooltip" },
          ]}
          actions={
            <ActionPanel>
                <Action title="Edit" onAction={() => console.log(`${item} edited`)} />
                <Action title="Delete" onAction={() => console.log(`${item} deleted`)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}