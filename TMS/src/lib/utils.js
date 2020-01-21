import {formatDateYYYMMDD} from '@/lib/tools'

export const JsonToString = ({data}) => {
  for (let key in data) {
    if (data[key] && (data[key].constructor == Array || data[key].constructor == Object)) {
      data[key] = JSON.stringify(data[key])
    }
    if (data[key] && data[key].constructor == Date) {
      data[key] = formatDateYYYMMDD({date: data[key]})
    }
  }
  return data
}


export const StringToJson = ({data}) => {
  for (let key in data) {
    if (data[key] && data[key].constructor == String) {
      if ((data[key].indexOf('[') == 0 && data[key].lastIndexOf(']') == data[key].length - 1)
        || (data[key].indexOf('{') == 0 && data[key].lastIndexOf('}') == data[key].length - 1)) {
        data[key] = JSON.parse(data[key])
      }
    }
  }
  return data
}



export const sleep=(time)=> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
