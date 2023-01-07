import { Action, ActionPanel, Icon, List, Form } from '@raycast/api'
import { useEffect, useState } from "react";
import { Client } from '@notionhq/client'
import { start } from './start';
import { on } from 'events';

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
var statusStart = true

// export default function Command() {
//   const [searchText, setSearchText] = useState("");
//   const [filteredList, filterList] = useState(items);

//   useEffect(() => {
//     filterList(items.filter((item) => item.matchingStrings.includes(searchText)));
//   }, [searchText]);
//   return (
//     <List 
//     filtering={false}
//     onSearchTextChange={setSearchText}
//     navigationTitle="Search Beers"
//     searchBarPlaceholder="Search your favorite beer">
//       {filteredList.map((item)=>(
//         <List.Item
//           key={item.title}
//           icon={{ source: Icon.Link }}
//           title={item.title}
//           actions={
//             <ActionPanel>
//               <Action title='Select' onAction={()=>start(searchText)} />
//             </ActionPanel>
//           }
//         />
//       )
//       )}
     
//     </List>
//   )
// }
export default function Command() {
  const [nameError, setNameError] = useState<string | undefined>();
  const [contentText,setContentText] = useState("");
  const [entryStatus, setEntryStatus] = useState(true);
  const [datetime, setDateTime] = useState<Date|null>();
  const [filteredTagList, filterTagList] = useState(items);
  const [searchTagText, setSearchTagText] = useState("");
  useEffect(() => {
    filterTagList(items.filter((item) => item.matchingStrings.includes(searchTagText)));
  }, [searchTagText]);

  function getDateTime():Date{
    if(datetime==null) return new Date()
    else return datetime
  }



  function getContentTitle () {
    if (entryStatus) {
        return String("doing");
    } 
    return String("done");
  };
  function getDateTitle () {
    if (entryStatus) {
        return String("Start");
    } 
    return String("End");
  };


  function dropNameErrorIfNeeded() {
    if (nameError && nameError.length > 0) {
      setNameError(undefined);
    }
  }
  function checkError(string:string|undefined){
    if (string?.length == 0) {
      setNameError("The field should't be empty!");
    } else {
      dropNameErrorIfNeeded();
    }
  }
  function onContentChange(string:string){
    checkError(string)
    setContentText(string)
  }
  return (
    <Form
    actions={
      <ActionPanel>
        <Action.SubmitForm
          onSubmit={()=>start(contentText,getDateTime())}
        />
      </ActionPanel>
    }>
      
      <Form.TextField
        id="contentField"
        title={getContentTitle()}
        error={nameError}
        onChange={onContentChange}
        onBlur={(event) => {
          checkError(event.target.value)
        }}
      />
      <Form.Dropdown id="tag" title="activity tag" defaultValue="lol"
      onSearchTextChange={setSearchTagText}>
        {filteredTagList.map((item)=>(
          <Form.Dropdown.Item value={item.title} title={item.title}  />
        ))}
      </Form.Dropdown>
      <Form.DatePicker 
      id="dateTime" 
      title={getDateTitle()} 
      defaultValue={new Date()}
      onChange={setDateTime} />
    </Form>
  )
}
