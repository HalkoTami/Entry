import { Action, ActionPanel,  Form ,LaunchProps,environment} from '@raycast/api'
import { useRef, useState } from "react";
import { start } from './start';
import { getLastRowResponse } from './getLastRowResponse'; 
import { update } from './update';
import { getTagList, Tag } from './getTagList';
import { usePromise } from "@raycast/utils";
import { OpenedRowData } from './OpenedRowData';
import { LastRowResponse } from './LastRowResponse';
import { EntryValues, UiData } from './UiData';

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
    const result = await getLastRowResponse()
      return new UiData(await getTagList(),result);
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
    
          title={data?.switchSubmitTitle()}
          onSubmit={(values: EntryValues) => {
            data?.doOnSubmit(values)
          }}
        />
      </ActionPanel>
    }>
    <Form.TextArea
        key={"Form.TextArea"}
        id="contentField"
        title={data?.getContentTitle()}
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
      title={data?.getDateTitle()} 
      defaultValue={new Date()}
       />
    </Form>
    );
  
  

  
};

 export default function Command(props: LaunchProps<{ draftValues: EntryValues }>) {

  return Demo()
}
