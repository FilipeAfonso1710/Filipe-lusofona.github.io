import { Produtos } from '@/models/interface'
import React from 'react'
import Style from './ProdutosCard.module.css'
import Link from 'next/link'
import Image from 'next/image'

/*
<Image 
      src={image}
      alt="imagem do produto"
      width={70}
      height={70}
      />
*/


export default function ProdutosCard({id, title, price, description, image}:Produtos) {

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
    </article>
    </>
  }