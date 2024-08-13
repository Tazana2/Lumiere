import React, {useRef, useEffect} from 'react';
import './Images.css';

function Images({timeline, ease}) {
    let image1 = useRef(null);

    useEffect(() => {
        timeline.from(image1, 1.2, {
            y: 1200,
            ease: ease,
            opacity: 0
        }, "-=1")
        .from(image1, 2, {
            scale: 1.6,
            ease: ease
        }, "-=1.2");
    }, [timeline, ease]);

    return (
        <div className="images">
            <div className="box-center" ref={el => image1 = el}></div>
        </div>
    );
}

export default Images;
