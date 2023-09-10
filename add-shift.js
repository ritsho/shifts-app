$(document).ready(function () {

    $("#back-button").click(function () {
        event.preventDefault();
        history.back();
    });

    $("#save-button").click(function () {

        let shift_date = $("#shift-date").val();
        let shift_time_start = parseInt($("#shift-time-start").val());
        let shift_time_end = parseInt($("#shift-time-end").val());
        let hour_price = parseInt($("#hour-price").val());
        let job_type = $("#job-type").val();
        let branch = $("#branch").val();
        let mezahe = $("#mezahe").val();
        let notes = $("#notes").val();


        if (shift_time_end < shift_time_start) {
            alert("זמן התחלה חייב להיות לפני זמן סיום");
            return;
        }
     
        // מה השם משתמש 
        let current_username = localStorage.getItem("active_username");

        // למצוא את האובייקט של המשתמש הנוכחי
        const current_user =  findEmployee(current_username);

        // ניצור אובייקט שמייצג משמרת
        let shift1 = new Shift(shift_date, shift_time_start, shift_time_end,
            hour_price, job_type, branch, mezahe, notes);

        // נוסיף למשתמש
        current_user.shifts.push(shift1);
        
        //שמירת כל פרטי המשתמש ללוקל סטורג - כולל המשמרת החדשה
        current_user.Save();

        // לחסום הרצה רגילה של האירוע
        event.preventDefault();
        // חזרה לעמוד הראשי עם כל המשמרות
        window.location.href = "home.html";
    });
});