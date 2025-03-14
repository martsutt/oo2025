import { useEffect, useState } from 'react'
import './App.css'
import { Category } from './models/Category';
import { Product } from './models/Product';

function App() {
  //const [count, setCount] = useState(0);
  const sonad = ["Elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "BMW", "mudel": "i5", "year": 2015}, // see ongi objekt
    {"mark": "Mercedes", "mudel": "i5", "year": 2019},
    {"mark": "Audi", "mudel": "i5", "year": 2012},
    {"mark": "Volkswagen", "mudel": "Golf", "year": 2009}
  ];

  // muutuja - HTML    muudab muutujat + HTMLi korraga   sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // uef -> nagu onload funktsioon
  useEffect(() => {
    fetch("http://localhost:8080/categories") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers, status code
        .then(json=> setKategooriad(json)) // body: sisu mida tagastab meile backend
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers, status code
        .then(json=> setProducts(json)) // body: sisu mida tagastab meile backend
  }, []);
  
  return (
    <>
    {/* <div>{7 + 7}</div>
    <div>7 + 7</div>
    <div>{kogus}</div>
    <div>{count}</div> */}
    {sonad.map(sona => 
     <div key={sona}>
       {sona}
     </div> )}
    <br />
    <br />
    {autod.map(auto => 
      <div key={auto.mark+auto.mudel}>
        {auto.mark} - {auto.mudel} ({auto.year})
      </div> )}
      <br />
      <br />
      {kategooriad.map(kategooria =>
      <div key={kategooria.id}>
        {kategooria.name} {kategooria.active}
      </div> )}
      <br />
      <br />
      {products.map(product =>
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>   {/*  ? küsimärk siin teeb nii et ta ei ürita tühja asja geneda */}
      </div> )}
    </>
  )
}

// key ={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderdused, 
// siis ta jätab kõik mällu v. a. tsükli sisud, sest tal pole mingit aimu, 
// mille järgi seda meelde jätta, selle jaoks et ta saaks meelde jätta, lisame key={}

export default App
