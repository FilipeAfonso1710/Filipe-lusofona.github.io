import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import TecnologiasCard from '@/components/TecnologiasCard/TecnologiasCard';

export default function page() {
  
  return <> 
   {tecnologias.map((tecnologia: { title: string; description: string; rating: string; image: string; })=> (
         <TecnologiasCard
          key={tecnologia.title}
           title={tecnologia.title}
           description={tecnologia.description} 
           rating={tecnologia.rating}
            image={tecnologia.image} />
       ))}
  
  </>
}
