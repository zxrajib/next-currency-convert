export function arrayTrim(items){
    for(let item in items){
        if(typeof items[item] === "string"){
            items[item] = items[item].trim();
        }else if(Array.isArray(items[item])){
            items[item] = arrayTrim(items[item])
        }else if(Array[item] !== null && typeof items[item]=== 'object'){
            items[item] = objectTrim(items[item])
        }
    }
    return items;
}
export function objectTrim(obj){
    Object.keys(obj).forEach(ele=>{
        if(typeof obj[ele]=== 'string'){
            obj[ele] = obj[ele].trim();
        }else if(Array.isArray(obj[ele])){
            obj[ele] = arrayTrim(obj[ele])
        }else if(obj[ele] !== null && typeof obj[ele]=== 'object'){
            obj[ele] = objectTrim(obj[ele])
        }
    })
    return obj;
}
