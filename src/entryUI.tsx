import { Action, ActionPanel, Form ,LaunchProps,useNavigation} from '@raycast/api'
import { Data } from './summaryUI';
import { ReactNode, useRef, useState} from "react";
import { getLastEntryDataFromNotion, } from './getLastEntryDataFromNotion'; 
import { usePromise } from "@raycast/utils";
import { EntryValues } from './EntryValues';

export function Entry(pageId:string|undefined){
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getLastEntryDataFromNotion()
  
    if(result.openedRowData!=null){
      setTag(result.openedRowData.tag)
      setComment(result.openedRowData.comment)
    }  
      return result;
    },[],
    {abortable}
  );
  const [tag,setTag] =useState("");
  const [comment, setComment] = useState("")
  console.log("called")
  const { push } = useNavigation();
  const startDateTime = (newEntry:boolean|undefined) =>{
    if(newEntry==false) return (<Form.DatePicker 
    key={"Form.DatePicker"}
    id="startDateTime" 
    title={"start"} 
    defaultValue={data?.openedRowData?.start}
    />)
    
  }

  return (
    <Form 
      key={"form"}
      isLoading ={isLoading}
      actions={
      <ActionPanel
      key={"actionPanel"}
      >
        <Action.SubmitForm
        key={"Action.SubmitForm"}
          title={data?.submitTitle}
          onSubmit={(values: EntryValues) => {
              data?.doOnSubmit(values)
              if(data?.newEntry==false) push(<Data/>)
          }}
        />
        <Action
        title='data'
        onAction={()=> push(<Data/>)}
      />
      </ActionPanel>
    }>
    <Form.TextArea
        key={"Form.TextArea"}
        id="contentField"
        title={data?.contentTitle}
        value = {comment}
        onChange = {setComment}
      />
      <Form.Dropdown key={"Form.Dropdown"} id="tag" title="activity tag" value={tag}
      onChange ={setTag}
      >
        {data?.tagList.map((item:string)=>(
          <Form.Dropdown.Item key={"Form.Dropdown.Item"+item} value={item} title={item}  />
        ))}
      </Form.Dropdown>
      {startDateTime(data?.newEntry)}
       <Form.DatePicker 
       key={"Form.DatePicker"}
       id="dateTime" 
       title={data?.dateTitle}
       defaultValue={new Date()}
       />
       
    </Form>
    );
};

export default function Command(props: LaunchProps<{ draftValues: EntryValues }>) {
  return Entry(undefined)
}

