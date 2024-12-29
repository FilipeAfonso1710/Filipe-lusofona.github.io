import Style from './ProdutosCard.module.css'
import Image from 'next/image'

type ProdutosCardProps = Produtos & {
  adicionarCarrinho: () => void;
};

export default function ProdutosCard({


  title,
  price,
  description,
  image,
  adicionarCarrinho,
}: ProdutosCardProps) {
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
      <button onClick={adicionarCarrinho}>Adicionar ao carrinho</button>
    </article>
  </>
}