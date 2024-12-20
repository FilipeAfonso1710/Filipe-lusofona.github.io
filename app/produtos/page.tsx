'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProdutosCard from '@/components/ProdutosCard/ProdutosCard'

export default function Page() {

  // Hooks
  const [filteredData, setFilteredData] = useState<Produtos[]>([])
  const [search, setSearch] = useState("")

  // Função para passar a string da API para JSON
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  // Código para pegar os produtos na API
  const { data, error, isLoading } = useSWR<Produtos[], Error>('https://deisishop.pythonanywhere.com/products/', fetcher)

  //adicionar produtos ao carrinho
  const [cart, setCart] = useState<Produtos[]>([])

  // Atualizar array de produtos com os produtos da API e o search
  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredData(newFilteredData)
    }
  }, [search, data])

  useEffect(() => {
    (product: Produtos) => {
      setCart((prevCart) => [...prevCart, product]);

    }
  })


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
          
        />
      ))}
    </>
  )
}
