
export class SummaryUIData {
    date:string = Date().toString().slice(0,21)
    activityDataList:ActivityData[] 
    constructor(activityList:ActivityData[]){
        this.activityDataList = activityList
    }
}
export class ActivityData{
    activityTag:string
    todaysTotal:string
    weekkyAverage:string
    weekTotal:string
    constructor(tag:string,totalMin:number,weeklTotal:number){
        this.activityTag = tag
        this.todaysTotal = this.convertMinToString(totalMin)
        this.weekkyAverage = this.convertMinToString(Math.floor(weeklTotal/7))
        this.weekTotal = this.convertMinToString(weeklTotal)
    }
    private convertMinToString(min:number):string{
        const interger = Math.floor(min/60)
        const decimal = min-interger*60
        return interger.toString()+`h `+decimal.toString()+`min`
    }
}