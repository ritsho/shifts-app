function login() {
    // לחסום הרצה רגילה של האירוע
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // בדיקה אם לא כתבו שם משתמש או סיסמה
    if (username == "") {
        alert("נא למלא שם משתמש");
        return;
    }
    else if (password == "") {
        alert("נא למלא סיסמה");
        return;
    }

    // להשיג את רשימת המשתמשים
    // נטען את המידע השמור בלוקל סטורג
    let employee_list = JSON.parse(localStorage.getItem("employee_list"));
    employee_list = employee_list.map(item => new Employee(item.email, item.username, item.password1, item.firstname, item.lastname, item.birthYear));

    const existingEmp = employee_list.find(emp => emp.username == username);

    // אם המשתמש לא קיים ברשימה
    if (!existingEmp) {
        alert("שם המשתמש לא קיים");
        return;
    }
    // שם המשתמש קיים, לבדוק את הסיסמה
    else {
        if (password == existingEmp.password) {
            // לשמור מי המשתמש שנכנס למערכת
            localStorage.setItem("active_user", username);

            // לפתוח את העמוד הראשי
            window.location.href = "home-page.html";
        } else {
            alert("סיסמה שגויה");
        }
    }
}

function signup() {
    // לחסום הרצה רגילה של האירוע
    event.preventDefault();

    // לעבור לעמוד הרישום
    window.location.href = "register-update.html";
}