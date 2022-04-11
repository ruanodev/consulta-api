
document.getElementById('cep').addEventListener('focusout', () => { // busca valor digitado após evento focusout, usuário sai do campo cep
    
    const cep = document.getElementById('cep').value; // atribui o valor do campo input a variavel "cep"
    const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);
  
    if (cepValido(cep)){
      
    } else {
        document.getElementById('endereco').value = 'Ops! CEP incorreto!'
        }

     limparDados();
        
    fetch(`https://viacep.com.br/ws/${cep}/json/`) // "busca" - efetua a busca / requisição externa via API - endereço deve estar com acento inverso (para a esquerda) ` `
    .then((resposta) => resposta.json()) // transforma a resposta do formato texto para formato Json
    .then((dados) => {
    
    if (dados.hasOwnProperty('erro')){ // trata retorno de erro caso CEP não seja encontrado
        document.getElementById('endereco').value = 'Ops! CEP não encontrado!' // mensagem a ser exibida no campo "endereço"

    } else {

        document.getElementById('endereco').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('uf').value = dados.uf;
                
        fetch(`https://goweather.herokuapp.com/weather/${dados.localidade}`)
        .then((resposta) => resposta.json())
        .then((dadostemp) => {
        document.getElementById('temperatura').value = dadostemp.temperature;
        //console.log(dadostemp.temperature);
        //console.log(dados);
            
        });
      }
    
     });
});
 
function limpar(){
document.getElementById('formulario').reset();

}

function limparDados(){
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
    document.getElementById('temperatura').value = '';
 }