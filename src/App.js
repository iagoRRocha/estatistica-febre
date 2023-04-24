import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const firebaseConfig = {
  apiKey: "AIzaSyAU9M4vmhgSh6AEvJAgUKI5gHkFOv1dQRs",
  authDomain: "cadastro-febre.firebaseapp.com",
  projectId: "cadastro-febre",
  storageBucket: "cadastro-febre.appspot.com",
  messagingSenderId: "103418072873",
  appId: "1:103418072873:web:5d65fb617c4fc0a1183138",
  measurementId: "G-8JHT9MHPWF"
};

const firebaseApp = initializeApp(firebaseConfig);

async function armazenaResult() {

}

export const App = () => {

  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [temp, setTemp] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "user")

  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(userCollectionRef)
        console.log(data)
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        // console.log(data)
    }
    getUsers();
  }, []);

  async function criarUser() {
    if (name != "" && idade != "" && genero != "" && temp != "") {
      const user = await addDoc(userCollectionRef, {
        name, 
        idade,
        genero,
        temp
      });

      alert("Cadastro efetuado!")
      window.location.reload();
      console.log(user)
    } else {
      alert("Algum campo não está preenchido!")
    }
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
            <label id="lbN" for="">Nome</label>
          </div>

          <div id="lb-1">
            <input className="idade" type="text" id='idade' value={idade} onChange={(e) => setIdade(e.target.value)} required/>
            <label id="lbI" for="">Idade</label>
          </div>

          <div id="lb-1">
            <input className="genero" type="text" id='genero' value={genero} onChange={(e) => setGenero(e.target.value)} required/>
            <label id="lbG" for="">Genero</label>
          </div>

          <div id="lb-1">            
            <input className="temp" type="text" id='temp' value={temp} onChange={(e) => setTemp(e.target.value)} required/>
            <label id="lbT" for="">Temperatura</label>
          </div>

          <div className="botoes">
            <button id="b1" className="button" type="button">Enviar</button>
            <button id="b2" className="button" type="button" onClick={criarUser}>Ver resultado</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
