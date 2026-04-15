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

    let typeper = document.getElementById("type-periodique").value;

        if(typeper == "vidange"){
            document.querySelector(".vidange").style.display = "block";
            document.querySelector(".controle-frein").style.display = "none";
            document.querySelector(".autre").style.display="none";
            document.querySelector(".mt-periodique").classList.add("col-md-12"); 
            document.querySelector(".mt-periodique").classList.remove("col-md-6");
        } else if(typeper == "controle-frein") {
            document.querySelector(".controle-frein").style.display = "block";
            document.querySelector(".vidange").style.display = "none";
            document.querySelector(".autre").style.display="none";
            document.querySelector(".mt-periodique").classList.add("col-md-12"); 
            document.querySelector(".mt-periodique").classList.remove("col-md-6"); 

        } else if (typeper == "autre"){
            document.querySelector(".autre").style.display="block";
            document.querySelector(".mt-periodique").classList.remove("col-md-12"); 
            document.querySelector(".mt-periodique").classList.add("col-md-6");
            document.querySelector(".controle-frein").style.display = "none";
            document.querySelector(".vidange").style.display = "none";

        }
        else {
            document.querySelector(".mt-periodique").classList.add("col-md-12"); 
            document.querySelector(".mt-periodique").classList.remove("col-md-6");                    
            document.querySelector(".vidange").style.display = "none";
            document.querySelector(".controle-frein").style.display = "none";
            document.querySelector(".autre").style.display="none";

        }
}

function ouvrirModif(type) {
    let champsPeriodique = document.getElementById('champs-periodique');
    let champsCorrective = document.getElementById('champs-corrective');

    if (type === 'periodique') {
        champsPeriodique.style.display = 'block';
        champsCorrective.style.display = 'none';
    } else {
        champsPeriodique.style.display = 'none';
        champsCorrective.style.display = 'block';
    }
}



function filtrerChauffeurs() {
    let stat = document.getElementById("stat-chauf").value;
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.querySelector("#no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let statut = ligne.querySelector("td:nth-child(4)").innerText.trim();

        if (stat === "") {
            ligne.style.display = ""; trouve = true;
        } else if (stat === "dispo" && statut === "Disponible") {
            ligne.style.display = ""; trouve = true;
        } else if (stat === "mission" && statut === "En mission") {
            ligne.style.display = ""; trouve = true;
        } else if (stat === "conge" && statut === "En congé") {
            ligne.style.display = ""; trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    } else {
        noResult.style.display="";
    }
}

function rechercheChauffeur(){
    let recherche = document.getElementById("search-input").value.toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult =  document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let nom = ligne.querySelector("td:nth-child(1)").innerText.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (nom.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        }
        else {
            ligne.style.display="none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    } else {
        noResult.style.display="";
    }

}
function resetFiltre() {
    let statChauf = document.getElementById("stat-chauf");
    if (statChauf) statChauf.value="";

    let statVehicule = document.getElementById("stat-vehicule");
    if (statVehicule) statVehicule.value = "";

    let typevehicule = document.getElementById("type-vehicule");
    if (typevehicule) typevehicule.value="";



    let searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    
    let statMission = document.getElementById("stat-mission");
    if (statMission) statMission.value="";

    let typeDemande = document.getElementById("type-demande");
    if (typeDemande) typeDemande.value="";

    let etatDemande = document.getElementById("etat-demande");
    if (etatDemande) etatDemande.value="";

    let statAnomalie = document.getElementById("stat-panne");
    if (statAnomalie) statAnomalie.value="";

    let urgenceAnomalie = document.getElementById("gravite-panne");
    if (urgenceAnomalie) urgenceAnomalie.value="";


    let lignes = document.querySelectorAll("table tbody tr");
    lignes.forEach(ligne => ligne.style.display = "");
        
    let noResult = document.getElementById("no-result");
    if (noResult) noResult.style.display = "none";
}

function filtrerVehicules(){
    let stat = document.getElementById("stat-vehicule").value;
    let typevehicule = document.getElementById("type-vehicule").value
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.querySelector("#no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let statut = ligne.querySelector("td:nth-child(6)").innerText.trim();
        let type = ligne.querySelector("td:nth-child(2)").innerText.trim();

        let typeV = (typevehicule ==="" )|| (typevehicule === "voiture" && type === "Voiture") ||
        (typevehicule ==="camion" && type === "Camion") || (typevehicule ==="bus" && type === "Bus") ||
        (typevehicule ==="utilitaire" && type === "Utilitaire") || (typevehicule ==="moto" && type === "Moto");

        let statutV = (stat ==="") || (stat === "car-dispo" && statut === "Disponible") ||
        (stat === "car-mission" && statut === "En mission") || (stat === "car-mt" && statut === "En maintenance")
        || (stat === "car-hs" && statut === "Hors service");

        if (typeV && statutV) {
            ligne.style.display = "";
            trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });
        if (trouve){
        noResult.style.display="none";
    } else {
        noResult.style.display="";
    }
}
function rechercheVehicule(){
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let marque = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let modele = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let marquemodele = marque + " " + modele;

        if(marquemodele.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        } else {
            ligne.style.display="none";
        }
    })
    if (trouve){
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }

}


function filtrerDemandes() {
    let typedm = document.getElementById("type-demande").value.trim().toLowerCase();
    let etatdm = document.getElementById("etat-demande").value.trim().toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");
    let trouve = false;

    lignes.forEach(ligne => {
        let typeDemande = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase();
        let statDemmande = ligne.querySelector("td:nth-child(6)").innerText.trim().toLowerCase();

        // Vérification du type
        let matchType = (typedm === "") || 
                        (typedm === "dem-personnel" && typeDemande === "personnel") ||
                        (typedm === "dem-materiel" && typeDemande === "materiel");

        // Vérification de l'état
        let matchEtat = (etatdm === "") ||
                        (etatdm === "dem-encours" && statDemmande === "en attente") ||
                        (etatdm === "dem-acceptee" && statDemmande === "acceptée") ||
                        (etatdm === "dem-refusee" && statDemmande === "rejetée") ||
                        (etatdm === "dem-annulee" && statDemmande === "annulée") ||
                        (etatdm === "dem-cloturee" && statDemmande === "clôturée");

        if (matchType && matchEtat) {
            ligne.style.display = "";
            trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }
}

function filtrerEtatMissions(){
    let etatMission = document.getElementById("stat-mission").value.trim();
    let noResult = document.getElementById("no-result");
    let trouve = false;

    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");

    lignes.forEach(ligne =>{

        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim();

   if (etatMission === "")
        { ligne.style.display=""; trouve = true;
    }
    else if (etatMission=== "mis-encours" && statut === "En cours")
        { ligne.style.display=""; trouve = true;

    }else if(etatMission === "mis-validee" && statut === "Validée")
        { ligne.style.display=""; trouve = true;

    }else if(etatMission === "mis-annulee" && statut === "Annulée")
        { 
        ligne.style.display=""; trouve = true;
    }else if (etatMission ==="mis-terminee" && statut === "Terminée") {
        ligne.style.display=""; trouve = true;
    }else {
         ligne.style.display="none";
    }       
    });
    if (trouve){
        noResult.style.display="none";
    } else{
        noResult.style.display="";
    }
}

function rechercherMissions(){
    let recherche=document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let demandeur=ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let chauffeur=ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let vehicule=ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
        let search = demandeur +" "+ chauffeur +" "+ vehicule;

        if(search.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        }else {
            ligne.style.display="none";
        }
    });
    if (trouve){
        noResult.style.display="none";
    } else{
        noResult.style.display="";
    }

}
function rechercheDemandes(){
    let recherche=document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let emp = ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if(emp.includes(recherche)){
            ligne.style.display="";
            trouve=true;
        } else {
            ligne.style.display="none";
        }
    })
    if (!trouve){
        noResult.style.display="";
    }else{
        noResult.style.display="none";
    }
}

function affChampsMission(){
    let chauffeur = document.getElementById("chauf-dispo").value;
    let vehicule = document.getElementById("vehicule-dispo").value;

    if (chauffeur != "" && vehicule != "" && chauffeur != "reset" && vehicule != "reset"){
        document.querySelector(".aff-mission").style.display="block";
    }
    else{
        document.querySelector(".aff-mission").style.display="none";
    }
}

function filtrerMaintenance(type){
    document.querySelectorAll(".nav-link").forEach(btn => {
        btn.style.background="#2c3368";
        btn.style.opacity="0.6";
    });
    event.target.style.background="#2c3368";
    event.target.style.opacity="1";

    filtreType = type;
    filtrerMaintenanceDate();
}

let filtreType = 'toutes';

function filtrerMaintenanceDate() {
    const annee = document.getElementById('filtre-annee').value;

    document.querySelectorAll('.detail-vt').forEach(card => {
        let typemt = card.querySelector("h4").innerText.toLowerCase();

        const typeOk = filtreType === 'toutes' || typemt.includes(filtreType);

        const spanDate = card.querySelector('.bi-calendar2');
        let anneeCard = '';
        if (spanDate) {
            anneeCard = spanDate.parentElement.textContent.trim().split('-')[2];
        }
        const anneeOk = annee === '' || anneeCard === annee;

        card.style.display = (typeOk && anneeOk) ? '' : 'none';
    });
}

let filtreDct = 'tout';

function filtrerDocument(dct) {
    document.querySelectorAll(".nav-link").forEach(btn => {
        btn.style.background = "#2c3368";
        btn.style.opacity = "0.6";
    });
    event.target.style.background = "#2c3368";
    event.target.style.opacity = "1";

    filtreDct = dct;
    filtrerDocumentDate();
}

function filtrerDocumentDate() {
    const annee = document.getElementById('filtre-annee').value;

    document.querySelectorAll('.detail-vt').forEach(card => {
        const typedoc = card.getAttribute('data-type');

        const typeOk = filtreDct === 'tout' || typedoc.includes(filtreDct.replace(' ', '-'));

        const liExpiration = Array.from(card.querySelectorAll('li')).find(li =>
            li.textContent.toLowerCase().includes('expiration') ||
            li.textContent.toLowerCase().includes('prochain')
        );

        if (!liExpiration) {
            card.style.display = typeOk ? '' : 'none';
            return;
        }

        let anneeCard = '';
        const match = liExpiration.textContent.match(/\d{2}-\d{2}-(\d{4})/);
        if (match) {
            anneeCard = match[1];
        }

        const anneeOk = annee === '' || anneeCard === annee;

        card.style.display = (typeOk && anneeOk) ? '' : 'none';
    });
}
  function setAction(el) {
    const btn = el.closest('.btn-group').querySelector('.btn:first-child');
    btn.textContent = el.textContent;
    btn.dataset.action = el.textContent.trim();
  }

function handleAction(btn) {
    const action = btn.dataset.action;
    if (action === 'Planifier maintenance') {
      new bootstrap.Modal(document.getElementById('maintenanceModal')).show();
    } else if (action === 'Signaler chauffeur') {
      new bootstrap.Modal(document.getElementById('ConvocationModal')).show();    }
  }

document.addEventListener('DOMContentLoaded', function () {
    const aujourd_hui = new Date().toISOString().split('T')[0];
    document.getElementById('date-signalement').value = aujourd_hui;
});

function confirminout(btn){
    btn.closest(".inout").style.background="#85ff9d41";
    btn.closest(".inout").querySelectorAll("button").forEach(b => b.disabled = true);
}

function filtrerAnomalies() {
    let statut = document.getElementById("stat-panne").value.trim().toLowerCase();
    let urgence = document.getElementById("gravite-panne").value.trim().toLowerCase();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let stat = ligne.querySelector("td:nth-child(6)").innerText.trim().toLowerCase();
        let urg = ligne.querySelector("td:nth-child(4)").innerText.trim().toLowerCase();

        // Vérification du statut
        let matchStatut = false;
        if (statut === "") {
            matchStatut = true;
        } else if (statut === "signalee" && stat === "signalée") {
            matchStatut = true;
        } else if (statut === "en-cours-rep" && stat === "en cours de réparation") {
            matchStatut = true;
        } else if (statut === "reparee" && stat === "réparée") {
            matchStatut = true;
        }

        // Vérification de l'urgence
        let matchUrgence = false;
        if (urgence === "") {
            matchUrgence = true;
        } else if (urgence === "faible" && urg === "faible") {
            matchUrgence = true;
        } else if (urgence === "moyenne" && urg === "moyenne") {
            matchUrgence = true;
        } else if (urgence === "grave" && urg === "grave") {
            matchUrgence = true;
        }

        // Affichage ou non
        if (matchStatut && matchUrgence) {
            ligne.style.display = "";
            trouve = true;
        } else {
            ligne.style.display = "none";
        }
    });

    if (trouve) {
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }
}

function rechercheAnomalie(){
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();
    let lignes = document.querySelectorAll("table tbody tr:not(#no-result)");
    let noResult = document.getElementById("no-result");

    let trouve = false;

    lignes.forEach(ligne => {
        let type = ligne.querySelector("td:nth-child(5)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let vehicule = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let personne = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let recherches = type + " " + vehicule +" "+ personne;

        if(recherches.includes(recherche)){
            ligne.style.display="";
            trouve = true;
        } else {
            ligne.style.display="none";
        }
    })
    if (trouve){
        noResult.style.display="none";
    }else{
        noResult.style.display="";
    }

}