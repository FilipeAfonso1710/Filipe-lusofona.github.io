import React, { useState } from 'react'
import Style from './ProdutosCard.module.css'
import Image from 'next/image'


export default function ProdutosCard({title, price, description, image}:Produtos) {
  
    return <>

      <article className={Style.article}>
      <p className={Style.p}>{title}</p>
      <a className={Style.descricao}>{description}</a>
      <Image className={Style.image} 
      src={image}
      alt="imagem do produto"
      width={150}
      height={150}
      />
      <p className={Style.p}>Preço: {price}€</p>
      <button>Adicionar ao carrinho</button>
    </article>
    </>
  }