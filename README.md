# School ERP - React Frontend

A clean, modern, and easy-to-understand **School ERP Frontend** built with **React.js** and **Vite**.

## 🚀 Getting Started

### 1. Open Terminal in this Folder
Open your terminal or command prompt inside this `School ERP` folder:
```bash
cd "C:\Users\agnih\Desktop\School ERP"
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
School ERP/
├── index.html           # Main HTML file
├── package.json         # Project dependencies & scripts
├── vite.config.js       # Vite configuration
├── src/
│   ├── main.jsx         # React application entry point
│   ├── App.jsx          # Main App component & active tab routing
│   ├── App.css          # Clean, modern CSS styling
│   ├── data/
│   │   └── mockData.js  # Easy-to-edit initial school data (students, teachers, classes, notices)
│   ├── components/
│   │   ├── Sidebar.jsx  # Left-hand navigation bar
│   │   └── Header.jsx   # Top bar with school title and date
│   └── pages/
│       ├── Dashboard.jsx # Overview statistics and quick preview
│       ├── Students.jsx  # Student directory with search, filter & Add Student modal
│       ├── Teachers.jsx  # Faculty directory with search & Add Teacher modal
│       ├── Classes.jsx   # Classroom & sections manager
│       └── Notices.jsx   # School notice board
```

---

## 💡 How to Add More Information

1. **Add Students, Teachers, Classes, or Notices in the App**:
   - Use the **"Add Student"**, **"Add Teacher"**, **"Add Class"**, or **"Post Notice"** buttons directly in the web browser.

2. **Edit Default Data**:
   - Open `src/data/mockData.js` and edit the array records directly.

3. **Add a New Section / Module**:
   - Create a new file in `src/pages/` (for example `Fees.jsx` or `Attendance.jsx`).
   - Add a navigation button in `src/components/Sidebar.jsx`.
   - Render it inside `src/App.jsx`.
