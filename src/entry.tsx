import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { useEffect, useState } from "react";
import { Client } from '@notionhq/client'
import { start } from './start';

const items = [
  {
    title: '開発',
    matchingStrings:'kaihatsu'
  },
  {
    title: '日誌',
    matchingStrings:'nisshi'
  }
]
const token = 'secret_5NlCmKB8tpMouUNxZdlNo0sGaTNJg5HnVxPIgWXht45'
const databaseId = 'a260799631664f0d8d23e80cae917495'
const main = async () => {
    const notion = new Client({
		auth: token,
    })
      
    try {
        const response = await notion.pages.create({
          parent: { database_id: databaseId },
          properties: {
            "名前": { 
              title:[
                {
                  "text": {
                    "content": "hello"
                  }
                }
              ]
            }
          },
        })
        console.log(response)
        console.log("Success! Entry added.")
      } catch (error) {
        console.log("error")
      }
}

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [filteredList, filterList] = useState(items);

  useEffect(() => {
    filterList(items.filter((item) => item.matchingStrings.includes(searchText)));
  }, [searchText]);
  return (
    <List 
    filtering={false}
    onSearchTextChange={setSearchText}
    navigationTitle="Search Beers"
    searchBarPlaceholder="Search your favorite beer">
      {filteredList.map((item)=>(
        <List.Item
          key={item.title}
          icon={{ source: Icon.Link }}
          title={item.title}
          actions={
            <ActionPanel>
              <Action title='Select' onAction={()=>start(searchText)} />
            </ActionPanel>
          }
        />
      )
      )}
     
    </List>
  )
}