import { Action, ActionPanel,  Form ,LaunchProps,environment} from '@raycast/api'
import { useRef, useState } from "react";
import { getUIDataFromNotion } from './getUIDataFromNotion'; 
import { usePromise } from "@raycast/utils";
import { EntryValues } from './EntryValues';

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




const Demo = () => {
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getUIDataFromNotion()
      return result;
    },[],
    {
      abortable,
    }
  );
  
  console.log("called")
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
          }}
        />
      </ActionPanel>
    }>
    <Form.TextArea
        key={"Form.TextArea"}
        id="contentField"
        title={data?.contentTitle}
        value = {data?.openedRowData?.comment}
      />
      <Form.Dropdown key={"Form.Dropdown"} id="tag" title="activity tag" defaultValue={data?.openedRowData?.tag}>
        {items.map((item)=>(
          <Form.Dropdown.Item key={"Form.Dropdown.Item"+item.title} value={item.title} title={item.title}  />
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

  return Demo()
}
