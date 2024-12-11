'use client'

import React from 'react'
import useSWR from 'swr'
import { Produtos } from '@/models/interface'
import ProdutosCard from '@/components/ProdutosCard/ProdutosCard'


export default function page() {

  //fun para passar a string da API para json
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  //Codigo para pegar os produtos na API
  const { data, error, isLoading } = useSWR<Produtos[], Error>('https://deisishop.pythonanywhere.com/products/', fetcher)
  if (error) return <div>Erro while loading</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>No data found :[</div>

  return <>
    {data.map(produto => (
      <ProdutosCard
        title={produto.title}
        description={produto.description} 
        id={''} 
        price={produto.price}
         image={produto.image} />
    ))}
  </>
}
