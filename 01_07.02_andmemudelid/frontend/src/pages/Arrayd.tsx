//rfce --> tab or enter
function Arrayd() {

      //const [count, setCount] = useState(0)  useState-i on vaja, sest ei kaotaks asju ära.
  const sonad = ["elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "bmw", "mudel": "M5", "aasta": 2022},
    {"mark": "audi", "mudel": "RS7", "aasta": 2020},
    {"mark": "mercedes", "mudel": "S klass", "aasta": 2021},
    {"mark": "toyota", "mudel": "Supra mk4", "aasta": 2000}
  ];

  return (
    <div className="arrayContainer">
        <h1>Array-d mis tehtud esimesel korral</h1>

        {/*     <div>{7+7}</div>
    <div>7+7</div>
    <div>{kogus}</div>
    <div>{count}</div> */}
    {sonad.map(sona =>
      <div key={sona}>
      {sona}
      </div> )}
    <br />
    <br/>
    {autod.map(auto => <div key={auto.mark+auto.mudel}>
      {auto.mark} - {auto.mudel} ({auto.aasta})
      </div> )}
      <br/>
      <div>SWAGGER kui tahta teada kõiki päringuid kuidas teha andmebaasi</div>
      <div>https://medium.com/@f.s.a.kuzman/using-swagger-3-in-spring-boot-3-c11a483ea6dc</div>
      <div>http://localhost:8080/swagger-ui/index.html</div>
      <div>https://www.npmjs.com/package/react-toastify</div>
      <div>https://firebase.google.com</div>
    </div>
  )
}

export default Arrayd