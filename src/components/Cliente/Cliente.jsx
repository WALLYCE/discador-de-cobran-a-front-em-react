import qs from 'qs'
import "./style.css"
import io from 'socket.io-client'
import React from "react";
import $ from 'jquery'
import api from '../../api'
import { useLocation } from "react-router-dom";

var estado = 0;
const socket = io('localhost:3000');
//const ligar =  io('localhost:3005');
var ramal;
var status=0;
var contador =0;
var login = false;
var clientes_restantes;

function religar(){
    if(status===1){
       console.log('entrei no religar, fazendo a requisicao ao servidor');
       api.get('/discar');
      
    }
}
var temporizador = setInterval(religar,45000);


socket.on('status', async (event) => {   
    
    if(event.queue === "appcobranca"){
        
    if(event.status === "1" && event.membername === "Agent/"+ramal){//agent disponível
        clearInterval(temporizador);
        $("#disponivel").css({"background-color":"green"});
        $("#chamada").css({"background-color":"white"});
        console.log("fazendo requisicao ao servidor : "+ contador)
        await api.get('/discar');
         $('#nome_cliente').val("");
         $('#endereco_cliente').val("");
         $('#cidade_cliente').val("");
         $('#cpf_cliente').val("");
         $('#telefone_cliente').val("")
         $('#telefone2_cliente').val("")
         $('#plano_cliente').val("")
         $('#faturas_cliente').val("")
         $('#cod_cliente').val("")
         $('#valor_cliente').val("")
        status = 1;
        setInterval(religar,45000);     
    }
    if(event.status === "3" && event.membername === "Agent/"+ramal){//agente em ligação
        $("#chamada").css({"background-color":"green"})
        status = 3;
    }
    if(event.status === "5" && event.membername === "Agent/"+ramal){//agent deslogado
        $("#disponivel").css({"background-color":"red"})
       $("#chamada").css({"background-color":"red"});
       status = 5;
    }

}
if(event.event == "Newstate" && event.channelstatedesc == "Up" && event.channel == "Agent/"+ramal){
      api.post('cliente',{codigo : event.calleridnum},   { headers: {
    "Content-type": "application/json; charset=UTF-8"}
}).then(val =>{
         $('#nome_cliente').val(val.data.nome);
         $('#endereco_cliente').val(val.data.endereco);
         $('#cidade_cliente').val(val.data.cidade);
         $('#cpf_cliente').val(val.data.cpf);
         $('#telefone_cliente').val(val.data.telefone)
         $('#telefone2_cliente').val(val.data.telefone2)
         $('#plano_cliente').val(val.data.plano)
         $('#faturas_cliente').val(val.data.faturas)
         $('#cod_cliente').val(val.data.codigo)
         $('#valor_cliente').val(val.data.valor)
        // console.log(val);
});
       /*
       
         */
}
});

function setRamal(params) {
    this.ramal = params;
    console.log("esse ramal e "+params)
}

const Cliente = (props) =>{

    const {state} = useLocation();
    ramal = state.ramal;
    console.log(ramal);
    clearInterval(temporizador);
  

        return(
            <div>
           <h1 className="text-center" style={{color: 'white'}}>Bem vindo Ramal :{ramal}</h1>
<div className="container" style={{marginTop: '100px', marginBottom: 'auto'}}>
 <h3 className="text-center" style={{color: 'white'}}>Quandidade de clientes restantes : <div id="quantidade_clientes"></div></h3>
 <form className="Cliente">
     <div className="container">
         <h1 className="text-center">Dados do Cliente</h1>
  <div className="row">
      <div className="col-md-6">
      <label htmlFor="nome_cliente" className="form-label">Nome:</label>
    <input type="text" className="form-control" id="nome_cliente" disabled/>
      </div>



      <div className="col-md-6">
      <label htmlFor="nome_cliente" className="form-label">Cod. Cliente:</label>
    <input type="text" className="form-control" id="cod_cliente" disabled/>
      </div>
     
  </div>
  <div className="row">
      <div className="col-md-6">
      <label htmlFor="nome_cliente" className="form-label">Cidade/Distrito:</label>
    <input type="text" className="form-control" id="cidade_cliente" disabled/>
      </div>
      <div className="col-md-6">
      <label htmlFor="endereco" className="form-label">CPF:</label>
      <input type="text" className="form-control" id="cpf_cliente" disabled/>
      </div>
  </div>
  <div className="row">
      <div className="col-md-6">
      <label htmlFor="nome_cliente" className="form-label">Telefone:</label>
    <input type="text" className="form-control" id="telefone_cliente" disabled/>
      </div>
      <div className="col-md-6">
      <label htmlFor="endereco" className="form-label">Telefone 2:</label>
      <input type="text" className="form-control" id="telefone2_cliente" disabled/>
      </div>
  </div>
  <div className="row">
      <div className="col-md-6">
      <label htmlFor="nome_cliente" className="form-label">Plano:</label>
    <input type="text" className="form-control" id="plano_cliente" disabled/>
      </div>

      <div className="col-md-6">
      <label htmlFor="endereco" className="form-label">Endereço</label>
      <input type="text" className="form-control" id="endereco_cliente" disabled/>
      </div>


  </div>
  <div className="row">
    

  <div className="col-md-6">
      <label htmlFor="endereco" className="form-label">Faturas em Aberto:</label>
      <input type="text" className="form-control" id="faturas_cliente" disabled/>
      </div>
 


      <div className="col-md-6">
      <label htmlFor="endereco" className="form-label">Valor total:</label>
      <input type="text" className="form-control" id="valor_cliente" disabled/>
      </div>
  </div>
  <div className="row mt-5 mb-5 text-center ">
      <div className="col-md-12 border border-dark pt-2 pb-2" id="disponivel">
      Disponivel
      </div>
      <div className="col-md-12 border border-dark pt-2 pb-2" id="chamada">
      Chamada
      </div>
  </div>
  </div>
</form>
</div>
</div>
        )
   
        
           
      
    
}
export default Cliente;