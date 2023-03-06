export function convertDateToString(date:Date):string{
    return setDateToJapanTime(date).toISOString()

}
export function convertStringToDate(dateString:string):Date{
    const date = new Date(dateString)
    return setDateToJapanTime(date)
    
}
export function  stringToDate(dateString:string):Date{
     return new Date(dateString)
}
function setDateToJapanTime(date:Date):Date{
    date.setTime(date.getTime() + (9*60*60*1000));
    return date
}
export function getThisWeeksMonday():Date{
    const monday = new Date().getTime() - new Date().getDate()*1000*3600*24
    return new Date(monday)
}
export function getDateStringWithoutTime(date:Date):string{
    return date.toISOString().slice(0,10)
}
export function getTimeDiffInMilli(date1:Date,date2:Date):number{
    return date2.getTime()-date1.getTime()
}
export function milliDurationToString(milli:number):string{
    const s = Math.floor(milli/1000%60)
    const m = Math.floor(milli/1000/60%60)
    const h = Math.floor(milli/1000/60/60%24)
    console.log(s)
    const checkPlace=(time:number) =>{
        if(time<10) return "0"+time.toString()
        else return time.toString()}
    return checkPlace(h)+":"+checkPlace(m)+":"+checkPlace(s)
}
export function getDurationInString(date1:Date,date2:Date):string{
    return milliDurationToString(getTimeDiffInMilli(date1,date2))
}