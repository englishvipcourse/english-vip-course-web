'use client'

//Imports
import Menu from '@/app/Landing/Menu'
import Slides from './Slides'
import Metodo from './Metodo'
import Depoimentos from './Depoimentos'
import ComoFunciona from './ComoFunciona'
import Time from './Time'
import ComparisonTable from './Comparacao'
import Agendar from './Agendar'
import Footer from './Footer'

export default function Landing(){
    return(
        <div>
            <Menu />
            <Slides />
            <Metodo />
            <Depoimentos />
            <ComoFunciona />
            <Time />
            <ComparisonTable />
            <Agendar />
            <Footer />
        </div>
    )
}