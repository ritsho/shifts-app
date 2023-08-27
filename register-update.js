
function containsNumbers(str) {
    return /\d/.test(str);
}

function containsLetter(str) {
    return /[a-zA-Zא-ת]/.test(str);
}

$(document).ready(function () {
    $("#register").click(function () {

        // לחסום הרצה רגילה של האירוע
        event.preventDefault();

        // להשיג את כל הנתונים מה 
        //HTML
        let email = $("#email").val();
        let username = $("#username").val();
        let password1 = $("#password1").val();
        let password2 = $("#password2").val();
        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let age = parseInt($("#age").val());

        // חישוב מה שנת הלידה
        let birthYear = new Date().getFullYear() - age;

        // בדיקת תקינות 
        if (!email.includes("@") || !email.includes(".")) {
            alert("האימייל לא תקין");
            return;
        }

        if (username.length < 6) {
            alert("שם משתמש קצר מדי");
            return;
        }

        if (password1.length < 6) {
            alert("סיסמה קצרה מדי");
            return;
        }

        if (!containsNumbers(password1)) {
            alert("יש לכתוב בסיסמה לפחות מספר אחד");
            return;
        }

        if (!containsLetter(password1)) {
            alert("יש לכתוב בסיסמה לפחות אות אחת");
            return;
        }

        if (password1 != password2) {
            alert("הסיסמה אינה תואמת");
            return;
        }

        if (firstname.length < 2) {
            alert("שם פרטי קצר מדי");
            return;
        }

        if (lastname.length < 2) {
            alert("שם משפחה קצר מדי");
            return;
        }
        if (age < 18 || age > 65) {
            alert("הגיל צריך להיות בין 18 ל65");
            return;
        }

        // ניצור אובייקט של עובד חדש
        let new_emp = new Employee(email, username, password1, firstname, lastname, birthYear);
        
        // נטען את המידע השמור בלוקל סטורג
        let employee_list = JSON.parse(localStorage.getItem("employee_list"));
        
        // אם אין שום מידע
        if (employee_list == null) {
            employee_list = [];
        // אם יש מידע - נמיר לרשימה
        } else {
            employee_list = employee_list.map(item => new Employee(item.email, item.username, item.password1, item.firstname, item.lastname, item.birthYear));
        }


        employee_list.push(new_emp);
        localStorage.setItem("employee_list", JSON.stringify(employee_list));

        // מעבר לעמוד הבית
        window.location.href = "home-page.html";
    });
})
