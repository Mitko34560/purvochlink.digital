# EduPanel - Professional School Diary System

A complete, professional school management system built with vanilla HTML, CSS, and JavaScript. Works perfectly on GitHub Pages without any backend requirements.

## ✨ Features

- **Multi-Role System**: Director, Teacher, Student, and Parent roles with different dashboards
- **Dashboard**: Real-time statistics and quick overview for each role
- **My Lesson**: Powerful tool for teachers to manage grades, attendance, praises, and remarks
- **Grade Management**: Record, view, and track student grades with color coding
- **Attendance System**: Track attendance with multiple types (Present, Absent, Late, Excused)
- **Praises & Remarks**: Positive feedback and behavior notes for students
- **Complete Tables**: View all grades, absences, classes, subjects, and students
- **Professional UI**: Modern design with smooth animations and responsive layout
- **Local Storage**: All data persists in the browser using localStorage

## 🎯 Demo Accounts

Use these credentials to log in:

| Role | Email | Password |
|------|-------|----------|
| Director | admin@edupanel.bg | AdminEdu2026 |
| Teacher | teacher@edupanel.bg | TeacherEdu2026 |
| Student | student@edupanel.bg | StudentEdu2026 |
| Parent | parent@edupanel.bg | ParentEdu2026 |

## 📁 Project Structure

```
edupanel/
├── index.html           # Landing page
├── login.html           # Login page
├── dashboard.html       # Main dashboard (all roles)
├── css/
│   └── style.css        # Complete styling (3000+ lines)
├── js/
│   ├── db.js           # Database and utilities
│   ├── auth.js         # Authentication
│   └── dashboard.js    # Dashboard logic and rendering
└── README.md           # This file
```

## 🚀 Installation & Usage

### Local Usage
1. Extract the ZIP file
2. Open `index.html` in any modern web browser
3. Click "Get Started" and login with demo credentials
4. Explore all features!

### GitHub Pages Deployment
1. Create a new GitHub repository (e.g., `edupanel`)
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → choose main branch and root folder
5. Your site will be live at: `https://yourusername.github.io/edupanel`

## 👥 Roles & Features

### Director Dashboard
- View total students, teachers, classes, and subjects
- See recent grades and absences
- Access to My Lesson tool
- Manage all school data (students, classes, subjects)
- View all grades and absences

### Teacher Dashboard
- View my classes and subjects
- Access to My Lesson tool for recording:
  - Grades (scale 2-6)
  - Attendance (Present, Absent, Late, Excused)
  - Praises (positive feedback)
  - Remarks (behavior notes)
- View all grades and absences in system
- Track grades and absences recorded

### Student Dashboard
- View my grades with average calculation
- View my absences
- View praises received
- View remarks
- Track academic progress

### Parent Dashboard
- Monitor child's grades
- Monitor child's absences
- View child's praises
- View child's remarks
- Get overview of child's progress

## 📝 My Lesson Tool

The My Lesson feature allows teachers to manage their lessons efficiently:

1. **Select Parameters**: Choose class, subject, date, and lesson hour
2. **Enter Topic**: Record the lesson topic for future reference
3. **Manage Students**: For each student, you can:
   - Mark attendance (Present, Absent, Late, Excused)
   - Add a grade (2-6)
   - Add a praise for good behavior
   - Add a remark for behavior issues
4. **Save Data**: Save all lesson data to localStorage
5. **Mark Complete**: Mark the lesson as completed

All data is automatically saved and visible in student and parent dashboards.

## 🎨 Design Features

- Modern gradient design with purple and indigo primary colors
- Smooth animations and transitions throughout
- Responsive layout for all screen sizes (desktop, tablet, mobile)
- Professional color scheme:
  - Grade 2: Red (#ef4444)
  - Grade 3: Orange (#f97316)
  - Grade 4: Yellow (#f59e0b)
  - Grade 5: Blue (#6366f1)
  - Grade 6: Green (#10b981)
- Glassmorphism effects and modern UI patterns
- Toast notifications for user feedback

## 💾 Data Storage

All data is stored in the browser's localStorage with the key `edupanel_db`. The system includes:

- Users (8 demo accounts with different roles)
- Classes (3 demo classes)
- Subjects (5 demo subjects)
- Grades (6 sample grades)
- Absences (3 sample absences)
- Praises (4 sample praises)
- Remarks (2 sample remarks)
- Lessons (recorded lessons)

Data persists until the browser's localStorage is cleared.

## 🔒 Security Note

This is a frontend-only demo system suitable for:
- Learning and educational purposes
- GitHub Pages hosting
- Personal/small school use

For production use with real student data, implement:
- Backend authentication with encryption
- Secure database (not localStorage)
- HTTPS communication
- Data encryption
- User password hashing
- Access control and permissions

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🎓 Demo Data

The system comes pre-loaded with realistic demo data:
- 8 users (1 director, 2 teachers, 4 students, 1 parent)
- 3 classes (10A, 10B, 11A)
- 5 subjects with teacher assignments
- Grade history with various types (test, exam, homework, etc.)
- Attendance records
- Positive feedback (praises)
- Behavior notes (remarks)

## 🔧 Customization

### Adding New Users
Edit `js/db.js` and add to the `initialDatabase.users` array.

### Adding New Classes
Edit `js/db.js` and add to the `initialDatabase.classes` array.

### Adding New Subjects
Edit `js/db.js` and add to the `initialDatabase.subjects` array.

### Changing Colors
Edit `css/style.css` and modify the CSS variables in `:root`.

## 📧 Support

For issues or feature requests, this is a demo system for educational purposes. Modify and extend it as needed for your requirements.

## 📄 License

Free to use and modify for personal and educational purposes.

---

**EduPanel** - Making school management simple and effective! 📚
