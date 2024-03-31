import { Titulo01 } from "./style";
import { useRef, useState, useEffect } from "react";
import { v4 } from "uuid";
import Cookies from "js-cookie";

function App() {
  const inputRef = useRef();
  const [produtos, setProdutos] = useState([]);

  function botaoAdicionar(event) {
    event.preventDefault();
    if (inputRef.current.value.trim().length < 2) {
      alert("Por favor, digite no mínimo 2 caracteres.");
      return;
    }
    const newProduto = { id: v4(), value: inputRef.current.value };
    const sortedProdutos = [...produtos, newProduto].sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    setProdutos(sortedProdutos);
    inputRef.current.value = "";
    Cookies.set("produtos", JSON.stringify(sortedProdutos));
  }
  function deletarProduto(id) {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  }
  useEffect(() => {
    const savedProdutos = Cookies.get("produtos");
    if (savedProdutos) {
      setProdutos(JSON.parse(savedProdutos));
    }
  }, []);

  return (
    <div className="App">
      <div id="tituloDaPagina" className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <Titulo01>Lista de Compras</Titulo01>
          </div>
        </div>
      </div>

      <div className="container">
        <form className="row">
          <div className="col-md-10 col-8 ">
            <input
              placeholder="Adicione o produto aqui..."
              ref={inputRef}
            ></input>
          </div>
          <div className="col-md-2 col-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={botaoAdicionar}
            >
              Adicionar
            </button>
          </div>
        </form>

        <div className="row">
          <div className="col-12">
            <hr></hr>
          </div>

          {produtos.map((protudo) => (
            <div className="col-lg-4 col-md-6 col-12">
              <div className="itemName" key={protudo.id}>
                {protudo.value}
                <button onClick={() => deletarProduto(protudo.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
