const DATABASE = {
    users: JSON.parse(localStorage.getItem('edupanel_users')) || null,
    classes: JSON.parse(localStorage.getItem('edupanel_classes')) || null,
    subjects: JSON.parse(localStorage.getItem('edupanel_subjects')) || null,
    grades: JSON.parse(localStorage.getItem('edupanel_grades')) || null,
    absences: JSON.parse(localStorage.getItem('edupanel_absences')) || null,
    lessons: JSON.parse(localStorage.getItem('edupanel_lessons')) || null,
    praises: JSON.parse(localStorage.getItem('edupanel_praises')) || null,
    remarks: JSON.parse(localStorage.getItem('edupanel_remarks')) || null
};

async function loadDemoData() {
    if (!DATABASE.users) {
        const data = {
            users: [
                { id: 1, name: "Admin User", email: "admin@edupanel.bg", password: "AdminEdu2026", role: "director", active: true },
                { id: 2, name: "Teacher", email: "teacher@edupanel.bg", password: "TeacherEdu2026", role: "teacher", active: true },
                { id: 3, name: "Student", email: "student@edupanel.bg", password: "StudentEdu2026", role: "student", class_id: 1, active: true },
                { id: 4, name: "Parent", email: "parent@edupanel.bg", password: "ParentEdu2026", role: "parent", child_id: 3, active: true }
            ],
            classes: [
                { id: 1, name: "10A", grade: 10, students: [3], teacher_id: 2 }
            ],
            subjects: [
                { id: 1, name: "Mathematics", teacher_id: 2, class_id: 1 }
            ],
            grades: [],
            absences: [],
            lessons: [],
            praises: [],
            remarks: []
        };
        
        Object.keys(data).forEach(key => {
            DATABASE[key] = data[key];
            localStorage.setItem('edupanel_' + key, JSON.stringify(data[key]));
        });
    }
}

function getUsers() { return DATABASE.users || []; }
function saveUsers(data) { DATABASE.users = data; localStorage.setItem('edupanel_users', JSON.stringify(data)); }
function getGrades() { return DATABASE.grades || []; }
function saveGrades(data) { DATABASE.grades = data; localStorage.setItem('edupanel_grades', JSON.stringify(data)); }
function getAbsences() { return DATABASE.absences || []; }
function saveAbsences(data) { DATABASE.absences = data; localStorage.setItem('edupanel_absences', JSON.stringify(data)); }
function getLessons() { return DATABASE.lessons || []; }
function saveLessons(data) { DATABASE.lessons = data; localStorage.setItem('edupanel_lessons', JSON.stringify(data)); }
function getPraises() { return DATABASE.praises || []; }
function savePraises(data) { DATABASE.praises = data; localStorage.setItem('edupanel_praises', JSON.stringify(data)); }
function getRemarks() { return DATABASE.remarks || []; }
function saveRemarks(data) { DATABASE.remarks = data; localStorage.setItem('edupanel_remarks', JSON.stringify(data)); }

loadDemoData();
