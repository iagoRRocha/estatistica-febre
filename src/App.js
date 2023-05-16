import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, addDoc, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAU9M4vmhgSh6AEvJAgUKI5gHkFOv1dQRs",
  authDomain: "cadastro-febre.firebaseapp.com",
  projectId: "cadastro-febre",
  storageBucket: "cadastro-febre.appspot.com",
  messagingSenderId: "103418072873",
  appId: "1:103418072873:web:5d65fb617c4fc0a1183138",
  measurementId: "G-8JHT9MHPWF"
});

export const App = () => {

  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [temp, setTemp] = useState("");
  const [users, setUsers] = useState([]);
  const [dados, setDados] = useState([]);
  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users")
  const dadoCollectionRef = doc(db, "dados", "tipo")
  var masculino = 0
  var feminino = 0
  var febre = 0
  var semfebre = 0
  var crianca = 0
  var criancaf = 0
  var adulto = 0
  var adultof = 0
  var idoso = 0
  var idosof = 0


  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(userCollectionRef)
        // console.log(data)
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        // console.log(data)
    }
    getUsers();
  }, []);



  async function criarUser() {
    if (name !== "" && idade !== "" && genero !== "" && temp !== "") {
      genero.toLowerCase();
      const user = await addDoc(userCollectionRef, {
        name, 
        idade,
        genero,
        temp
      });

      alert("Cadastro efetuado!")
      // window.location.reload();
      console.log(user)
    } else {
      alert("Algum campo não está preenchido!")
    }
  }

  async function calcResultados() {
    await users.map(user => {
      if (user.idade <= 18) {
        if (user.temp > 35 && user.temp <= 37.5) {
          semfebre += 1
          crianca += 1
        } else if (user.temp > 37.5) {
          febre += 1
          criancaf += 1
        }

      } else if (user.idade > 18 && user.idade < 60) {
        if (user.temp >35 && user.temp <= 37.5) {
          semfebre += 1
          adulto += 1
        } else if (user.temp > 37.5) {
          febre += 1
          adultof += 1
        }

      } else if (user.idade >= 60) {
        if (user.temp >35 && user.temp <= 37.5) {
          semfebre += 1
          idoso += 1
        } else if (user.temp > 37.5) {
          febre += 1
          idosof += 1
        }

      }

      if (user.genero === 'Masculino' || user.genero === 'masculino') {
        masculino += 1
      } else if (user.genero === 'Feminino' || user.genero === 'feminino') {
        feminino += 1
      }

    });

    console.log(masculino, feminino, febre, semfebre, crianca,criancaf, adulto, adultof, idoso, idosof)

    const dado = await setDoc(dadoCollectionRef, {
      adulto,
      adultof,
      crianca,
      criancaf,
      febre,
      feminino,
      idoso,
      idosof,
      masculino,
      semfebre
    }).then(() => {
      masculino = 0
      feminino = 0
      febre = 0
      semfebre = 0
      crianca = 0
      criancaf = 0
      adulto = 0
      adultof = 0
      idoso = 0
      idosof = 0
    });



  }

  async function mostrarResultado() {
    calcResultados()

    // const tabela = getDoc(dadoColectionRef)
    // console.log(tabel
    console.log('passou')
  }

  return (
    <div>
      <header className="header">
        <h3>Iago Rodrigues</h3>

        <FaGithub size={25}/>
      </header>

      <main className="main">
        <div className="caixa">

          <h1>Cadastro</h1>

          <div id="lb-1">
            <input className="nome" type="text" id='nome' value={name} onChange={(e) => setName(e.target.value)} required/>
            <label id="lbN">Nome</label>
          </div>

          <div id="lb-1">
            <input className="idade" type="text" id='idade' value={idade} onChange={(e) => setIdade(e.target.value)} required/>
            <label id="lbI">Idade</label>
          </div>

          <div id="lb-1">
            <input className="genero" type="text" id='genero' value={genero} onChange={(e) => setGenero(e.target.value)} required/>
            <label id="lbG">Genero</label>
          </div>

          <div id="lb-1">            
            <input className="temp" type="text" id='temp' value={temp} onChange={(e) => setTemp(e.target.value)} required/>
            <label id="lbT">Temperatura</label>
          </div>

          <div className="botoes">
            <button id="b1" className="button" onClick={criarUser}>Enviar</button>
            <button id="b2" className="button" onClick={mostrarResultado}>Ver resultado</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
