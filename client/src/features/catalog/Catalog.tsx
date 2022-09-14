import axios from 'axios'
import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { Product } from '../../app/models/Product'
import ProductList from './ProductList'
//rfc

export default function Catalog() {
      // อ่าน      //กำหนดค่า
const [products , setProducts] = useState<Product[]>([])
const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("test")
  agent.Catalog.list()
  //first ทำงานก่อนเป็นลำดับเเรก
  
  //หลังจากที่ใช้ agent.Catalog.list() เเล้ว axios ลบไปเลย => 
  // axios("http://localhost:5000/Product/GetProduct")

  //เข้ามาเเล้วจะเป็นอะไรซักอย่าง ต้องเเปลงเป็น json
  //.then((response)=>response.json())

  //response.data อย่าลืมลบ data ด้วย
  .then((response : any)=> setProducts(response))
  .catch((error)=>console.log(error))
  .finally(()=>setLoading (false))
  //finally ไม่ว่าจะทำอะไรมาต้องจย
  //second จะทำงานหลังจากที่ ออกจาก catalog

  //ทำงานรอบเดียวไม่ต้องใส่
}, [])
if (loading) return <LoadingComponent message="Loading Products....." />;
  return (
    <>
    <ProductList products={products}/>
    </>

  )
}
