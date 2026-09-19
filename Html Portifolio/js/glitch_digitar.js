document.addEventListener("DOMContentLoaded",()=> {
    const textElement = document.getElementById("digitando-conteudo");
    const buttonBox = document.querySelector(".matrix-box");
    const  textToType= "Certificados";

    let index =0;
    let isDeleting = false ;

    function typeLoop(){
        textElement.textContent = textToType.substring(0, index);

        let speed = isDeleting? 50 : 100;

        if (!isDeleting && index == textToType.length){
                buttonBox.classList.add("glitch-active");
                setTimeout(()=> buttonBox.classList.remove("glitch-active"),400);
                speed = 2500;
                isDeleting = false
            }
            else if(isDeleting && index === 0 ){
                speed = 1000;
                isDeleting = false;
            }
            else {
                index += isDeleting ? -1 : 1;
            }
            setTimeout(typeLoop, speed);
        
        }

    typeLoop();
});