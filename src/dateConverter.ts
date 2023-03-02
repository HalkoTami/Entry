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