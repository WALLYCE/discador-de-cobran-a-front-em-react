import react from "react";
import { Component } from "react/cjs/react.development";
import digiteRamal from '../imagens/digite.png'
import entrarRamal from '../imagens/entrar.png'
import phone from '../imagens/phone.png'
import atendente from '../imagens/atendente.png'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const navigate = useNavigate();
    function handle(e){
        e.preventDefault();
        navigate('/cliente', {state:{
        ramal : ramal}}
        );
  
       
    }

        const [ramal, setRamal] = useState();

        return(
            
             <div className="container">
                 <div className="container">
                 <h1 className="text-center" style={{color: 'white'}}>Cobrança automática</h1>
                 <div className="container mb-5 mt-5">
                 <h2 className="text-center" style={{color: 'white'}}>Tutorial</h2>
                 <div className="row mt-5">
                     <div className="col-md-3 border border-light text-center" style={{color: 'white'}}><h5>Digite seu ramal </h5>
                     <img src={digiteRamal} class="img-fluid"></img></div>
                     <div className="col-md-3 border border-light text-center" style={{color: 'white'}}><h5>Clique em entrar</h5>
                     <img src={entrarRamal} class="img-fluid"></img></div>
                     <div className="col-md-3 border border-light text-center" style={{color: 'white'}}><h5>Logue na Fila <br/> <br/>
                     Digite 2888 em seu ramal, em seguida informe seu número de ramal e sua Senha</h5></div>
                     <div className="col-md-3 border border-light text-center" style={{color: 'white'}}><h5>Atenda as Ligações</h5>
                     <img src={atendente} class="img-fluid" style={{width: '350px', height: '150px'}}></img></div>
                 </div>

                 </div>
                    <form onSubmit={handle}>                  
                    <div className="d-flex justify-content-center"> 
                        <div className="mb-3" style={{width: "25%"}}>
                        <h4 className="text-center" style={{color: 'white'}}>Ramal</h4>
                        <input onChange={(e) =>setRamal(e.target.value)} type="text" class="form-control text-center" id="input_ramal"/>
                       </div>
                    
                    </div>
                    <div className="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary center">Entrar</button>
                    </div>
                    </form>

                                </div>
                                </div>
        )


    
       
    

}
export default Login;