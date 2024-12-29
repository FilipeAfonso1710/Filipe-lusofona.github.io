'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProdutosCard from '@/components/ProdutosCard/ProdutosCard'

export default function Page() {

  // Hooks
  const [filteredData, setFilteredData] = useState<Produtos[]>([])
  const [search, setSearch] = useState("")

  // Estado para o carrinho
  const [cart, setCart] = useState<Produtos[]>([])

  // Função para passar a string da API para JSON
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  // Código para pegar os produtos na API
  const { data, error, isLoading } = useSWR<Produtos[], Error>(
    'https://deisishop.pythonanywhere.com/products/',
    fetcher
  );

  // Atualizar array de produtos com os produtos da API e o search
  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredData(newFilteredData)
    }
  }, [search, data])

  // Verificar se há artigos no carrinho no localStorage
  useEffect(() => {
    const carrinhoLocalStorage = localStorage.getItem('cart')
    if (carrinhoLocalStorage) {
      setCart(JSON.parse(carrinhoLocalStorage));
    }
  }, []);

  // Atualiza o localStorage com cada artigo adicionado ou retirado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Função para adicionar produtos ao carrinho
  const adicionarAoCarrinho = (product: Produtos) => {
    setCart((prevCart) => [...prevCart, product]);
  }

  // Função para remover produtos do carrinho
  const removerDoCarrinho = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  // Função para realizar a compra
  const buy = () => {
    if (cart.length === 0) {
      console.error("O carrinho está vazio");
      return;
    }

    fetch("https://deisishop.pythonanywhere.com/buy/", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map((product: Produtos) => Number(product.id)), // IDs como números
        name: "", // Ajuste para o nome real ou dinâmico
        student: false, // Ajuste para o valor correto
        coupon: "", // Ajuste para o cupom correto ou deixe em branco
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      alert("Compra realizada com sucesso:"),
        alert(JSON.stringify(data, null, 2));
      setCart([]); // Limpa o carrinho após a compra
    }).catch((error) => {
      console.error("Erro ao comprar:", error);
    });
  }

  return (
    <>
      <input
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <div>Erro while loading</div>}
      {isLoading && <div>Loading...</div>}
      {!data && <div>No data found :[</div>}

      {filteredData.map(produto => (
        <ProdutosCard
          key={produto.id}
          title={produto.title}
          description={produto.description}
          id={produto.id}
          price={produto.price}
          image={produto.image}
          adicionarCarrinho={() => adicionarAoCarrinho(produto)}
        />
      ))}

      <h2>Carrinho:</h2>
      {cart.length === 0 && <div>O carrinho está vazio.</div>}
      {cart.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={item.image}
            alt={`Imagem do produto ${item.title}`}
            width={50}
            height={50}
            style={{ marginRight: '10px' }}
          />
          <div>
            <p>{item.title}</p>
            <p>Preço: {item.price}€</p>
            <button onClick={() => removerDoCarrinho(item.id)}>Retirar</button>
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <button onClick={buy}>COMPRAR</button>
      )}
    </>
  )
}
