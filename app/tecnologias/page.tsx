import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import ProdutosCard from '@/components/ProdutosCard/ProdutosCard';

export default function page() {
  
  return <> 
   {tecnologias.map((tecnologia: { title: string; description: string; rating: string; image: string; })=> (
         <ProdutosCard
           title={tecnologia.title}
           description={tecnologia.description} 
           id={''} 
           price={tecnologia.rating}
            image={tecnologia.image} />
       ))}
  )
  </>
}
