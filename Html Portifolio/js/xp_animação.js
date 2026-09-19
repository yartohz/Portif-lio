document.addEventListener("DOMContentLoaded",()=> {
    const fakeCursor = document.getElementById("fake-cursor");
    const xpWindow = document.getElementById("win-xp-box");
    const sobreSection = document.getElementById("sobre");

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries)) => {
        entries.forEach(entry =>{
            if (entry.isIntersecting && !hasAnimated){
                hasAnimated = true;
                setTimeout (()=> {
                    fakeCursor.style.top = "15px";
                    fakeCursor.style.left = "50%"
                },400);

                setTimeout (()=> {
                    fakeCursor.style.transform = "scale(0.75)";
                },1600);
                setTimeout (()=> {
                    fakeCursor.style.transform = "scale(0.75)";
                },1600);
                setTimeout (()=> {
                    fakeCursor.style.transform = "scale(0.75)";
                },1600);
            }
        }
    }










});