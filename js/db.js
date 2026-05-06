// Database with demo data
const initialDatabase = {
    users: [
        { id: 1, name: "Administrator", email: "admin@edupanel.bg", password: "AdminEdu2026", role: "director", active: true },
        { id: 2, name: "John Teacher", email: "teacher@edupanel.bg", password: "TeacherEdu2026", role: "teacher", active: true },
        { id: 3, name: "Emma Student", email: "student@edupanel.bg", password: "StudentEdu2026", role: "student", classId: 1, active: true },
        { id: 4, name: "Michael Parent", email: "parent@edupanel.bg", password: "ParentEdu2026", role: "parent", childId: 3, active: true },
        { id: 5, name: "Sarah Johnson", email: "sarah@school.bg", password: "Pass123", role: "student", classId: 1, active: true },
        { id: 6, name: "David Brown", email: "david@school.bg", password: "Pass123", role: "student", classId: 1, active: true },
        { id: 7, name: "Lisa Davis", email: "lisa@school.bg", password: "Pass123", role: "student", classId: 1, active: true },
        { id: 8, name: "Robert Teacher2", email: "teacher2@edupanel.bg", password: "TeacherEdu2026", role: "teacher", active: true }
    ],
    classes: [
        { id: 1, name: "10A", grade: 10, students: [3, 5, 6, 7], teacher: 2 },
        { id: 2, name: "10B", grade: 10, students: [], teacher: 8 },
        { id: 3, name: "11A", grade: 11, students: [], teacher: 2 }
    ],
    subjects: [
        { id: 1, name: "Mathematics", teacher: 2, classId: 1 },
        { id: 2, name: "English Language", teacher: 2, classId: 1 },
        { id: 3, name: "Bulgarian", teacher: 8, classId: 2 },
        { id: 4, name: "Physics", teacher: 2, classId: 1 },
        { id: 5, name: "History", teacher: 2, classId: 1 }
    ],
    grades: [
        { id: 1, studentId: 3, subjectId: 1, grade: 5, type: "written exam", date: "2026-01-15", comment: "Good effort" },
        { id: 2, studentId: 5, subjectId: 1, grade: 6, type: "oral exam", date: "2026-01-14", comment: "Excellent work" },
        { id: 3, studentId: 6, subjectId: 2, grade: 4, type: "homework", date: "2026-01-12", comment: "Needs improvement" },
        { id: 4, studentId: 7, subjectId: 1, grade: 5, type: "test", date: "2026-01-10", comment: "Good understanding" },
        { id: 5, studentId: 3, subjectId: 2, grade: 4, type: "class activity", date: "2026-01-08", comment: "Participated well" },
        { id: 6, studentId: 5, subjectId: 4, grade: 6, type: "project", date: "2026-01-05", comment: "Outstanding project" }
    ],
    absences: [
        { id: 1, studentId: 3, date: "2026-01-15", type: "absent", reason: "", excuse: false },
        { id: 2, studentId: 5, date: "2026-01-14", type: "late", reason: "Traffic", excuse: false },
        { id: 3, studentId: 6, date: "2026-01-12", type: "excused", reason: "Doctor appointment", excuse: true }
    ],
    praises: [
        { id: 1, studentId: 5, praise: "Excellent participation in class discussions", date: "2026-01-15", teacherId: 2 },
        { id: 2, studentId: 3, praise: "Great homework submission quality", date: "2026-01-14", teacherId: 2 },
        { id: 3, studentId: 7, praise: "Outstanding project presentation", date: "2026-01-13", teacherId: 2 },
        { id: 4, studentId: 5, praise: "Perfect attendance record", date: "2026-01-12", teacherId: 2 }
    ],
    remarks: [
        { id: 1, studentId: 6, remark: "Needs to focus more during lessons", date: "2026-01-10", teacherId: 2 },
        { id: 2, studentId: 3, remark: "Improve punctuality", date: "2026-01-08", teacherId: 2 }
    ],
    lessons: []
};

// Get database from localStorage or use initial data
function getDatabase() {
    let db = localStorage.getItem('edupanel_db');
    if (!db) {
        db = initialDatabase;
        localStorage.setItem('edupanel_db', JSON.stringify(db));
    } else {
        db = JSON.parse(db);
    }
    return db;
}

// Save database to localStorage
function saveDatabase(db) {
    localStorage.setItem('edupanel_db', JSON.stringify(db));
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('edupanel_user');
    return user ? JSON.parse(user) : null;
}

// Save current user
function saveCurrentUser(user) {
    localStorage.setItem('edupanel_user', JSON.stringify(user));
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}
