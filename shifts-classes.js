class Employee {
    constructor(email, username, password, firstName, lastName, yearOfBirth, shifts, cvWorks = [], cvEducations = []) {
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

        // נטען את רשימת כל המשתמשים השמורים בלוקל סטורג
        let employee_list = getAllEmployees();
        const existing_user = findEmployee(this.username);

        if (!existing_user) {
            // נוסיף את העובד החדש לרשימה
            employee_list.push(this);
        }
        else {

            // נסיר את העובד הנוכחי מהרשימה כי יש שם את המידע הישן
            employee_list = employee_list.filter(emp => emp.username !== this.username);

            // נוסיף את העובד הנוכחי עם המידע החדש לרשימה
            employee_list.push(this);
        }

        // נשמור את הרשימה ללוקל סטורג
        localStorage.setItem("employee_list", JSON.stringify(employee_list));
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
        return (this.endHour - this.startHour)*this.hourPayment;
    }
}

function getAllEmployees() {
    // משיג את רשימת העובדים
    let employee_list = JSON.parse(localStorage.getItem("employee_list"));
    if (!employee_list) {
        return [];
    }
    // ממיר את הרשימה לאובייקטים
    employee_list = employee_list.map(item =>
        new Employee(item.email, item.username, item.password,
            item.firstName, item.lastName, item.yearOfBirth,
            item.shifts, item.cvWorks, item.cvEducations));
    return employee_list;
}

function findEmployee(userName) {
    let employee_list = getAllEmployees();
    if (!employee_list) {
        return null;
    }

    // למצוא את האובייקט של המשתמש הנוכחי
    const current_user = employee_list.find(emp => emp.username == userName);
    return current_user;
}