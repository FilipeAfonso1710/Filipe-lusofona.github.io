import  {Tecnologias}  from '@/models/interfaceTec'
import React from 'react'
import Style from './TecnologiasCard.module.css'
import Image from 'next/image'


export default function TecnologiasCard({title, rating, description, image}: Tecnologias) {

    return <>
      <article className={Style.article}>

      <p className={Style.p}>{title}</p>
      <Image className={Style.image} 
      src={image}
      alt="imagem do produto"
      width={200}
      height={150}
      />
      <a className={Style.descricao}>{description}</a>
      <p className={Style.p}>{rating}</p>
    </article>
    </>
  }