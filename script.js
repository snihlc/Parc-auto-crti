function toggleSidebar(){
                    document.getElementById("sidebar").classList.toggle("active");
                    document.getElementById("sidebar-overlay").classList.toggle("active");
                }

function afficherChamps() {

    let type = document.getElementById("type-doc").value;

    if (type == "assurance")
    {
        document.querySelector("#assurance").style.display="block";
    }
else {
        document.querySelector("#assurance").style.display="none";

}
    if (type == "vignette")
    {
        document.querySelector("#vignette").style.display="block";

    }
    else {
        document.querySelector("#vignette").style.display="none";

}
    if (type == "controle-tech")
    {
        document.querySelector("#controle").style.display="block";

    }
    else {
        document.querySelector("#controle").style.display="none";

}
    if (type == "carte-grise")
    {
        document.querySelector("#carte-grise").style.display="block";

    }
    else {
        document.querySelector("#carte-grise").style.display="none";

}
}
function affTypeMaintenance(){
    let type = document.getElementById("type-maintenance").value;
    let typeper = document.getElementById("type-periodique").value;

    if(type == "periodique"){
        document.querySelector(".mt-periodique").style.display = "block";
        document.querySelector(".mt-corrective").style.display = "none";

        if(typeper == "vidange"){
            document.querySelector(".vidange").style.display = "block";
            document.querySelector(".controle-frein").style.display = "none";
        } else if(typeper == "controle-frein") {
            document.querySelector(".controle-frein").style.display = "block";
            document.querySelector(".vidange").style.display = "none";
        } else {
            document.querySelector(".vidange").style.display = "none";
            document.querySelector(".controle-frein").style.display = "none";
        }

    } else if(type == "corrective") {
        document.querySelector(".mt-corrective").style.display = "block";
        document.querySelector(".mt-periodique").style.display = "none";
        document.querySelector(".vidange").style.display = "none";
        document.querySelector(".controle-frein").style.display = "none";

    } else {
        document.querySelector(".mt-periodique").style.display = "none";
        document.querySelector(".mt-corrective").style.display = "none";
        document.querySelector(".vidange").style.display = "none";
        document.querySelector(".controle-frein").style.display = "none";
    }
}