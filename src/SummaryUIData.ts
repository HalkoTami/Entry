export class SummaryUIData {
    date:String = Date()
    activityDataList:ActivityData[] 
    constructor(activityList:ActivityData[]){
        this.activityDataList = activityList
    }
}
export class ActivityData{
    activityTag:string
    todaysTotal:string
    weekkyAverage:string
    constructor(tag:string,totalMin:number,weeklTotal:number){
        this.activityTag = tag
        this.todaysTotal = this.convertMinToString(totalMin)
        this.weekkyAverage = this.convertMinToString(weeklTotal/7)
    }
    private convertMinToString(min:number):string{
        const interger = Math.floor(min/60)
        const decimal = min-interger*60
        return interger.toString()+`h `+decimal.toString()+`min`
    }
}