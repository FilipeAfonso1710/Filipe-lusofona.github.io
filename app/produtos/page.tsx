'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProdutosCard from '@/components/ProdutosCard/ProdutosCard'

export default function Page() {

  // Hooks
  const [filteredData, setFilteredData] = useState<Produtos[]>([])
  const [search, setSearch] = useState("")

  //adicionar produtos ao carrinho
  const [cart, setCart] = useState<Produtos[]>([])

  // Função para passar a string da API para JSON
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  // Código para pegar os produtos na API
  const { data, error, isLoading } = useSWR<Produtos[], Error>
    ('https://deisishop.pythonanywhere.com/products/', fetcher);


  // Atualizar array de produtos com os produtos da API e o search
  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredData(newFilteredData)
    }
  }, [search, data])

  //verificar se há artigos no carrinho
  useEffect(() => {
    const carrinhoLocalStorage = localStorage.getItem('cart')
    if (carrinhoLocalStorage) {
      setCart(JSON.parse(carrinhoLocalStorage));
    }

  }, []);

  //atualiza o localStorage com cada artigo adicionado ou retirado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const adicionarAoCarrinho = (product: Produtos) => {
    setCart((prevCart) => [...prevCart, product]);
  }

  const removerDoCarrinho = (id: string) =>{
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  //fun para comprar

  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map((product: Produtos) => product.id),
        name:"",
        student: false,
        coupon: ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response =>{
      if(!response.ok){
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((response) => {
      setCart([])
    }).catch(() => {
      console.log("erro ao comprar")
    })
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
          <button onClick={buy}>COMPRAR</button>
        </div>
      ))}
    </>
  )
}
