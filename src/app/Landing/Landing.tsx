'use client'

//Imports
import Menu from '@/app/Landing/Menu'
import Slides from './Slides'
import Metodo from './Metodo'
import Depoimentos from './Depoimentos'
import ComoFunciona from './ComoFunciona'
import Time from './Time'

export default function Landing(){
    return(
        <div>
            <Menu />
            <Slides />
            <Metodo />
            <Depoimentos />
            <ComoFunciona />
            <Time />
        </div>
    )
}