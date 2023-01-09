import { Action, ActionPanel, Icon, List, Form } from '@raycast/api'
import { useEffect, useState } from "react";
import { Client } from '@notionhq/client'
import { start } from './start';
import { getLastRowResponse } from './getLastRowResponse'; 

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

export default function Command() {
  const [nameError, setNameError] = useState<string | undefined>();
  const [contentText,setContentText] = useState("");
  const [entryStatus, setEntryStatus] = useState<boolean>();
  const [datetime, setDateTime] = useState<Date|null>();
  const [filteredTagList, filterTagList] = useState(items);
  const [searchTagText, setSearchTagText] = useState("");

  getLastRowResponse()

  async function check (){
    const result = await getLastRowResponse()
    setEntryStatus(result.isOpened)
    console.log(result.isOpened)
  };
  check()

  

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
