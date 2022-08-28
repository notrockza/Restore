import React, { useEffect, useState } from 'react'
import { Product } from '../../app/models/Product'
import ProductList from './ProductList'
//rfc

export default function Catalog() {
      // อ่าน      //กำหนดค่า
const [products , setProducts] = useState<Product[]>([])

useEffect(() => {
  console.log("test")
  //first ทำงานก่อนเป็นลำดับเเรก
  fetch('http://localhost:5000/api/Product/GetProduct')
  //เข้ามาเเล้วจะเป็นอะไรซักอย่าง ต้องเเปลงเป็น json
  .then((response)=>response.json())
  .then((data)=> setProducts(data))
  .catch((error)=>console.log(error))
  //second จะทำงานหลังจากที่ ออกจาก catalog

  //ทำงานรอบเดียวไม่ต้องใส่
}, [])

  return (
    <>
    <ProductList products={products}/>
    </>

  )
}
