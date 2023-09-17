let active_username = localStorage.getItem("active_username");

$(document).ready(function () {

    $("#add-shift-button").click(function () {
        // עבור לעמוד הוספת משמרת
        window.location.href = "add-shift.html";
    });

    $("#logout-button").click(function () {
        // ניקוי המשתמש הנוכחי 
        localStorage.setItem("active_username", "");

        // חזרה לעמוד הכניסה
        window.location.href = "login.html";
    });

    // להשיג את המשתמש הנוכחי
    const urlParams = new URLSearchParams(window.location.search);
	const userName = urlParams.get('userName');
    $("#user-info").text(userName);

    const existing_emp = findEmployee(userName);
    const shift_table = $("#shifts-table");

    let total_money = 0;
    // למלא את רשימת כל המשמרות של המשתמש
    existing_emp.shifts.forEach(shift => {
        const row = $("<tr>");
        row.append(`<td>${shift.date}</td>`);
        row.append(`<td>${shift.startHour}:00</td>`);
        row.append(`<td>${shift.endHour}:00</td>`);
        row.append(`<td>${shift.hourPayment} ₪</td>`);
        row.append(`<td>${shift.jobType}</td>`);
        row.append(`<td>${shift.branch}</td>`);
        row.append(`<td>${shift.GetTotalPayment()} ₪</td>`);
        row.append(`<button onclick="deleteShift(${shift.id})">מחק</td>`);
        row.append(`<button onclick="editShift(${shift.id})">עדכון</td>`);

        shift_table.append(row);
        total_money += shift.GetTotalPayment();
    });

    $("#total-money").text(total_money + " ₪");

});

function deleteShift(id) {
    let res = confirm("האם את.ה רוצה למחוק את משמרת " + id);
    if (res) {
        // למצוא את העובד הנוכחי
        const employee = findEmployee(active_username);

        // לסנן החוצה את המשמרת הספציפית שצריך למחוק
        employee.shifts = employee.shifts.filter(s => s.id !== id);
        employee.Save();
    }
}

