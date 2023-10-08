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

    // נחפש את שם המשתמש כמפתח בלוקל סטורג
    const existing_emp = findEmployee(username);

    // אם המשתמש לא קיים ברשימה
    if (existing_emp == null) {
        alert("אין משתמש רשום בשם זה. נא לבדוק את פרטי הכניסה");
        return;
    }
    // שם המשתמש קיים, לבדוק את הסיסמה
    else {
        if (password == existing_emp.password) {
            // לשמור מי המשתמש שנכנס למערכת
            localStorage.setItem("active_username", username);

            // לפתוח את העמוד הראשי ולהציג פרטים רק של המשתמש הנוכחי
            navigateWithTransition("home.html?userName=" + username);
        } else {
            alert("סיסמה שגויה");
        }
    }
}

function navigateWithTransition(url) {
    // הוספת אפקט לפני מעבר לדף הבא
    document.body.classList.add("fade-out");

    // לאחר זמן נתון (שניה) עבור לדף הבא
    setTimeout(() => {
        window.location.href = url;
    }, 500); 
}

function signup() {
    // לחסום הרצה רגילה של האירוע
    event.preventDefault();

    // לעבור לעמוד הרישום
    navigateWithTransition("register-user.html");
}