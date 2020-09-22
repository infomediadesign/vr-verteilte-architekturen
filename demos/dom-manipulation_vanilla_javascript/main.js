window.onload = function () {
    var button = document.getElementById("addButton");
    button.addEventListener("click", addEntry);

    showEntries();
};

function showEntries() {
    var entries = getEntries();                 // Ein Array mit allen gespeicherten Werten erhalten

    var html = "";
    for (var i = 0; i < entries.length; i++) {    // Für jedes Element im Array, lesen wir das Array aus und
        html += "<li><button class='delete' id='"+ i +"'>X</button> " + entries[i].text + " --- " + entries[i].priority + "<button class='priorityUp' id='"+ i +"'>^</button><button class='priorityDown' id='"+ i +"'>v</button></li>";     // fügen das jeweilige Element der Variable 'html' an.
    }

    document.getElementById("listPlaceholder").innerHTML = html;    // Setzen wir den Inhalt für das Cotainerelement

    var deleteButtons = document.getElementsByClassName("delete");  // Alle Lösch-Buttons selektieren
    var priorityUpButtons = document.getElementsByClassName("priorityUp");  // Alle Lösch-Buttons selektieren
    var priorityDownButtons = document.getElementsByClassName("priorityDown");  // Alle Lösch-Buttons selektieren        

    for(var i= 0; i<deleteButtons.length; i++) {                            // Für jeden selektierten Button: Füge einen 
        deleteButtons[i].addEventListener("click", deleteEntry);            // click-Eventlistener hinzu
        priorityUpButtons[i].addEventListener("click", priorityUp);          // click-Eventlistener hinzu
        priorityDownButtons[i].addEventListener("click", priorityDown);     // click-Eventlistener hinzu                
    }    
}

function priorityUp() {
    var id = this.getAttribute("id");                           // Wir speichern die ID des Elements ab, dass soeben das Event ausgelöst hat (Also der geklickte Button).

    var entries = getEntries();
    
    entries[id].priority = entries[id].priority + "*";          // An den Priority-Abteil des Eintrags noch einen Stern anhängen

    localStorage.setItem("entries", JSON.stringify(entries));   // Das aktualisierte Array im Localstorage speichern

    showEntries();    
}

function priorityDown() {
    var id = this.getAttribute("id");                           // Wir speichern die ID des Elements ab, dass soeben das Event ausgelöst hat (Also der geklickte Button).

    var entries = getEntries();
    
    entries[id].priority = entries[id].priority.substring(1,entries[id].priority.length); // Einen Stern entfernen, indem wir ein Zeichen weniger ausschneiden, als die Zeichenkette lang ist

    localStorage.setItem("entries", JSON.stringify(entries));   // Das aktualisierte Array im Localstorage speichern

    showEntries();    
}

function deleteEntry() {
    var id = this.getAttribute("id");                      // Wir speichern die ID des Elements ab, dass soeben das Event ausgelöst hat (Also der geklickte Button).

    var entries = getEntries();
    entries.splice(id, 1);                                 // An der Stelle 'id' des Arrays genau 1 Element entfernen

    localStorage.setItem("entries", JSON.stringify(entries));   // Das aktualisierte Array im Localstorage speichern

    showEntries();
}

function addEntry() {
    var entry = document.getElementById("entry").value;   // Den neuen Eintrag aus dem HTML Feld lesen

    if (entry != "") {
        var entries = getEntries();                     // Ein Array mit allen gespeicherten Werten erhalten

        var newEntry = { "text": entry, "priority":"*" };

        entries.push(newEntry);                         // Dem Array den neuen Wert hinzufügen
        localStorage.setItem("entries", JSON.stringify(entries));   // Das aktualisierte Array im Localstorage speichern
        
        showEntries();
        document.getElementById("entry").value = "";
    }
}

function getEntries() {
    var entries = new Array;                        // Ein leeres Array anlegen
    var entriesAsText = localStorage.getItem("entries");    // Einträge aus dem Localstorage auslesen

    if (entriesAsText != null)
        entries = JSON.parse(entriesAsText);        // Die Texteinträge in ein Array umwandeln

    return entries;                                 // Das Array an den Aufrufer zurückgeben
}