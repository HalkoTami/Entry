import { Client } from '@notionhq/client'
const token = 'secret_5NlCmKB8tpMouUNxZdlNo0sGaTNJg5HnVxPIgWXht45'
const databaseId = 'a260799631664f0d8d23e80cae917495'
export const start = async () => {
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