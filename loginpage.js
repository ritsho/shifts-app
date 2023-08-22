let users_list = [];
let pwd_list = [];

function login() {

    // let users = [];
    // let pwds = [];
    // users.push("debug");
    // pwds.push("debug");
    // localStorage.setItem("users_list",JSON.stringify(users));
    // localStorage.setItem("pwd_list",JSON.stringify(pwds));

    // להשיג את רשימת המשתמשים והסיסמאות
    users_list = JSON.parse(localStorage.getItem("users_list"));
    pwd_list = JSON.parse(localStorage.getItem("pwd_list"));


    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // בדיקה אם לא כתבו שם משתמש או סיסמה
    if (username == "") {
        alert("נא למלא שם משתמש");
    }
    else if (password == "") {
        alert("נא למלא סיסמה");
    }
    // אם המשתמש לא קיים ברשימה
    else if (!users_list.includes(username)) {
        alert("שם המשתמש לא קיים");
    }
    // שם המשתמש קיים, לבדוק את הסיסמה
    else {
        // להשיג את האינדקס של המשתמש 
        let user_index = users_list.indexOf(username);
        let real_pwd = pwd_list[user_index];

        if (password == real_pwd) {
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
    // לעבור לעמוד הרישום
    window.location.href = "register-update.html";
}