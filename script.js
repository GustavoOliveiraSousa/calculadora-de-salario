//Creating the employee
function addEmployee() {
    var name = document.getElementById("name").value + ' =';
    var days = document.getElementById("days").value;
    var halfDays = document.getElementById("halfDays").value;
    var rate = document.getElementById("rate").value;
    var salary = ((days + (halfDays * 0.5)) * rate) / 10;


    var tableBody = document.getElementById("employee-table-body");

    var newRow = document.createElement("tr");
    var nameCol = document.createElement("td");
    var salaryCol = document.createElement("td");

    var deleteCol = document.createElement("td");

    nameCol.innerHTML = name;
    salaryCol.innerHTML = salary;

    // add delete button
    var deleteButton = document.createElement("button");

    deleteButton.style.borderRadius = '10px'
    deleteButton.innerHTML = "Deletar";
    deleteButton.onclick = function () {
        tableBody.removeChild(newRow);
    };
    deleteCol.appendChild(deleteButton);


    newRow.appendChild(nameCol);
    newRow.appendChild(salaryCol);
    newRow.appendChild(deleteCol);

    tableBody.appendChild(newRow);


    document.getElementById("name").value = '';
    document.getElementById("days").value = '';
    document.getElementById("halfDays").value = '';
    document.getElementById("rate").value = '';
}


//export table to txt
function exportTable() {
    var table = document.getElementById("employee-table");
    var txtString = "";

    for (var i = 1; i < table.rows.length; i++) {
        var rowData = table.rows[i].cells;
        for (var j = 0; j < rowData.length; j++) {
            if (j === 0) {
                txtString += rowData[j].innerHTML + " ";
            } else {
                var salary = parseFloat(rowData[j].innerHTML);
                if (!isNaN(salary)) {
                    var salaryFormatted = salary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                    txtString += salaryFormatted + "\n";
                }
            }
        }
    }

    var file = new Blob([txtString], { type: 'text/plain' });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = "employee_salary.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

// export table to WhatsApp
function exportTableToWhatsApp() {
    var table = document.getElementById("employee-table");
    var message = "";

    for (var i = 1; i < table.rows.length; i++) {
        var rowData = table.rows[i].cells;
        for (var j = 0; j < rowData.length; j++) {
            if (j === 0) {
                message += rowData[j].innerHTML + " ";
            } else {
                var salary = parseFloat(rowData[j].innerHTML);
                if (!isNaN(salary)) {
                    var salaryFormatted = salary.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                    message += salaryFormatted + "\n";
                }
            }
        }
    }

    // for (var i = 1; i < table.rows.length; i++) {
    //     var rowData = table.rows[i].cells;
    //     for (var j = 0; j < rowData.length; j++) {
    //         if (j === 0) {
    //             message += rowData[j].innerHTML + " ";
    //         } else {
    //             var salaryFormatted = parseFloat(rowData[j].innerHTML).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    //             message += salaryFormatted + "\n";
    //         }
    //     }
    // }
    // Abre uma conversa pré-preenchida no WhatsApp Web
    // var whatsappUrl = "https://web.whatsapp.com/send?text=" + encodeURIComponent(message);

    // Abre a aplicação do WhatsApp no dispositivo móvel
    //var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(message);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Abre a aplicação do WhatsApp no dispositivo móvel
        var whatsappUrl = "whatsapp://send?text=" + encodeURIComponent(message);
        window.open(whatsappUrl, "_blank");
    } else {
        // Abre uma conversa pré-preenchida no WhatsApp Web
        var whatsappUrl = "https://web.whatsapp.com/send?text=" + encodeURIComponent(message);
        window.open(whatsappUrl, "_blank");
    }

    window.open(whatsappUrl, "_blank");
}
