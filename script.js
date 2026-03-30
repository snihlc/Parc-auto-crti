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

function enregistrerRavitaillement(){
let datePlein= document.getElementById("date-plein").value;
let station = document.getElementById("station").value;
let typeCarb = document.getElementById("type-carburant").value;
let quantiteCarb = document.getElementById("qte-carb").value;
let km = document.getElementById("kilometrage-carb").value;
let montantCarb = document.getElementById("montant-carb").value;

let tabCarb = document.querySelector("table tbody");
let nvlLigne =  `
    <tr>
        <td>${datePlein}</td>
        <td>${station}</td>
        <td>${typeCarb}</td>
        <td>${quantiteCarb} L</td>
        <td>${km} Km</td>
        <td>${montantCarb} DA</td>
        <td><a href="#" target="_blank" class="btn btn-primary ms-3 btn-sm">Voir le reçu</a>
          <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#ajout-carb">Modifier</button>
            <button class="btn btn-danger btn-sm" onclick="supprimerLigne(this)">Supprimer</button></td>
    </tr>

`;
tabCarb.innerHTML += nvlLigne;

document.getElementById("date-plein").value="";
document.getElementById("station").value="";
document.getElementById("type-carburant").value="";
document.getElementById("qte-carb").value="";
document.getElementById("montant-carb").value="";

let modal = bootstrap.Modal.getInstance(document.getElementById("ajout-carb"));
modal.hide();

}
function supprimerLigne(btn) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce ravitaillement ?")) {
        btn.closest("tr").remove();
    }
}

function filtrerChauffeurs() {
    let stat = document.getElementById("stat-chauf").value;
    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(function(ligne) {
        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim();

        if (stat === "") {
            ligne.style.display = "";
        } else if (stat === "dispo" && statut === "Disponible") {
            ligne.style.display = "";
        } else if (stat === "mission" && statut === "En mission") {
            ligne.style.display = "";
        } else if (stat === "conge" && statut === "En congé") {
            ligne.style.display = "";
        } else if (stat === "absent" && statut === "Absent") {
            ligne.style.display = "";
        } else {
            ligne.style.display = "none";
        }
    });
}
function resetFiltre() {
    let statChauf = document.getElementById("stat-chauf");
    if (statChauf) statChauf.value="";

    let statVehicule = document.getElementById("stat-vehicule");
    if (statVehicule) statVehicule.value = "";

    let searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    
    let lignes = document.querySelectorAll("table tbody tr");
    lignes.forEach(ligne => ligne.style.display = "");
}

function filtrerVehicules(){
    let stat = document.getElementById("stat-vehicule").value;
    let lignes = document.querySelectorAll("table tbody tr");

    lignes.forEach(function(ligne){
        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim();

        if (stat === "") {
            ligne.style.display="";
        } else if (stat === "car-dispo" && statut === "Disponible") {
            ligne.style.display = "";
        } else if (stat === "car-mission" && statut === "En mission"){
            ligne.style.display = "";
        } else if (stat === "car-mt" && statut === "En maintenance"){
            ligne.style.display = "";
        } else if (stat === "car-hs" && statut === "Hors service") {
            ligne.style.display = "";
        } else {
            ligne.style.display = "none";
        }
    });

}


function affMission(){
    let chauffeur = document.getElementById("chauf-dispo").value;
    let vehicule = document.getElementById("vehicule-dispo").value;

    if (chauffeur != "" && vehicule != "" && chauffeur != "reset" && vehicule != "reset"){
        document.querySelector(".aff-mission").style.display="block";
    }
    else{
        document.querySelector(".aff-mission").style.display="none";
    }
}