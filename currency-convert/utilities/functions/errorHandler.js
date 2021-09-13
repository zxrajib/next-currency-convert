import axios from "axios";

export default function ErrorHandler({err,msgRef=false, setFieldError=false, enqueueSnackbar = false}){
    if(err.response && err.response.data){
        if(err.response.data.error){
            const error = err.response.data.error;
            if(error.fields.count > 0){
                // errors list array to object
                const errorsList = {}
                if(setFieldError !== false){
                    error.fields.errors.forEach((ele)=>{
                        setFieldError(ele.field, ele.message)
                    })
                }
            }else if(error.systems.count > 0){
                const message = error.systems.errors[0].message;
                if(msgRef!==false){
                    msgRef.current.error( message );
                }else if(enqueueSnackbar !== false){
                    enqueueSnackbar(message,{variant: 'error'});
                }
            }else{
                const message = 'Failed. Please try again!';
                if(msgRef!==false){
                    msgRef.current.error(message);
                }else if(enqueueSnackbar !== false){
                    enqueueSnackbar(message,{variant: 'error'});
                }
            }
        }else{
            const message = 'Failed. Please try again!';
            if(msgRef!==false){
                msgRef.current.error(message);
            }else if(enqueueSnackbar !== false){
                enqueueSnackbar(message,{variant: 'error'});
            }
        }
    }else{

        if (!axios.isCancel(err) && err.message ==='Network Error') {
            const message = 'Maybe you are offline. Please Try again!';
            if(msgRef!==false){
                msgRef.current.error(message);
            }else if(enqueueSnackbar !== false){
                enqueueSnackbar(message,{variant: 'error'});
            }
        }else{
            const message = 'Failed. Please try again!';
            if(msgRef!==false){
                msgRef.current.error(message);
            }else if(enqueueSnackbar !== false){
                enqueueSnackbar(message,{variant: 'error'});
            }
        }
    }
}
