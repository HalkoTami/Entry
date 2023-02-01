
export async function getSummaryDataFromNotion() :Promise<>{
    return new Promise((resolve,reject)=>
      resolve(new SummaryUIData())
    )
}