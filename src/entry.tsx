import { Action, ActionPanel, Form ,LaunchProps,useNavigation} from '@raycast/api'
import { Data } from './summaryData';
import { useRef, useState} from "react";
import { getUIDataFromNotion } from './getUIDataFromNotion'; 
import { usePromise } from "@raycast/utils";
import { EntryValues } from './EntryValues';

const Entry = () => {
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getUIDataFromNotion()
    if(result.openedRowData!=null){
      setTag(result.openedRowData.tag)
      setComment(result.openedRowData.comment)
    }
      console.log("called")
      return result;
    },[],
    {abortable}
  );
  const [tag,setTag] =useState("");
  const [comment, setComment] = useState("")
  console.log("called")
  const { push } = useNavigation();
  
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
  return Entry()
}

