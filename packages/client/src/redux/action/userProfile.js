import { axiosInstance } from "../../library/api";
import qs from "qs"

export function userProfile(values, setSubmitting){
    return async function(dispatch){
        try {
            let body = {
                fullname: values.full_name,
                username: values.username,
                phone_number: phone_number,
                gender: values.gender,
                date_of_birth: values.date_of_birth
            }

            const bodyParsed = await qs.stringify(body)

            const res = await axiosInstance.patch(`/user/${values.id}`, bodyParsed)
            console.log(res)

            setSubmitting(false)
            
        } catch (err){
            console.log(err);
            setSubmitting(false);
        }
    }
}