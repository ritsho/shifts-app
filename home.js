$(document).ready(function () {
    let active_username = localStorage.getItem("active_username");
    $("#user-info").text(active_username);


    $("#logout-button").click(function () {
        // ניקוי המשתמש הנוכחי 
        localStorage.setItem("active_username", "");

        // חזרה לעמוד הכניסה
        window.location.href = "login.html";

    });

    // להשיג את המשתמש הנוכחי
    const existing_emp = findEmployee(active_username);
    const shift_table = $("#shifts-table");

    // למלא את רשימת כל המשמרות של המשתמש
    existing_emp.shifts.forEach(shift => {
        const row = $("<tr>");
        row.append(`<td>${shift.date}</td>`);
        row.append(`<td>${shift.startHour}:00</td>`);
        row.append(`<td>${shift.endHour}:00</td>`);
        row.append(`<td>${shift.hourPayment} ₪</td>`);
        row.append(`<td>${shift.jobType}</td>`);
        row.append(`<td>${shift.branch}</td>`);
        row.append(`<td>${shift.mezahe}</td>`);
        row.append(`<td>${shift.notes}</td>`);
        row.append(`<button>מחק</td>`);
        row.append(`<button>עדכון</td>`);

        shift_table.append(row);
    })


});