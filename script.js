  function toggleSidebar(){
                    document.getElementById("sidebar").classList.toggle("active");
                    document.getElementById("sidebar-overlay").classList.toggle("active");
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
    let plaq = document.getElementById("plaquettesmodif");
    let disq = document.getElementById("disquesmodif");
    let montantMod = document.getElementById("prixmodif");
    let reçuMTMod = document.getElementById("reçu-mt");

    if (type === 'periodique') {
        champsPeriodique.style.display = 'block';
        // Désactivés par défaut, le select nouveau-statut les activera
        plaq.disabled = true;
        disq.disabled = true;
        reçuMTMod.disabled=true;
        montantMod.disabled=true;

    } else {
        champsPeriodique.style.display = 'none';
        plaq.disabled = true;
        disq.disabled = true;
        reçuMTMod.disabled=true;
        montantMod.disabled=true;
    }

    // Reset le select statut
    document.getElementById("nouveau-statut").value = "";
    document.getElementById("nouveau-statut").classList.remove("is-valid", "is-invalid");
}

function filtrerChauffeurs() {
    let statutFiltre = document.getElementById("stat-chauf").value;

    filteredRows = allRows.filter(ligne => {
        let statut = ligne.querySelector("td:nth-child(4)").innerText.trim();
        if (statutFiltre === "") return true;
        if (statutFiltre === "dispo" && statut === "Disponible") return true;
        if (statutFiltre === "mission" && statut === "En mission") return true;
        if (statutFiltre === "conge" && statut === "En congé") return true;
        return false;
    });

    currentPage = 1;
    afficherPage();
}

function rechercheChauffeur() {
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();

    filteredRows = allRows.filter(ligne => {
        let nom = ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let email = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let numTel = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        return nom.includes(recherche) || email.includes(recherche) || numTel.includes(recherche);    
    });

    currentPage = 1;
    afficherPage();
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


    filteredRows = [...allRows];
    currentPage = 1;
    afficherPage();
}

function filtrerVehicules() {
    let typeFilter = document.getElementById("type-vehicule").value;
    let statutFilter = document.getElementById("stat-vehicule").value;

    filteredRows = allRows.filter(ligne => {
        let type = ligne.querySelector("td:nth-child(2)").innerText.trim();
        let statut = ligne.querySelector("td:nth-child(6)").innerText.trim();

        // Correspondance type
        let matchType = (typeFilter === "") ||
                        (typeFilter === "voiture" && type === "Voiture") ||
                        (typeFilter === "camion" && type === "Camion") ||
                        (typeFilter === "bus" && type === "Bus") ||
                        (typeFilter === "utilitaire" && type === "Utilitaire") ||
                        (typeFilter === "moto" && type === "Moto");

        // Correspondance statut
        let matchStatut = (statutFilter === "") ||
                          (statutFilter === "car-dispo" && statut === "Disponible") ||
                          (statutFilter === "car-mission" && statut === "En mission") ||
                          (statutFilter === "car-mt" && statut === "En maintenance") ||
                          (statutFilter === "car-hs" && statut === "Hors service");

        return matchType && matchStatut;
    });

    currentPage = 1;
    afficherPage();
}

function rechercheVehicule() {
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();

    filteredRows = allRows.filter(ligne => {
        let marque = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let modele = ligne.querySelector("td:nth-child(4)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let KM = ligne.querySelector("td:nth-child(5)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let matricule = ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let marqueModele = marque + " " + modele;
        return marqueModele.includes(recherche) || KM.includes(recherche) || matricule.includes(recherche) ;
    });

    currentPage = 1;
    afficherPage();
}


function filtrerDemandes() {
    let typedm = document.getElementById("type-demande").value.trim().toLowerCase();
    let etatdm = document.getElementById("etat-demande").value.trim().toLowerCase();

    filteredRows = allRows.filter(ligne => {
        let typeDemande = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase();
        let statDemande = ligne.querySelector("td:nth-child(6)").innerText.trim().toLowerCase();

        let matchType = (typedm === "") ||
                        (typedm === "dem-personnel" && typeDemande === "personnel") ||
                        (typedm === "dem-materiel" && typeDemande === "materiel");

        let matchEtat = (etatdm === "") ||
                        (etatdm === "dem-encours" && statDemande === "en attente") ||
                        (etatdm === "dem-acceptee" && statDemande === "acceptée") ||
                        (etatdm === "dem-refusee" && statDemande === "rejetée") ||
                        (etatdm === "dem-annulee" && statDemande === "annulée") ||
                        (etatdm === "dem-cloturee" && statDemande === "clôturée");

        return matchType && matchEtat;
    });

    currentPage = 1;
    afficherPage();
}

function filtrerEtatMissions() {
    let etatMission = document.getElementById("stat-mission").value.trim().toLowerCase();

    filteredRows = allRows.filter(ligne => {
        let statut = ligne.querySelector("td:nth-child(5)").innerText.trim().toLowerCase();
        
        if (etatMission === "") return true;
        if (etatMission === "mis-encours" && statut === "en cours") return true;
        if (etatMission === "mis-validee" && statut === "validée") return true;
        if (etatMission === "mis-annulee" && statut === "annulée") return true;
        if (etatMission === "mis-terminee" && statut === "terminée") return true;
        return false;
    });

    currentPage = 1;
    afficherPage();
}

function rechercherMissions() {
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();

    filteredRows = allRows.filter(ligne => {
        let demandeur = ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let chauffeur = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let vehicule  = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
        let searchText = demandeur + " " + chauffeur + " " + vehicule;
        return searchText.includes(recherche);
    });

    currentPage = 1;
    afficherPage();
}
function rechercheDemandes() {
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();

    filteredRows = allRows.filter(ligne => {
        let emp = ligne.querySelector("td:nth-child(1)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return emp.includes(recherche);
    });

    currentPage = 1;
    afficherPage();
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
        document.querySelector("#cartegrise").style.display="block";
}
    else {
        document.querySelector("#cartegrise").style.display="none";
}
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

function confirminout(btn){
    btn.closest(".inout").style.background="#85ff9d41";
    btn.closest(".inout").querySelectorAll("button").forEach(b => b.disabled = true);
}

function filtrerAnomalies() {
    let urgenceFilter = document.getElementById("gravite-panne").value.trim().toLowerCase();
    let statutFilter = document.getElementById("stat-panne").value.trim().toLowerCase();

    filteredRows = allRows.filter(ligne => {
        let urgence = ligne.querySelector("td:nth-child(4)").innerText.trim().toLowerCase();
        let statut = ligne.querySelector("td:nth-child(6)").innerText.trim().toLowerCase();

        // Correspondance urgence
        let matchUrgence = (urgenceFilter === "") ||
                           (urgenceFilter === "faible" && urgence === "faible") ||
                           (urgenceFilter === "moyenne" && urgence === "moyenne") ||
                           (urgenceFilter === "grave" && urgence === "grave");

        // Correspondance statut
        let matchStatut = (statutFilter === "") ||
                          (statutFilter === "signalee" && statut === "signalée") ||
                          (statutFilter === "en-cours-rep" && statut === "en cours de réparation") ||
                          (statutFilter === "reparee" && statut === "réparée");

        return matchUrgence && matchStatut;
    });

    currentPage = 1;
    afficherPage();
}

function rechercheAnomalie() {
    let recherche = document.getElementById("search-input").value.toLowerCase().trim();

    filteredRows = allRows.filter(ligne => {
        let type = ligne.querySelector("td:nth-child(5)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let vehicule = ligne.querySelector("td:nth-child(2)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let personne = ligne.querySelector("td:nth-child(3)").innerText.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        let searchText = type + " " + vehicule + " " + personne;
        return searchText.includes(recherche);
    });

    currentPage = 1;
    afficherPage();
}

function validerFormulaireVehicule(event){
  event.preventDefault();

let matricule=document.getElementById("immatric-vehicule").value.trim();
let marque=document.getElementById("marque-vehicule").value.trim();
let modele=document.getElementById("modele-vehicule").value.trim();
let typeV=document.getElementById("type-vehicul").value.trim();
let annee = document.getElementById("annee-vehicule").value.trim();
let kilometrage = document.getElementById("kilometrage").value.trim();
let nombre = document.getElementById("NbPlaces").value.trim();
let etat = document.getElementById("etat-vehicule").value.trim();
let carburant = document.getElementById("carburant").value.trim();
let dateDispo = document.getElementById("date-circulation").value.trim();
let carteGr = document.getElementById("carte-grisev").files;

let erreur=false;

document.getElementById("errmat").innerHTML = "";
document.getElementById("errmarque").innerHTML = "";
document.getElementById("errmodele").innerHTML = "";
document.getElementById("errtypeV").innerHTML = "";
document.getElementById("errannee").innerHTML="";
document.getElementById("errkm").innerHTML="";
document.getElementById("errnombre").innerHTML="";


if (etat !== ""){
document.getElementById("etat-vehicule").classList.add("is-valid");
}
if(carburant !=="" ){
document.getElementById("carburant").classList.add("is-valid");

}
if(dateDispo !== ""){
document.getElementById("date-circulation").classList.add("is-valid");

}
if(carteGr.length !== 0){
document.getElementById("carte-grisev").classList.add("is-valid");
}

if(matricule==""){document.getElementById("errmat").innerHTML="L'immatriculation est obligatoire.";
    document.getElementById("immatric-vehicule").classList.add("is-invalid");
erreur=true;}
else{
document.getElementById("immatric-vehicule").classList.remove("is-invalid");
document.getElementById("immatric-vehicule").classList.add("is-valid");

}

if(marque==""){document.getElementById("errmarque").innerHTML="La marque du véhicule est obligatoire.";
    document.getElementById("marque-vehicule").classList.add("is-invalid");
erreur=true;}
else{
document.getElementById("marque-vehicule").classList.remove("is-invalid");
document.getElementById("marque-vehicule").classList.add("is-valid");
}

if(modele==""){document.getElementById("errmodele").innerHTML="Le modèle du véhicule est obligatoire.";
document.getElementById("modele-vehicule").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("modele-vehicule").classList.remove("is-invalid");
document.getElementById("modele-vehicule").classList.add("is-valid");

}

if (typeV ==="" || typeV === "Selectionnez le type du véhicule") {
    document.getElementById("errtypeV").innerHTML = "Le type du véhicule est obligatoire.";
    document.getElementById("type-vehicul").classList.add("is-invalid");
     erreur = true;}
else{
document.getElementById("type-vehicul").classList.remove("is-invalid");
document.getElementById("type-vehicul").classList.add("is-valid");

}

if(annee === ""){

document.getElementById("annee-vehicule")
.classList.remove("is-valid");

document.getElementById("annee-vehicule")
.classList.remove("is-invalid");

}
else if(isNaN(annee)){document.getElementById("errannee").innerHTML = "L'année doit contenir une valeur numérique."; 
document.getElementById("annee-vehicule").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("annee-vehicule").classList.remove("is-invalid");
document.getElementById("annee-vehicule").classList.add("is-valid");

}
if(kilometrage ==="") {document.getElementById("errkm").innerHTML="Le kilométrage est obligatoire.";
    document.getElementById("kilometrage").classList.add("is-invalid");
    erreur=true;
}

else if (isNaN(kilometrage)){document.getElementById("errkm").innerHTML = "Le kilométrage doit contenir une valeur numérique."; 
document.getElementById("kilometrage").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("kilometrage").classList.remove("is-invalid");
document.getElementById("kilometrage").classList.add("is-valid");

}
if(nombre === ""){

document.getElementById("NbPlaces").classList.remove("is-valid");
document.getElementById("NbPlaces").classList.remove("is-invalid");

}
else if(isNaN(nombre)){document.getElementById("errnombre").innerHTML = "Le nombre de places doit contenir une valeur numérique."; 
document.getElementById("NbPlaces").classList.add("is-invalid");
    erreur=true;}
else{
document.getElementById("NbPlaces").classList.remove("is-invalid");
document.getElementById("NbPlaces").classList.add("is-valid");
}

 if (erreur) {
    return;
  }
  event.target.submit();
}

function validerFormulaireCarburant(event){
    event.preventDefault();

    let datePlein = document.getElementById("date-plein").value.trim();
    let Station = document.getElementById("station").value.trim();
    let TypeCarb = document.getElementById("type-carburant").value.trim();
    let QteCarb = document.getElementById("qte-carb").value.trim();
    let kmCarb = document.getElementById("kilometrage-carb").value.trim();
    let montantCarb = document.getElementById("montant-carb").value.trim();

    let erreur = false;

    document.getElementById("errplein").innerHTML="";
    document.getElementById("errstation").innerHTML="";
    document.getElementById("errtypecarb").innerHTML="";
    document.getElementById("errqtecarb").innerHTML="";
    document.getElementById("errkmcarb").innerHTML="";
    document.getElementById("errmtcarb").innerHTML="";

    if (datePlein === ""){
        document.getElementById("errplein").innerHTML="Veuillez saisir la date de plein.";
        document.getElementById("date-plein").classList.add("is-invalid");
        erreur=true;
    } else {
        document.getElementById("date-plein").classList.remove("is-invalid");
        document.getElementById("date-plein").classList.add("is-valid");
    }

    if (Station === ""){
        document.getElementById("errstation").innerHTML="Veuillez saisir la station.";
        document.getElementById("station").classList.add("is-invalid");
        erreur=true;
    } else {
        document.getElementById("station").classList.remove("is-invalid");
        document.getElementById("station").classList.add("is-valid");
    }

    if (TypeCarb === ""){
        document.getElementById("errtypecarb").innerHTML="Veuillez choisir un type de carburant.";
        document.getElementById("type-carburant").classList.add("is-invalid");
        erreur=true;
    } else {
        document.getElementById("type-carburant").classList.remove("is-invalid");
        document.getElementById("type-carburant").classList.add("is-valid");
    }

    if (QteCarb === ""){
        document.getElementById("errqtecarb").innerHTML="Veuillez saisir la quantité de carburant.";
        document.getElementById("qte-carb").classList.add("is-invalid");
        erreur=true;
    } else if(isNaN(QteCarb)){
        document.getElementById("errqtecarb").innerHTML="La quantité doit contenir une valeur numérique.";
        document.getElementById("qte-carb").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("qte-carb").classList.remove("is-invalid");
        document.getElementById("qte-carb").classList.add("is-valid");
    }

    if (kmCarb === ""){
        document.getElementById("errkmcarb").innerHTML="Veuillez saisir le kilométrage.";
        document.getElementById("kilometrage-carb").classList.add("is-invalid");
        erreur=true;
    } else if(isNaN(kmCarb)){
        document.getElementById("errkmcarb").innerHTML="Le kilometrage doit contenir une valeur numérique.";
        document.getElementById("kilometrage-carb").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("kilometrage-carb").classList.remove("is-invalid");
        document.getElementById("kilometrage-carb").classList.add("is-valid");
    }

    if (montantCarb === ""){
        document.getElementById("errmtcarb").innerHTML="Veuillez saisir le montant.";
        document.getElementById("montant-carb").classList.add("is-invalid");
        erreur=true;
    } else if(isNaN(montantCarb)){
        document.getElementById("errmtcarb").innerHTML="Le montant doit contenir une valeur numérique.";
        document.getElementById("montant-carb").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("montant-carb").classList.remove("is-invalid");
        document.getElementById("montant-carb").classList.add("is-valid");
    }

    if (erreur){ return; }
    event.target.submit();
}


function validerFormulaireMaintenancePer(event){
    event.preventDefault();
    let typeMT = document.getElementById("type-periodique").value.trim();
    let typeAutre = document.getElementById("autres").value.trim();
    let typefreq = document.getElementById("freq").value.trim();
    let typehuile = document.getElementById("huile").value.trim();
    let dateMT = document.getElementById("date-maintenance").value.trim();
    let montantper = document.getElementById("prix").value.trim();
    let statMT = document.getElementById("statut-maintenance").value.trim();

    let erreur = false;

    document.getElementById("errtypeMT").innerHTML="";
    document.getElementById("errtypeAutre").innerHTML="";
    document.getElementById("errtypefreq").innerHTML="";
    document.getElementById("errtypehuile").innerHTML="";
    document.getElementById("errdateMT").innerHTML="";
    document.getElementById("errmtper").innerHTML="";
    document.getElementById("errstatMT").innerHTML="";

    if (typeMT === ""){
         document.getElementById("errtypeMT").innerHTML="Veuillez choisir un type de maintenance périodique.";
        document.getElementById("type-periodique").classList.add("is-invalid");
        erreur=true;
    }   else {
        document.getElementById("type-periodique").classList.remove("is-invalid");
        document.getElementById("type-periodique").classList.add("is-valid");
    }
    
    if (typeMT === "autre"){
        if (typeAutre === "") {
             document.getElementById("errtypeAutre").innerHTML="Veuillez saisir un type.";
        document.getElementById("autres").classList.add("is-invalid");
        erreur=true;
        } else {
        document.getElementById("autres").classList.remove("is-invalid");
        document.getElementById("autres").classList.add("is-valid");
        }
    }
    if (typeMT ==="vidange"){
        if (typefreq === ""){
        document.getElementById("errtypefreq").innerHTML="Veuillez insérer le kilométrage.";
        document.getElementById("freq").classList.add("is-invalid");
        erreur=true;          
        }else if (isNaN(typefreq)){
    document.getElementById("errtypefreq").innerHTML="Le kilométrage doit contenir une valeur numérique.";
    document.getElementById("freq").classList.add("is-invalid");
    erreur=true;                 
        }
         else {
        document.getElementById("freq").classList.remove("is-invalid");
        document.getElementById("freq").classList.add("is-valid");           
        }
        if (typehuile === "") {
        document.getElementById("errtypehuile").innerHTML="Veuillez choisir un type d'huile.";
        document.getElementById("huile").classList.add("is-invalid");
        erreur=true;            
        } else {
        document.getElementById("huile").classList.remove("is-invalid");
        document.getElementById("huile").classList.add("is-valid");           
        }
    }
    if (dateMT === ""){
        document.getElementById("errdateMT").innerHTML="Veuillez entrer une date.";
        document.getElementById("date-maintenance").classList.add("is-invalid");
        erreur=true;      
        }else {
        document.getElementById("date-maintenance").classList.remove("is-invalid");
        document.getElementById("date-maintenance").classList.add("is-valid");  
    }
    if (isNaN(montantper)) {
        document.getElementById("errmtper").innerHTML="Veuillez choisir un type de maintenance périodique.";
        document.getElementById("prix").classList.add("is-invalid");
        erreur=true; 
        } else if(montantper === "") {
        document.getElementById("prix").classList.remove("is-valid");
        }
        else{
        document.getElementById("prix").classList.remove("is-invalid");
        document.getElementById("prix").classList.add("is-valid");  
        }
    if (statMT === ""){
        document.getElementById("errstatMT").innerHTML="Veuillez mettre à jour le statut.";
        document.getElementById("statut-maintenance").classList.add("is-invalid");
        erreur=true;        
    }else {
        document.getElementById("statut-maintenance").classList.remove("is-invalid");
        document.getElementById("statut-maintenance").classList.add("is-valid"); 
    }


if (erreur) {
    return;
}
    event.target.submit();
    }

function validerFormulaireModifMTPER(event) {
    event.preventDefault();

    let newStat    = document.getElementById("nouveau-statut").value.trim();
    let plaq       = document.getElementById("plaquettesmodif");
    let disq       = document.getElementById("disquesmodif");
    let montantMod = document.getElementById("prixmodif");
    let reçuMTMod  = document.getElementById("reçu-mt");
    let champsPeriodique = document.getElementById('champs-periodique');

    let erreur = false;

    document.getElementById("errprixmodif").innerHTML  = "";
    document.getElementById("errreçumt").innerHTML     = "";
    document.getElementById("errnewStat").innerHTML    = "";
    document.getElementById("errplaqModif").innerHTML  = "";
    document.getElementById("errdisqModif").innerHTML  = "";

    // Activer/désactiver selon statut
    if (newStat === "terminee") {
        montantMod.disabled = false;
        reçuMTMod.disabled  = false;
        if (champsPeriodique.style.display === 'block') {
            plaq.disabled = false;
            disq.disabled = false;
        }
    } else {
        plaq.disabled       = true;
        disq.disabled       = true;
        montantMod.disabled = true;
        reçuMTMod.disabled  = true;
        plaq.classList.remove("is-valid", "is-invalid");
        disq.classList.remove("is-valid", "is-invalid");
        montantMod.classList.remove("is-valid", "is-invalid");
        reçuMTMod.classList.remove("is-valid", "is-invalid");
    }

    // Lire les valeurs après activation
    let PlaqModif    = plaq.value.trim();
    let DisqModif    = disq.value.trim();
    let montantModif = montantMod.value.trim();
    let reçuMT       = reçuMTMod.files;

    // Validation statut
    if (newStat === "") {
        document.getElementById("errnewStat").innerHTML = "Veuillez mettre à jour le statut.";
        document.getElementById("nouveau-statut").classList.add("is-invalid");
        erreur = true;
    } else {
        document.getElementById("nouveau-statut").classList.remove("is-invalid");
        document.getElementById("nouveau-statut").classList.add("is-valid");
    }

    // Validation si terminée
    if (newStat === "terminee") {

        // Montant
        if (montantModif === "") {
            document.getElementById("errprixmodif").innerHTML = "Veuillez insérer le montant.";
            document.getElementById("prixmodif").classList.add("is-invalid");
            erreur = true;
        } else if (isNaN(montantModif)) {
            document.getElementById("errprixmodif").innerHTML = "Valeur numérique requise.";
            document.getElementById("prixmodif").classList.add("is-invalid");
            erreur = true;
        } else {
            document.getElementById("prixmodif").classList.remove("is-invalid");
            document.getElementById("prixmodif").classList.add("is-valid");
        }

        // Reçu
        if (reçuMT.length === 0) {
            document.getElementById("errreçumt").innerHTML = "Veuillez insérer le reçu.";
            document.getElementById("reçu-mt").classList.add("is-invalid");
            erreur = true;
        } else {
            document.getElementById("reçu-mt").classList.remove("is-invalid");
            document.getElementById("reçu-mt").classList.add("is-valid");
        }

        // Plaquettes et disques seulement si périodique
        if (champsPeriodique.style.display === 'block') {
            if (PlaqModif === "") {
                document.getElementById("errplaqModif").innerHTML = "Veuillez mettre à jour l'état des plaquettes.";
                document.getElementById("plaquettesmodif").classList.add("is-invalid");
                erreur = true;
            } else {
                document.getElementById("plaquettesmodif").classList.remove("is-invalid");
                document.getElementById("plaquettesmodif").classList.add("is-valid");
            }
            if (DisqModif === "") {
                document.getElementById("errdisqModif").innerHTML = "Veuillez mettre à jour l'état des disques.";
                document.getElementById("disquesmodif").classList.add("is-invalid");
                erreur = true;
            } else {
                document.getElementById("disquesmodif").classList.remove("is-invalid");
                document.getElementById("disquesmodif").classList.add("is-valid");
            }
        }
    }
    if (erreur) return;
    event.target.submit();
}

function validerFormulaireMaintenanceCor(event){
    event.preventDefault();

    let datePanneMt = document.getElementById("date-maintenance-cor").value.trim();
    let StatutMtCor = document.getElementById("statut-maintenance-cor").value.trim();

    let erreur = false;

    document.getElementById("errdatemtCor").innerHTML  = "";
    document.getElementById("errstatutmtCor").innerHTML  = "";

    if(datePanneMt === ""){
        document.getElementById("errdatemtCor").innerHTML = "Veuillez saisir la date de la maintenance.";
        document.getElementById("date-maintenance-cor").classList.add("is-invalid");
    erreur = true;      
    }else{
        document.getElementById("date-maintenance-cor").classList.remove("is-invalid");
        document.getElementById("date-maintenance-cor").classList.add("is-valid");        
    }
    if(StatutMtCor === ""){
        document.getElementById("errstatutmtCor").innerHTML = "Veuillez choisir un statut.";
        document.getElementById("statut-maintenance-cor").classList.add("is-invalid");
    erreur = true;      
    }else{
        document.getElementById("statut-maintenance-cor").classList.remove("is-invalid");
        document.getElementById("statut-maintenance-cor").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();
}

function validerFormulaireConvocation(event){
    event.preventDefault();
    let motifConvo=document.getElementById("motifconvo").value.trim();

    let erreur = false;
    
    document.getElementById("errMotifConvo").innerHTML="";

    if (motifConvo === ""){
        document.getElementById("errMotifConvo").innerHTML = "Veuillez saisir le motif.";
        document.getElementById("motifconvo").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("motifconvo").classList.remove("is-invalid");
        document.getElementById("motifconvo").classList.add("is-valid");        
    }

    if (erreur) return;


    event.target.submit();
}

function validerFormulaireChauffeurModif(event){
    event.preventDefault();

    let EtatSante=document.getElementById("etat-sante").value.trim();
    let CategPermis=document.getElementById("permis").value.trim();
    let NumPermis=document.getElementById("numPermis").value.trim();
    let DateExpPermis=document.getElementById("dateExpPermis").value.trim();
    let DateDispoChauff=document.getElementById("dateDispoChauff").value.trim();


    let erreur = false;
    
    document.getElementById("erretatsante").innerHTML="";
    document.getElementById("errpermis").innerHTML="";
    document.getElementById("errnumPermis").innerHTML="";
    document.getElementById("errdateExpPermis").innerHTML="";
    document.getElementById("errdateDispoChauff").innerHTML="";


    if (EtatSante === ""){
        document.getElementById("erretatsante").innerHTML = "Veuillez saisir l'état de santé.";
        document.getElementById("etat-sante").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("etat-sante").classList.remove("is-invalid");
        document.getElementById("etat-sante").classList.add("is-valid");        
    }

    if (CategPermis === ""){
        document.getElementById("errpermis").innerHTML = "Veuillez choisir une catégorie.";
        document.getElementById("permis").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("permis").classList.remove("is-invalid");
        document.getElementById("permis").classList.add("is-valid");        
    }

    if (NumPermis === ""){
        document.getElementById("errnumPermis").innerHTML = "Veuillez saisir le numéro de permis.";
        document.getElementById("numPermis").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("numPermis").classList.remove("is-invalid");
        document.getElementById("numPermis").classList.add("is-valid");        
    }
    
    if (DateExpPermis === ""){
        document.getElementById("errdateExpPermis").innerHTML = "Veuillez saisir la date d'expiration du permis.";
        document.getElementById("errdateExpPermis").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("errdateExpPermis").classList.remove("is-invalid");
        document.getElementById("errdateExpPermis").classList.add("is-valid");        
    }

    if (DateDispoChauff === ""){
        document.getElementById("errdateDispoChauff").innerHTML = "Veuillez saisir la date de mise à disposition.";
        document.getElementById("dateDispoChauff").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("dateDispoChauff").classList.remove("is-invalid");
        document.getElementById("dateDispoChauff").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();
}

function validerTraitementDemande(event){
        event.preventDefault();


    let ChauffeurDispo=document.getElementById("chauf-dispo").value.trim();
    let VehiculeDispo=document.getElementById("vehicule-dispo").value.trim();

    let erreur = false;
    
    document.getElementById("errChaufDispo").innerHTML="";
    document.getElementById("errVehiculeDispo").innerHTML="";


    if (ChauffeurDispo === ""){
        document.getElementById("errChaufDispo").innerHTML = "Veuillez choisir un chauffeur.";
        document.getElementById("chauf-dispo").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("chauf-dispo").classList.remove("is-invalid");
        document.getElementById("chauf-dispo").classList.add("is-valid");        
    }
    if (VehiculeDispo === ""){
        document.getElementById("errVehiculeDispo").innerHTML = "Veuillez choisir un véhicule.";
        document.getElementById("vehicule-dispo").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("vehicule-dispo").classList.remove("is-invalid");
        document.getElementById("vehicule-dispo").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();

}

function validerMotifRefus(event){
    event.preventDefault();

    let MotifRefus=document.getElementById("motifRefus").value.trim();

    let erreur = false;
    
    document.getElementById("errmotifRefus").innerHTML="";

    if (MotifRefus === ""){
        document.getElementById("errmotifRefus").innerHTML = "Veuillez saisir un motif.";
        document.getElementById("motifRefus").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("motifRefus").classList.remove("is-invalid");
        document.getElementById("motifRefus").classList.add("is-valid");        
    }
      if (erreur) return;

    event.target.submit();
}

function validerFormulaireAnomalieAgent(event){
     event.preventDefault();

    let typeAnomalie= document.getElementById("type-anomalie").value.trim();
    let chaufConcerne = document.getElementById("chauf-anomalie").value.trim();
    let vehicConcerne = document.getElementById("vec-anomalie").value.trim();
    let nivUrgence = document.getElementById("nv-urgence").value.trim();
    let pieceJointe = document.getElementById("piecejointe").files;

    let erreur = false;
    
    document.getElementById("errvecConcerne").innerHTML="";
    document.getElementById("errchaufConcerne").innerHTML="";
    document.getElementById("errTypeAnomalie").innerHTML="";
    document.getElementById("errnvUrgence").innerHTML="";
    document.getElementById("errPieceJointe").innerHTML="";

    if (typeAnomalie === ""){
        document.getElementById("errTypeAnomalie").innerHTML = "Veuillez saisir le type d'anomalie.";
        document.getElementById("type-anomalie").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("type-anomalie").classList.remove("is-invalid");
        document.getElementById("type-anomalie").classList.add("is-valid");        
    }
    if (chaufConcerne === ""){
        document.getElementById("errchaufConcerne").innerHTML = "Veuillez choisir un chauffeur.";
        document.getElementById("chauf-anomalie").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("chauf-anomalie").classList.remove("is-invalid");
        document.getElementById("chauf-anomalie").classList.add("is-valid");        
    }
    if (vehicConcerne === ""){
        document.getElementById("errvecConcerne").innerHTML = "Veuillez choisir un véhicule.";
        document.getElementById("vec-anomalie").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("vec-anomalie").classList.remove("is-invalid");
        document.getElementById("vec-anomalie").classList.add("is-valid");        
    }
    if (nivUrgence === ""){
        document.getElementById("errnvUrgence").innerHTML = "Veuillez choisir un niveau d'urgence.";
        document.getElementById("nv-urgence").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("nv-urgence").classList.remove("is-invalid");
        document.getElementById("nv-urgence").classList.add("is-valid");        
    }
    if (pieceJointe.length === 0 ){
        document.getElementById("errPieceJointe").innerHTML = "Veuillez importer un fichier.";
        document.getElementById("piecejointe").classList.add("is-invalid");
    erreur = true;        
    }else {
       document.getElementById("piecejointe").classList.remove("is-invalid");
        document.getElementById("piecejointe").classList.add("is-valid");        
    }

    if (erreur) return;

    event.target.submit();
}

function markAsRead(notif) {
    notif.classList.remove("notif-unread");
    notif.classList.add("notif-read");
        updateBadge();
}
function updateBadge() {
    let unread = document.querySelectorAll(".notif-unread").length;
    let badge = document.getElementById("notif-badge");

    if (unread === 0) {
        badge.style.display = "none";
    } else {
        badge.style.display = "inline-block";
        badge.textContent = unread;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    updateBadge();
});
function markAllRead() {
    document.querySelectorAll(".notif-unread").forEach(notif => {
        notif.classList.remove("notif-unread");
        notif.classList.add("notif-read");
    });
    updateBadge();
}


let allRows = [];           // toutes les lignes du tableau (sans la ligne "aucun résultat")
let filteredRows = [];      // lignes après filtrage/recherche
let currentPage = 1;
let rowsPerPage = 5;        // nombre de lignes par page

document.addEventListener("DOMContentLoaded", function () {
    // Récupérer toutes les lignes du corps du tableau (sans #no-result)
    allRows = Array.from(document.querySelectorAll("table tbody tr:not(#no-result)"));
    filteredRows = [...allRows];
    currentPage = 1;
    afficherPage();
    updateBadge();  // pour les notifications
});

   // ===== AFFICHAGE =====
function afficherPage() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    allRows.forEach(row => row.style.display = "none");
    filteredRows.slice(start, end).forEach(row => row.style.display = "");

    // Gestion du message "aucun résultat"
    const noResult = document.getElementById("no-result");
    if (filteredRows.length === 0) {
        noResult.style.display = "";
    } else {
        noResult.style.display = "none";
    }

    creerPagination();
}

    // ===== PAGINATION =====
    function creerPagination() {

        pagination.innerHTML = "";

        const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

        if (totalPages === 0) return;

        pagination.innerHTML += `
        <li class="page-item ${currentPage===1?"disabled":""}">
            <a class="page-link" href="#" onclick="changerPage(${currentPage-1})">Précédent</a>
        </li>`;

        for (let i = 1; i <= totalPages; i++) {
            pagination.innerHTML += `
            <li class="page-item ${currentPage===i?"active":""}">
                <a class="page-link" href="#" onclick="changerPage(${i})">${i}</a>
            </li>`;
        }

        pagination.innerHTML += `
        <li class="page-item ${currentPage===totalPages?"disabled":""}">
            <a class="page-link" href="#" onclick="changerPage(${currentPage+1})">Suivant</a>
        </li>`;
    }

    // ===== CHANGER PAGE =====
    window.changerPage = function(page) {

        const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

        if (page < 1 || page > totalPages) return;

        currentPage = page;
        afficherPage();
    };



    // Variables pour les cartes
let allCards = [];
let filteredCards = [];
let currentPageCards = 1;
let cardsPerPage = 4;

// Initialisation spécifique à la page maintenance
function initMaintenancePagination() {
    allCards = Array.from(document.querySelectorAll('.detail-vt'));
    filteredCards = [...allCards];
    currentPageCards = 1;
    afficherCartes();
    creerPaginationCartes();
}

function afficherCartes() {
    const start = (currentPageCards - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Cacher toutes les cartes
    allCards.forEach(card => card.style.display = 'none');
    // Afficher les cartes de la page courante
    filteredCards.slice(start, end).forEach(card => card.style.display = 'block');
    creerPaginationCartes();
}

function creerPaginationCartes() {
    const paginationContainer = document.getElementById('pagination-cartes');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Précédent
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPageCards === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#">Précédent</a>`;
    prevLi.onclick = (e) => { e.preventDefault(); if (currentPageCards > 1) changerPageCartes(currentPageCards - 1); };
    paginationContainer.appendChild(prevLi);

    // Numéros de pages
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${currentPageCards === i ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.onclick = (e) => { e.preventDefault(); changerPageCartes(i); };
        paginationContainer.appendChild(li);
    }

    // Suivant
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPageCards === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#">Suivant</a>`;
    nextLi.onclick = (e) => { e.preventDefault(); if (currentPageCards < totalPages) changerPageCartes(currentPageCards + 1); };
    paginationContainer.appendChild(nextLi);
}

function changerPageCartes(page) {
    currentPageCards = page;
    afficherCartes();
}