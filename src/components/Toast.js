import toast from "react-hot-toast";

export const SuccessToast = (message) => {
    return(
        toast.success(message,{
            style: {
                borderRadius: 5,
            }
        })
    )
}

export const FailureToast = (message) => {
    return(
        toast.error(message,{
            style: {
                borderRadius: 5,
            }
        })
    )
}

