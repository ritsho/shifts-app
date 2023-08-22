
function register(){
    // להשיג את כל הנתונים מה 
    //HTML
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let age = parseInt(document.getElementById("age").value);


    // בדיקת תקינות 
    if (!email.contains("@") || !email.contains(".")){
        alert("מייל לא תקין");
    }
    // שמירה

    // מעבר לעמוד הבית
}