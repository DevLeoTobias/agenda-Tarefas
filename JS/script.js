
 // variavel global
 let prioridadeSelecionada = "";
//codigo da lista de tarefas
 document.addEventListener("DOMContentLoaded",() =>{    
    // selecao da prioridade das tarefas
    const selPrioridade = document.getElementById("selecaoPrioridade");
    selPrioridade.addEventListener("change", (e) => {
        prioridadeSelecionada = e.target.value;      
    });
    
    //botao adicionar
    const botaoAdicionar = document.getElementById("btnAdicionar");
    // criacao da div e ul  fora do click 
    const novaDiv = document.createElement("div"); 
        novaDiv.classList.add("nova-div"); 
    const novaUl = document.createElement("ul");  
        document.body.appendChild(novaDiv);   
        novaDiv.appendChild(novaUl); 
    //carregamento do array (tarefas) msm dando refresh na pagina 
    const tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];

    // forEache adicionar os elementos ao array
        tarefas.forEach(tarefas => {
        criarElementoTarefa(tarefas[0], tarefas[1],tarefas[2]);
    });

    // criado o botao com evento click 
    botaoAdicionar.addEventListener("click", () => {
        const valorInput = document.getElementById("InputTarefas").value.trim() ;

         //condicao para checar se o input esta vazia -botao
        if (valorInput === "") {
            alert("digite alguma coisa");
            return;
        }  
        //pegando data e hora do pc
        const criacao = new Date();
        const dataCriacao = criacao.toLocaleString();

        // salvar e cria um array no localstorage
        let tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
            tarefas.push([valorInput, dataCriacao,prioridadeSelecionada]);
            localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
            document.getElementById("InputTarefas").value = "";  
                            
        // pedir pro usuario escolher uma opcao
        if(prioridadeSelecionada === ""){
                    alert('escolha uma opcao');
                    return;
                }
                //chamando a funcao
      criarElementoTarefa(valorInput, dataCriacao);         
    });  

});

// funcao para criar elementos dinamicos 
function criarElementoTarefa(textoTarefa,dataTarefa,prioridadeSelecionada) {
     
        //pegando um ul existente fora 
        const novaUl = document.querySelector(".nova-div ul") ; 
                  
        // criacao dos elementos definição de tipo e class        
        const novaLi = document.createElement("li");         
        const labelCheck = document.createElement("label");
            if (prioridadeSelecionada === "Vermelho") {  
                    labelCheck.style.backgroundColor = "red";
                    labelCheck.style.color = "black";          
                    
                }else if (prioridadeSelecionada === "Amarelo"){
                    labelCheck.style.backgroundColor = "yellow";
                    labelCheck.style.color = "black"; 

                }else if (prioridadeSelecionada === "Azul"){
                    labelCheck.style.backgroundColor= "blue";
                    labelCheck.style.color = "white";  

                }else if(prioridadeSelecionada === "Verde"){
                    labelCheck.style.backgroundColor= "green";
                    labelCheck.style.color = "black";  

                }

            labelCheck.classList.add("label-tarefa");
        const checkTask = document.createElement("input");
            checkTask.classList.add("check-tarefas");        
            checkTask.type = "checkbox";

             //pegando data e hora do pc
        const criacao = new Date();
        const dataCriacao = criacao.toLocaleString();

         // criando um span para a data e hora
        const spanData = document.createElement("span");
            spanData.classList.add("Data-Criacao");
            spanData.textContent = `(Criado em ${dataTarefa} )`;    

        // botao para exluir tarefas 
        const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "🗑️";
            botaoRemover.classList.add("btn-remover");
           
            botaoRemover.addEventListener("click", () => {
                novaLi.remove();
                // Atualiza o localStorage removendo o item do array
                let tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];

                // Filtra removendo a tarefa que tem o mesmo texto e data
                tarefas = tarefas.filter(t => !(t[0] === textoTarefa && t[1] === dataTarefa));
                // atualiza o localStorage
                localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
        })
        
        //adiciona uma linha tarefa como concluida 
        checkTask.addEventListener("change", () =>{            
            if (checkTask.checked) {
            labelCheck.classList.add("concluido");
            } else {
            labelCheck.classList.remove("concluido");
            }
        });
       
        //ordem de fluxo q ira aparecer no html DOM                         
            novaUl.appendChild(novaLi);
            novaLi.appendChild(botaoRemover);
            novaLi.appendChild(labelCheck);
            labelCheck.appendChild(checkTask);
            labelCheck.appendChild(document.createTextNode(" " + textoTarefa ));
            novaLi.appendChild(spanData); 
    
}

