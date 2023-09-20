let active_username = localStorage.getItem("active_username");

function displayAllShifts() {

    // להשיג את המשתמש הנוכחי
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('userName');
    const selectedJob = urlParams.get('selectedJob');
    const selectedBranch = urlParams.get('selectedBranch');
    $("#user-info").text(userName);

    const existing_emp = findEmployee(userName);
    const shift_table = $("#shifts-table");

    // להסיר את כל המידע הקיים במקרה שכבר מופיע
    shift_table.innerHTML = "";
    let total_money = 0;

    // למלא את רשימת כל המשמרות של המשתמש
    existing_emp.shifts.forEach(shift => {
        if ((selectedJob == null || selectedJob == "null" || shift.jobType == selectedJob) &&
            (selectedBranch == null || selectedBranch == "null" || shift.branch == selectedBranch)) {
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
        }
    });

    $("#total-money").text(total_money + " ₪");

    // להשיג רשימת תפקידים - ללא כפילויות
    const distinctJobs = new Set();
    existing_emp.shifts.forEach(shift => {
        distinctJobs.add(shift.jobType);
    });

    $("#filterJobs").innerHTML = "";
    $("#filterJobs").append(`<option value="null">הצג הכל</option>`);
    distinctJobs.forEach(distinctJob => {
        let isSelected = "";
        if (selectedJob == distinctJob){
            isSelected = " selected ";
        }
        $("#filterJobs").append(`<option value="${distinctJob}" ${isSelected}>${distinctJob}</option>`);
    });

    // להשיג רשימת סניפים - ללא כפילויות
    const distinctBranches = new Set();
    existing_emp.shifts.forEach(shift => {
        distinctBranches.add(shift.branch);
    });

    $("#filterBranches").innerHTML = "";
    $("#filterBranches").append(`<option value="null">הצג הכל</option>`);
    distinctBranches.forEach(distinctBranch => {
        let isSelected = "";
        if (selectedBranch == distinctBranch){
            isSelected = " selected ";
        }
        $("#filterBranches").append(`<option value="${distinctBranch}" ${isSelected}>${distinctBranch}</option>`);
    });
}

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

    $('#filterJobs').change(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('userName');
        const selectedBranch = urlParams.get('selectedBranch');
        const selectedJob = $(this).val()

        window.location.href = "home.html?userName=" + userName +
            "&selectedJob=" + selectedJob +
            "&selectedBranch=" + selectedBranch;
    });

    $('#filterBranches').change(function () {
        const urlParams = new URLSearchParams(window.location.search);
        const userName = urlParams.get('userName');
        const selectedJob = urlParams.get('selectedJob');
        const selectedBranch = $(this).val();

        window.location.href = "home.html?userName=" + userName +
            "&selectedJob=" + selectedJob +
            "&selectedBranch=" + selectedBranch;
    });

    displayAllShifts();

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

