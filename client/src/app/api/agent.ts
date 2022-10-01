import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { constants } from "buffer";
import { resolve } from "path";
import { title } from "process";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL="http://localhost:5000/api/";

//อนุญาตให้เข้าถึงคุกกี้ที่ browser ได้

axios.defaults.withCredentials = true;

const ResponseBoby = (response : AxiosResponse) => response.data

// set เวลาการส่งขอมูลให้ช้าเฉยๆ
// _ คือ resolve
const sleep = ()=> new Promise((_)=>setTimeout(_,200))

// ขอรอโหลดข้อมูล
axios.interceptors.response.use ( async response =>{
    // settimeout ให้ช้า
    await sleep()
    return response
},(error: AxiosError)=>{
    var data = error.response?.data //obj ที่ไม่รู้ชนิด
    var json= JSON.stringify(data) //เเปลงเป็น string
    var result =  JSON.parse(json) //แปลงเป็น object

    switch (result.status) {
        case 400:
            if (result.errors) {
                const modelStateErrors: string[] = [];
                for (const key in result.errors) {
                    if (result.errors[key]) {
                        modelStateErrors.push(result.errors[key])
                    }
                }
                //flat เอาไว้รวม arrays นะ
                //console.log(modelStateErrors.flat)
                throw modelStateErrors.flat();
            }
            toast.error(result.title)
            break;

        case 401:
            toast.error(result.title)
            break;

        case 404:
            toast.error(result.title)
            break;
        case 500:
            history.push('/server-error' , {state : data});
            toast.error(result.title)
            break;
    
        default:
            break;
    }
})

// ให้รู้จัก url
const requests = {
    get: (url : string)=>axios.get(url).then(ResponseBoby),
    // ? จะไม่ส่งก็ได้ เป็น ข้อมูลป่าวววววววววววๆๆๆ
    post: (url : string , boby?:{})=>axios.post(url,boby).then(ResponseBoby),
    delete: (url : string )=>axios.delete(url).then(ResponseBoby)
}
//ทำให้รู้จัก Get ของ  catalog
const Catalog = {
    list : ()=> requests.get("Product/GetProduct"),
    details: (id: number) => requests.get(`Product/GetProduct/${id}`)
}   

const Basket = {
    get : ()=> requests.get('basket'),
    addItem : (productId: number , quantity = 1 )=> requests.post(`basket/AddItemToBasket?productId=${productId}&quantity=${quantity}`),
    removeItem : (productId: number , quantity = 1 )=> requests.delete(`basket/AddItemToBasket?productId=${productId}&quantity=${quantity}`)
}

const TestErrors = { 
    get400Error: () => requests.get('buggy/GetBadRequest'),
    get401Error: () => requests.get('buggy/GetUnAuthorized'),
    get404Error: () => requests.get("Buggy/GetNotFound"),
    get500Error: () => requests.get('buggy/GetServerError'),
    getValidationError: () => requests.get('buggy/GetValidationError'),
    
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent