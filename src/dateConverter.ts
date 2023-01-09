export function convertDateToString(date:Date):string{
    return setDateToJapanTime(date).toISOString()

}
export function convertStringToDate(dateString:string):Date{
    const date = new Date(dateString)
    return setDateToJapanTime(date)
    
}
function setDateToJapanTime(date:Date):Date{
    date.setTime(date.getTime() + (9*60*60*1000));
    return date
}