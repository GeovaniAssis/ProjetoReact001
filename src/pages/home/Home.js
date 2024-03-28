import { Titulo01 } from "./style";
import { useRef, useState } from "react";
import { v4 } from "uuid";

function App() {
  const inputRef = useRef();
  const [produtos, setProdutos] = useState([]);

  function botaoAdicionar() {
    setProdutos([{ id: v4(), value: inputRef.current.value }, ...produtos]);
    inputRef.current.value = "";
  }
  function deletarProduto(id) {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  }

  return (
    <div className="App container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <Titulo01>Lista de Compras</Titulo01>
        </div>

        <div className="col-md-10 col-12">
          <input placehouder="Adicione produto" ref={inputRef}></input>
        </div>
        <div className="col-md-2 col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={botaoAdicionar}
          >
            Adicionar
          </button>
        </div>

        <div className="col-12">
          <hr></hr>
        </div>

        <div className="col-12">
          <ul>
            {produtos.map((protudo) => (
              <li key={protudo.id}>
                {protudo.value}
                <button onClick={() => deletarProduto(protudo.id)}>🗑</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
