class Employee {
    constructor(email, username, password, firstName, lastName, yearOfBirth) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.cvWorks = [];
        this.cvEducations = []
        this.shifts = [];
    }

    CheckDetails() {
        // לבדוק שכל הנתונים תקינים
    }

    Save() {
        // לשמור את הנתונים ל
        // Local storage
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

class Shifts {
    constructor(date, startHour, endHour, hourPayment, jobType, branch) {
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.hourPayment = hourPayment;
        this.jobType = jobType;
        this.branch = branch;
    }

    GetTotalPayment() {
        // לחשב כמה משכורת ירוויח העובד מהמשמרת הנוכחית
    }
}