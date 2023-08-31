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

    // נטען את המידע השמור בלוקל סטורג
    let user_details = JSON.parse(localStorage.getItem("user_details"));


    // אם המשתמש לא קיים ברשימה
    if (!user_details) {
        alert("אין משתמשים רשומים. נא להרשם לאתר");
        return;
    }
    // שם המשתמש קיים, לבדוק את הסיסמה
    else {
        let employee = new Employee(user_details.email, user_details.username, user_details.password, user_details.firstname, user_details.lastname, user_details.birthYear);
        if (password == employee.password) {
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