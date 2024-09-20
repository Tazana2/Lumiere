import React from 'react';
import { useState, useEffect } from "react"

import "../styles/Dictionary.css"

const Dictionary = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.card'); // Selecciona todas las tarjetas
    
        cards.forEach((card) => {
          const video = card.querySelector('.card__video');
    
          card.addEventListener('mouseenter', () => {
            video.play(); // Reproduce el video al hacer hover
          });
    
          card.addEventListener('mouseleave', () => {
            video.pause(); // Pausa el video al quitar el mouse
            video.currentTime = 0; // Reinicia el video al principio
          });
        });
      }, []);
    
  
    return (
      <section className="hero-section">
        <div className="card-grid">
            <a className="card" href="#">
            <div className="card__background">
                <video className="card__video" loop muted>
                <source src="https://educativo.insor.gov.co/wp-content/uploads/2020/11/01-Amor-Palabra-1.m4v" type="video/mp4" />
                Tu navegador no soporta la etiqueta video.
                </video>
            </div>
            <div className="card__content">
                <p className="card__category">SEÑA</p>
                <h3 className="card__heading">Amor</h3>
            </div>
            </a>

            <a className="card" href="#">
            <div className="card__background">
                <video className="card__video" loop muted>
                <source src="https://educativo.insor.gov.co/wp-content/uploads/2020/11/Enfermo-Palabra-21.mp4" type="video/mp4" />
                Tu navegador no soporta la etiqueta video.
                </video>
            </div>
            <div className="card__content">
                <p className="card__category">SEÑA</p>
                <h3 className="card__heading">Enfermo</h3>
            </div>
            </a>

            <a className="card" href="#">
            <div className="card__background">
                <video className="card__video" loop muted>
                <source src="https://educativo.insor.gov.co/wp-content/uploads/2020/12/01-Enamorado-Palabra-1.m4v" type="video/mp4" />
                Tu navegador no soporta la etiqueta video.
                </video>
            </div>
            <div className="card__content">
                <p className="card__category">SEÑA</p>
                <h3 className="card__heading">Enamorado</h3>
            </div>
            </a>

            <a className="card" href="#">
                <div
                    className="card__background"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`
                    }}
                ></div>
                <div className="card__content">
                    <p className="card__category">SEÑA</p>
                    <h3 className="card__heading">Amor</h3>
                </div>
            </a>
            <a className="card" href="#">
                <div
                    className="card__background"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1556680262-9990363a3e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`
                    }}
                ></div>
                <div className="card__content">
                    <p className="card__category">Category</p>
                    <h3 className="card__heading">Example Card Heading</h3>
                </div>
            </a>
            <a className="card" href="#">
                <div
                    className="card__background"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1557004396-66e4174d7bf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`
                    }}
                ></div>
                <div className="card__content">
                    <p className="card__category">Category</p>
                    <h3 className="card__heading">Example Card Heading</h3>
                </div>


            </a>
            <a className="card" href="#">
                <div
                    className="card__background"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1557004396-66e4174d7bf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`
                    }}
                ></div>
                <div className="card__content">
                    <p className="card__category">Category</p>
                    <h3 className="card__heading">Example Card Heading</h3>
                </div>


            </a>
                


            </div>
    </section>
  );
};

export default Dictionary;
