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

    // נשיג את רשימת כל המשתמשים
    let employee_list = getAllEmployees();
  
    // אם הרשימה ריקה
    if (!employee_list) {
        alert("אין משתמשים רשומים. נא להרשם לאתר");
        return;
    }
    // נחפש את שם המשתמש שהרגע הקלידו, ברשימה
    const existingEmp = employee_list.find(emp => emp.username == username);

    // אם המשתמש לא קיים ברשימה
    if (!existingEmp) {
        alert("אין משתמש רשום בשם זה. נא לבדוק את פרטי הכניסה");
        return;
    }
    // שם המשתמש קיים, לבדוק את הסיסמה
    else {
        if (password == existingEmp.password) {
            // לשמור מי המשתמש שנכנס למערכת
            localStorage.setItem("active_username", username);

            // לפתוח את העמוד הראשי
            window.location.href = "home.html";
        } else {
            alert("סיסמה שגויה");
        }
    }
}

function signup() {
    // לחסום הרצה רגילה של האירוע
    event.preventDefault();

    // לעבור לעמוד הרישום
    window.location.href = "register-user.html";
}