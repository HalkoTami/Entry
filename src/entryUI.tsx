import { Action, ActionPanel, Form ,LaunchProps,useNavigation,} from '@raycast/api'
import { Data } from './summaryUI';
import { ReactNode, useEffect, useRef, useState} from "react";
import { getLastEntryDataFromNotion, getTagList, } from './getLastEntryDataFromNotion'; 
import { usePromise } from "@raycast/utils";
import { EntryValues } from './EntryValues';
import { getDurationInString } from './dateConverter';
import { EntryList } from './entryListUI';
import { updatePage } from './sendDataToNotion';



export function Entry(pageId:string|undefined){
  
  const abortable = useRef<AbortController>();
  const { isLoading, data, revalidate } = usePromise(
    async () => {
    const result = await getLastEntryDataFromNotion(pageId)
    
    const entryData = result.openedRowData
   
    const start = ()=>{
      if(entryData==undefined) 
      return new Date()
      else return entryData.start
    } 

    const endDate = ()=>{
      if(entryData?.end!=undefined)
      return entryData.end
      else return new Date()
    }
    setStartDateTime(start())
    setEndDateTime(endDate())
    if(entryData==null) {
      return result
    }
    
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
  const [duration,setDuration] = useState("")
  const [startDateTime,setStartDateTime] = useState<Date|null>(new Date())
  const [endDateTime,setEndDateTime] = useState<Date|null>(null)
  useEffect(() => {
    if(startDateTime!=null&&endDateTime!=null)
    setDuration(getDurationInString(startDateTime,endDateTime));
  }, [startDateTime,endDateTime]);
  
  console.log("called")
  const { push } = useNavigation();
  const startDateTimeUI = () =>{
    if(data==undefined) return
    return (<Form.DatePicker 
    key={"Form.DatePickerStart"}
    id="startDateTime" 
    title={"start"} 
    defaultValue={startDateTime}
    onChange={setStartDateTime}
    />)
  }
  const endDateTimeUI = ()=>{
    if(data?.openedRowData==undefined) return
    const endDate = ()=>{
      if(data?.openedRowData?.end==undefined)
      return new Date()
      else return data?.openedRowData?.end
    }
    return (<Form.DatePicker 
      key={"Form.DatePickerEnd"}
      id="endDateTime" 
      title={"End"} 
      defaultValue={endDateTime}
      onChange={setEndDateTime}
      />)
  }
  const action= async(values: EntryValues)=>{
    const end = data?.openedRowData?.end
    const isopened = data?.openedRowData?.isOpened == true
    if(end==undefined&&isopened){
        values.endDateTime = null
    }
    await data?.doOnSubmit(values)
        push(<EntryList/>)
  }
  const updateUI = ()=>{
    if(data?.openedRowData != undefined)
    return (
      <Action.SubmitForm
        key={"Action.SubmitForm"}
          title="update"
          shortcut={{ modifiers: ["cmd"], key: "u" }}
          onSubmit={(values: EntryValues) => {
            action(values)
          }}
        />
    )
  }

  return (
    <Form 
      navigationTitle='2014'
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
              action(values)
          }}
        />
       {updateUI()}
        
      </ActionPanel>
    }>
         <Form.Description
      title="Duration"
      text={duration}
      />
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
      {startDateTimeUI()}
      {endDateTimeUI()}
    
       
    </Form>
    );
};

export default function Command(props: LaunchProps<{ draftValues: EntryValues }>) {
  return Entry(undefined)
}

