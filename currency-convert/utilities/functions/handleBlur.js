import {objectTrim} from "./trim";

export default function handleBlur(event, formik){
    const values = {...formik.values}
    const trimmedValues =  objectTrim(values);
    formik.handleBlur(event);
    formik.setValues(trimmedValues, true);
}
