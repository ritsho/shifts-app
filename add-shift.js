$(document).ready(function () {

    $("#back-button").click(function () {
        event.preventDefault();
        history.back();
    });

    $("#save-button").click(function () {
        // לחסום הרצה רגילה של האירוע כדי שהבדיקות שלנו יעבדו
        event.preventDefault();

        // מה השם משתמש 
        let current_username = localStorage.getItem("active_username");

        // אם אין משתמש שנכנס למערכת, נחזור לעמוד הכניסה
        if (!current_username || current_username == ""){
            alert("נא להכנס למערכת עם שם משתמש וסיסמה");
            window.location.href = "login.html";
            return;
        }
        
        let shift_date = $("#shift-date").val();
        let shift_time_start = parseInt($("#shift-time-start").val());
        let shift_time_end = parseInt($("#shift-time-end").val());
        let hour_price = parseInt($("#hour-price").val());
        let job_type = $("#job-type").val();
        let branch = $("#branch").val();
        let id = $("#id").val();
        let notes = $("#notes").val();


        if (shift_time_end < shift_time_start) {
            alert("זמן התחלה חייב להיות לפני זמן סיום");
            return;
        }

        // למצוא את האובייקט של המשתמש הנוכחי
        const current_user = findEmployee(current_username);

        // ניצור אובייקט שמייצג משמרת
        let shift1 = new Shift(shift_date, shift_time_start, shift_time_end,
            hour_price, job_type, branch, id, notes);

        // נוסיף למשתמש
        current_user.shifts.push(shift1);
        
        //שמירת כל פרטי המשתמש ללוקל סטורג - כולל המשמרת החדשה
        current_user.Save();
       
        // חזרה לעמוד הראשי עם כל המשמרות של המשתמש הנוכחי בלבד
        window.location.href = "home.html?userName=" + current_username;
    });

    var snifimDataList = document.getElementById("snifim");

    // נוסיף את כל הפריטים מהרשימה של הסניפים לדאטה ליסט של הסניפים
    CITIES_LIST.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item;
        snifimDataList.appendChild(option);
    });

    var jobTypesDataList = document.getElementById("job-types");
    JOB_TYPES_LIST.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item;
        jobTypesDataList.appendChild(option);
    });
});