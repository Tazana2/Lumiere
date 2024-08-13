import React, {useRef, useEffect} from 'react'
import './Content.css'
function Content({timeline}) {
    let h1 = useRef(null);
    let pText = useRef(null);
    let btn = useRef(null);
    useEffect(() => {
        timeline.from([h1.children, pText, btn], 1,{
            opacity: 0,
            y: "100",
            skewY: 10,
            stagger: {
                amount: .4
            }
        },"-=1")
    })
    return (
        <div>
            <div className="content">
                <h1 className="content-inner-bold" ref= {el=>h1=el}>
                    <div>Aprende y domina la Lengua de Señas Colombiana de manera fácil e interactiva. </div>
                </h1>
                <p ref= {el=>pText=el}>
                    <br/>
                Disfruta de un aprendizaje accesible, adaptado a tu ritmo y nivel, diseñado para ayudarte a conectar con las comunidades sordas de manera efectiva.

                </p>
                <button ref= {el=>btn=el}>
                    Registrarse
                </button>
            </div>
        </div>
    )
}

export default Content
