import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { Client } from '@notionhq/client'

const items = [
  {
    title: 'Button',
    url: 'https://chakra-ui.com/docs/form/button',
  },
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
  return (
    <List searchBarPlaceholder="Filter by title...">
      {items.map((item) => (
        <List.Item
          key={item.title}
          icon={{ source: Icon.Link }}
          title={item.title}
          actions={
            <ActionPanel>
              <Action title='action' onAction={()=>main()} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}