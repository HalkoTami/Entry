import { SummaryUIData } from "./SummaryUIData";


export async function getSummaryDataFromNotion() :Promise<SummaryUIData>{
    return new Promise((resolve,reject)=>
      resolve(new SummaryUIData())
    )
}