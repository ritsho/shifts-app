class Employee {
    constructor(email, username, password, firstName, lastName, yearOfBirth, shifts = [], cvWorks = [], cvEducations = []) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.cvWorks = cvWorks;
        this.cvEducations = cvEducations;
        this.shifts = shifts.map(s =>
            new Shift(s.date, s.startHour, s.endHour, s.hourPayment, s.jobType, s.branch, s.id, s.notes));
    }

    CheckDetails() {
        // לבדוק שכל הנתונים תקינים
    }

    Save() {

        const exisingEmp = findEmployee(this.username);

        // אם המשתמש לא קיים כבר
        if (exisingEmp == null) {
            // נשמור אותו בצורה רגילה
            localStorage.setItem(this.username, JSON.stringify(this));
        }
        // אם המשתמש קיים
        else {
            // אם המשתמש קיים אבל יש לו סיסמה אחרת, לא נאפשר שמירה
            if (exisingEmp.password != this.password) {
                alert(" לא ניתן לשנות סיסמה בעזרת רישום חדש");
            }
            // אם המשתמש קיים - עם אותה סיסמה
            else {
                // נשמור את כל הפרטים
                localStorage.setItem(this.username, JSON.stringify(this));
            }

        }

    }
}

class CV_Work {
    constructor(startYear, endYear, bossName, jobName) {
        this.startYear = startYear;
        this.endYear = endYear;
        this.bossName = bossName;
        this.jobName = jobName;
    }

    CheckDetails() {
        // לבדוק שכל הנתונים תקינים
    }

}

class CV_Education {
    constructor(startYear, endYear, mosadName, educationName) {
        this.startYear = startYear;
        this.endYear = endYear;
        this.mosadName = mosadName;
        this.educationName = educationName;
    }
    CheckDetails() {
        // לבדוק שכל הנתונים תקינים
    }

}

class Shift {
    constructor(date, startHour, endHour, hourPayment, jobType, branch, id, notes) {
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.hourPayment = hourPayment;
        this.jobType = jobType;
        this.branch = branch;
        this.id = id;
        this.notes = notes;
    }

    GetTotalPayment() {
        // לחשב כמה משכורת ירוויח העובד מהמשמרת הנוכחית
        return (this.endHour - this.startHour) * this.hourPayment;
    }
}

function findEmployee(employeeName) {

    let existingEmp = localStorage.getItem(employeeName);
    if (!existingEmp) {
        return null;
    }

    // נשיג את האוביקט ג'ייסון מהלוקל סטורג
    let employeeJson = JSON.parse(existingEmp);

    // נמיר אותו לקלאס
    let employeeClass = new Employee(employeeJson.email, employeeJson.username, employeeJson.password,
        employeeJson.firstName, employeeJson.lastName, employeeJson.yearOfBirth,
        employeeJson.shifts, employeeJson.cvWorks, employeeJson.cvEducations);

    return employeeClass;
}

var CITIES_LIST = ["אילת", "ראש העין", "בני ברק", "חיפה", "ירושלים", "נתניה", "רחובות", "תל אביב"];
var JOB_TYPES_LIST = ["מנהלת", "מנכלית", "מזכירה", "מנהל חשבונות", "רופאה בכירה", "מנתחת", "מתכנתת", "מומחית סייבר"];
