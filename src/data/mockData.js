// Mock Data for SHRI JANKI PRASAD INTER COLLEGE PATSENI KACHHAUNA HARDOI
// Classes 6th to 12th, 35+ Faculty, 5 Support Staff (Peons), and Daily Schedules

export const collegeInfo = {
  name: "SHRI JANKI PRASAD INTER COLLEGE",
  location: "Patseni, Kachhauna, Hardoi, Uttar Pradesh",
  affiliation: "Affiliated to U.P. State Board | Classes 6th to 12th",
  established: "Estd. 1985",
  code: "College Code: 1408",
  bannerImage: "/college_campus.jpg"
};

// 25 students with attendancePercent, academicPercent, classTeacher fields
export const initialStudents = [
  { id: 1,  rollNo: "SJP-601",  name: "Aman Verma",        grade: "Class 6",           section: "A", gender: "Male",   parentName: "Ram Kumar Verma",    phone: "+91 94501 12345", status: "Active",   attendancePercent: 92, academicPercent: 78, classTeacher: "Shri Vijay Pratap",   performance: "Good" },
  { id: 2,  rollNo: "SJP-602",  name: "Sneha Pandey",       grade: "Class 6",           section: "A", gender: "Female", parentName: "Anil Kumar Pandey",  phone: "+91 94501 22222", status: "Active",   attendancePercent: 88, academicPercent: 85, classTeacher: "Shri Vijay Pratap",   performance: "Very Good" },
  { id: 3,  rollNo: "SJP-603",  name: "Rohit Bajpai",       grade: "Class 6",           section: "B", gender: "Male",   parentName: "Suresh Bajpai",      phone: "+91 94501 33333", status: "Active",   attendancePercent: 75, academicPercent: 60, classTeacher: "Shri Suresh Babu",    performance: "Average" },
  { id: 4,  rollNo: "SJP-702",  name: "Pooja Devi",         grade: "Class 7",           section: "A", gender: "Female", parentName: "Suresh Chandra",     phone: "+91 94502 23456", status: "Active",   attendancePercent: 95, academicPercent: 91, classTeacher: "Shri Arvind Patel",   performance: "Excellent" },
  { id: 5,  rollNo: "SJP-703",  name: "Nikhil Yadav",       grade: "Class 7",           section: "A", gender: "Male",   parentName: "Dinesh Yadav",       phone: "+91 94502 44444", status: "Active",   attendancePercent: 80, academicPercent: 70, classTeacher: "Shri Arvind Patel",   performance: "Good" },
  { id: 6,  rollNo: "SJP-704",  name: "Riya Gupta",         grade: "Class 7",           section: "B", gender: "Female", parentName: "Rajesh Gupta",       phone: "+91 94502 55555", status: "Active",   attendancePercent: 90, academicPercent: 82, classTeacher: "Shri Harish Chandra", performance: "Very Good" },
  { id: 7,  rollNo: "SJP-803",  name: "Shivam Shukla",      grade: "Class 8",           section: "B", gender: "Male",   parentName: "Mahesh Shukla",      phone: "+91 94503 34567", status: "Active",   attendancePercent: 85, academicPercent: 74, classTeacher: "Shri Satish Kumar",   performance: "Good" },
  { id: 8,  rollNo: "SJP-804",  name: "Kavya Singh",        grade: "Class 8",           section: "A", gender: "Female", parentName: "Rakesh Singh",       phone: "+91 94503 66666", status: "Active",   attendancePercent: 97, academicPercent: 94, classTeacher: "Smt. Pratibha Tiwari",performance: "Excellent" },
  { id: 9,  rollNo: "SJP-805",  name: "Arjun Mishra",       grade: "Class 8",           section: "B", gender: "Male",   parentName: "Santosh Mishra",     phone: "+91 94503 77777", status: "Active",   attendancePercent: 70, academicPercent: 55, classTeacher: "Shri Satish Kumar",   performance: "Needs Improvement" },
  { id: 10, rollNo: "SJP-904",  name: "Priya Yadav",        grade: "Class 9",           section: "A", gender: "Female", parentName: "Dharmendra Yadav",   phone: "+91 94504 45678", status: "Active",   attendancePercent: 93, academicPercent: 88, classTeacher: "Shri Manoj Shukla",   performance: "Excellent" },
  { id: 11, rollNo: "SJP-905",  name: "Vishal Tiwari",      grade: "Class 9",           section: "A", gender: "Male",   parentName: "Ramesh Tiwari",      phone: "+91 94504 88888", status: "Active",   attendancePercent: 82, academicPercent: 72, classTeacher: "Shri Manoj Shukla",   performance: "Good" },
  { id: 12, rollNo: "SJP-906",  name: "Divya Srivastava",   grade: "Class 9",           section: "B", gender: "Female", parentName: "Arun Srivastava",    phone: "+91 94504 99999", status: "Active",   attendancePercent: 91, academicPercent: 83, classTeacher: "Shri Alok Bajpai",    performance: "Very Good" },
  { id: 13, rollNo: "SJP-1005", name: "Mohit Kumar",        grade: "Class 10",          section: "A", gender: "Male",   parentName: "Kailash Kumar",      phone: "+91 94505 56789", status: "Active",   attendancePercent: 88, academicPercent: 79, classTeacher: "Shri Devendra Kumar", performance: "Good" },
  { id: 14, rollNo: "SJP-1006", name: "Sakshi Verma",       grade: "Class 10",          section: "A", gender: "Female", parentName: "Sunil Verma",        phone: "+91 94505 11111", status: "Active",   attendancePercent: 96, academicPercent: 92, classTeacher: "Shri Devendra Kumar", performance: "Excellent" },
  { id: 15, rollNo: "SJP-1007", name: "Abhishek Pal",       grade: "Class 10",          section: "B", gender: "Male",   parentName: "Rajendra Pal",       phone: "+91 94505 22222", status: "Active",   attendancePercent: 65, academicPercent: 50, classTeacher: "Smt. Sunita Devi",    performance: "Needs Improvement" },
  { id: 16, rollNo: "SJP-1008", name: "Neha Dwivedi",       grade: "Class 10",          section: "B", gender: "Female", parentName: "Vivek Dwivedi",      phone: "+91 94505 33333", status: "Active",   attendancePercent: 90, academicPercent: 86, classTeacher: "Smt. Sunita Devi",    performance: "Very Good" },
  { id: 17, rollNo: "SJP-1106", name: "Anjali Gupta",       grade: "Class 11 (Science)",section: "A", gender: "Female", parentName: "Vinod Gupta",        phone: "+91 94506 67890", status: "Active",   attendancePercent: 94, academicPercent: 90, classTeacher: "Shri B.P. Maurya",    performance: "Excellent" },
  { id: 18, rollNo: "SJP-1107", name: "Kunal Saxena",       grade: "Class 11 (Science)",section: "A", gender: "Male",   parentName: "Ashish Saxena",      phone: "+91 94506 44444", status: "Active",   attendancePercent: 87, academicPercent: 80, classTeacher: "Shri B.P. Maurya",    performance: "Very Good" },
  { id: 19, rollNo: "SJP-1108", name: "Preeti Chandra",     grade: "Class 11 (Arts)",   section: "A", gender: "Female", parentName: "Harish Chandra",     phone: "+91 94506 55555", status: "Active",   attendancePercent: 89, academicPercent: 76, classTeacher: "Shri Om Prakash",     performance: "Good" },
  { id: 20, rollNo: "SJP-1109", name: "Sumit Dixit",        grade: "Class 11 (Arts)",   section: "A", gender: "Male",   parentName: "Vinay Dixit",        phone: "+91 94506 66666", status: "Inactive", attendancePercent: 55, academicPercent: 45, classTeacher: "Shri Om Prakash",     performance: "Needs Improvement" },
  { id: 21, rollNo: "SJP-1207", name: "Rahul Tiwari",       grade: "Class 12 (Science)",section: "A", gender: "Male",   parentName: "Santosh Tiwari",     phone: "+91 94507 78901", status: "Active",   attendancePercent: 91, academicPercent: 87, classTeacher: "Shri S.N. Singh",     performance: "Excellent" },
  { id: 22, rollNo: "SJP-1208", name: "Deepak Mishra",      grade: "Class 12 (Arts)",   section: "B", gender: "Male",   parentName: "Pradeep Mishra",     phone: "+91 94508 89012", status: "Active",   attendancePercent: 83, academicPercent: 73, classTeacher: "Dr. R.K. Pandey",     performance: "Good" },
  { id: 23, rollNo: "SJP-1209", name: "Meena Awasthi",      grade: "Class 12 (Science)",section: "A", gender: "Female", parentName: "Dinesh Awasthi",     phone: "+91 94507 77777", status: "Active",   attendancePercent: 98, academicPercent: 95, classTeacher: "Shri S.N. Singh",     performance: "Excellent" },
  { id: 24, rollNo: "SJP-1210", name: "Suraj Lal",          grade: "Class 12 (Arts)",   section: "B", gender: "Male",   parentName: "Gopal Lal",          phone: "+91 94508 88888", status: "Active",   attendancePercent: 72, academicPercent: 62, classTeacher: "Dr. R.K. Pandey",     performance: "Average" },
  { id: 25, rollNo: "SJP-1211", name: "Tanvi Maurya",       grade: "Class 12 (Commerce)",section:"A", gender: "Female", parentName: "Brij Maurya",        phone: "+91 94508 99999", status: "Active",   attendancePercent: 90, academicPercent: 84, classTeacher: "Shri R.C. Srivastava",performance: "Very Good" },
];

// 36 Faculty Members (35+ teachers)
export const initialTeachers = [
  { id: 1,  name: "Dr. R.K. Pandey",      subject: "Principal & Hindi Lit.",          email: "rk.pandey@sjpcollege.ac.in",  phone: "+91 94150 11001", assignedClass: "Class 12 (Arts)",   experience: "22 Years" },
  { id: 2,  name: "Shri S.N. Singh",      subject: "Vice Principal & Physics",        email: "sn.singh@sjpcollege.ac.in",   phone: "+91 94150 11002", assignedClass: "Class 12 (Sci)",    experience: "18 Years" },
  { id: 3,  name: "Shri B.P. Maurya",     subject: "Mathematics (Senior)",            email: "bp.maurya@sjpcollege.ac.in",  phone: "+91 94150 11003", assignedClass: "Class 11 (Sci)",    experience: "15 Years" },
  { id: 4,  name: "Dr. Anita Awasthi",    subject: "Chemistry (Senior)",              email: "anita.a@sjpcollege.ac.in",    phone: "+91 94150 11004", assignedClass: "Class 12 (Sci)",    experience: "14 Years" },
  { id: 5,  name: "Shri V.K. Dixit",      subject: "Biology / Botany",               email: "vk.dixit@sjpcollege.ac.in",   phone: "+91 94150 11005", assignedClass: "Class 11 (Sci)",    experience: "12 Years" },
  { id: 6,  name: "Smt. Shashi Lata",     subject: "English (11th & 12th)",          email: "shashi.l@sjpcollege.ac.in",   phone: "+91 94150 11006", assignedClass: "Class 12 (Arts)",   experience: "11 Years" },
  { id: 7,  name: "Shri Om Prakash",      subject: "Economics & Civics",             email: "om.prakash@sjpcollege.ac.in", phone: "+91 94150 11007", assignedClass: "Class 11 (Arts)",   experience: "16 Years" },
  { id: 8,  name: "Shri R.C. Srivastava", subject: "Accountancy & Commerce",         email: "rc.sri@sjpcollege.ac.in",     phone: "+91 94150 11008", assignedClass: "Class 12 (Com)",    experience: "13 Years" },
  { id: 9,  name: "Shri Devendra Kumar",  subject: "Mathematics (Class 10)",         email: "devendra.k@sjpcollege.ac.in", phone: "+91 94150 11009", assignedClass: "Class 10-A",        experience: "10 Years" },
  { id: 10, name: "Smt. Sunita Devi",     subject: "Science (Class 10)",             email: "sunita.d@sjpcollege.ac.in",   phone: "+91 94150 11010", assignedClass: "Class 10-B",        experience: "9 Years"  },
  { id: 11, name: "Shri Manoj Shukla",    subject: "Social Science",                 email: "manoj.s@sjpcollege.ac.in",   phone: "+91 94150 11011", assignedClass: "Class 9-A",         experience: "8 Years"  },
  { id: 12, name: "Shri Alok Bajpai",     subject: "Mathematics (Class 9)",          email: "alok.b@sjpcollege.ac.in",    phone: "+91 94150 11012", assignedClass: "Class 9-B",         experience: "7 Years"  },
  { id: 13, name: "Smt. Rekha Sharma",    subject: "Hindi (Class 9 & 10)",           email: "rekha.s@sjpcollege.ac.in",   phone: "+91 94150 11013", assignedClass: "Class 9-A",         experience: "11 Years" },
  { id: 14, name: "Shri Pradeep Rathore", subject: "English (Class 9 & 10)",         email: "pradeep.r@sjpcollege.ac.in", phone: "+91 94150 11014", assignedClass: "Class 10-A",        experience: "6 Years"  },
  { id: 15, name: "Shri Dinesh Chandra",  subject: "Sanskrit",                       email: "dinesh.c@sjpcollege.ac.in",  phone: "+91 94150 11015", assignedClass: "Class 8-A",         experience: "15 Years" },
  { id: 16, name: "Smt. Pratibha Tiwari", subject: "Science (Class 8)",              email: "pratibha.t@sjpcollege.ac.in",phone: "+91 94150 11016", assignedClass: "Class 8-A",         experience: "8 Years"  },
  { id: 17, name: "Shri Satish Kumar",    subject: "Mathematics (Class 8)",          email: "satish.k@sjpcollege.ac.in",  phone: "+91 94150 11017", assignedClass: "Class 8-B",         experience: "5 Years"  },
  { id: 18, name: "Shri Kamlesh Verma",   subject: "Social Science (Class 8)",       email: "kamlesh.v@sjpcollege.ac.in", phone: "+91 94150 11018", assignedClass: "Class 8-B",         experience: "9 Years"  },
  { id: 19, name: "Smt. Manju Lata",      subject: "Hindi (Class 7)",                email: "manju.l@sjpcollege.ac.in",   phone: "+91 94150 11019", assignedClass: "Class 7-A",         experience: "7 Years"  },
  { id: 20, name: "Shri Arvind Patel",    subject: "Mathematics (Class 7)",          email: "arvind.p@sjpcollege.ac.in",  phone: "+91 94150 11020", assignedClass: "Class 7-A",         experience: "6 Years"  },
  { id: 21, name: "Shri Harish Chandra",  subject: "Science (Class 7)",              email: "harish.c@sjpcollege.ac.in",  phone: "+91 94150 11021", assignedClass: "Class 7-B",         experience: "8 Years"  },
  { id: 22, name: "Smt. Geeta Mishra",    subject: "English (Class 7)",              email: "geeta.m@sjpcollege.ac.in",   phone: "+91 94150 11022", assignedClass: "Class 7-B",         experience: "5 Years"  },
  { id: 23, name: "Shri Vijay Pratap",    subject: "Mathematics (Class 6)",          email: "vijay.p@sjpcollege.ac.in",   phone: "+91 94150 11023", assignedClass: "Class 6-A",         experience: "6 Years"  },
  { id: 24, name: "Smt. Poonam Singh",    subject: "Science (Class 6)",              email: "poonam.s@sjpcollege.ac.in",  phone: "+91 94150 11024", assignedClass: "Class 6-A",         experience: "4 Years"  },
  { id: 25, name: "Shri Suresh Babu",     subject: "Hindi (Class 6)",                email: "suresh.b@sjpcollege.ac.in",  phone: "+91 94150 11025", assignedClass: "Class 6-B",         experience: "12 Years" },
  { id: 26, name: "Shri Rakesh Dwivedi",  subject: "English (Class 6)",              email: "rakesh.d@sjpcollege.ac.in",  phone: "+91 94150 11026", assignedClass: "Class 6-B",         experience: "5 Years"  },
  { id: 27, name: "Shri Santosh Kumar",   subject: "Physical Education (Sports PTI)",email: "santosh.pti@sjpcollege.ac.in",phone: "+91 94150 11027",assignedClass: "All Classes",       experience: "14 Years" },
  { id: 28, name: "Shri Ashish Saxena",   subject: "Computer Science & IT",          email: "ashish.s@sjpcollege.ac.in",  phone: "+91 94150 11028", assignedClass: "Lab Incharge",      experience: "7 Years"  },
  { id: 29, name: "Smt. Vandana Gupta",   subject: "Drawing & Art",                  email: "vandana.g@sjpcollege.ac.in", phone: "+91 94150 11029", assignedClass: "Class 6 to 10",     experience: "6 Years"  },
  { id: 30, name: "Shri Narendra Yadav",  subject: "Geography & Agriculture",        email: "narendra.y@sjpcollege.ac.in",phone: "+91 94150 11030", assignedClass: "Class 11 & 12",     experience: "13 Years" },
  { id: 31, name: "Shri Rajendra Pal",    subject: "History & Culture",              email: "rajendra.p@sjpcollege.ac.in",phone: "+91 94150 11031", assignedClass: "Class 11 & 12",     experience: "10 Years" },
  { id: 32, name: "Shri Mahendra Singh",  subject: "Assistant Teacher (Sci)",        email: "mahendra.s@sjpcollege.ac.in",phone: "+91 94150 11032", assignedClass: "Junior Section",    experience: "4 Years"  },
  { id: 33, name: "Smt. Neelam Kumari",   subject: "Assistant Teacher (Maths)",      email: "neelam.k@sjpcollege.ac.in",  phone: "+91 94150 11033", assignedClass: "Junior Section",    experience: "5 Years"  },
  { id: 34, name: "Shri Vinay Mishra",    subject: "Librarian & Hindi",              email: "vinay.m@sjpcollege.ac.in",   phone: "+91 94150 11034", assignedClass: "Library Incharge",  experience: "9 Years"  },
  { id: 35, name: "Shri Krishna Kant",    subject: "Home Science / Assistant",       email: "krishna.k@sjpcollege.ac.in", phone: "+91 94150 11035", assignedClass: "Class 9 & 10",      experience: "6 Years"  },
  { id: 36, name: "Dr. Upendra Nath",     subject: "Moral Education & Sanskrit",     email: "upendra.n@sjpcollege.ac.in", phone: "+91 94150 11036", assignedClass: "Class 6 to 8",      experience: "16 Years" }
];

// Exactly 5 Support Staff (Peons / Sevak)
export const initialPeons = [
  { id: 1, name: "Shri Ram Asrey",        designation: "Head Peon (Senior Sevak)",                  dutyArea: "Principal Office & Administration",          phone: "+91 94520 10001", experience: "25 Years", status: "Active" },
  { id: 2, name: "Shri Shyam Lal",        designation: "Classroom Attendant (Peon)",                dutyArea: "Senior Wing (Classes 11 & 12)",              phone: "+91 94520 10002", experience: "16 Years", status: "Active" },
  { id: 3, name: "Shri Chhote Lal",       designation: "Classroom Attendant (Peon)",                dutyArea: "Middle Wing (Classes 9 & 10)",               phone: "+91 94520 10003", experience: "12 Years", status: "Active" },
  { id: 4, name: "Shri Babloo Yadav",     designation: "Junior Wing & Bell Incharge (Peon)",        dutyArea: "Junior Wing (Classes 6, 7 & 8) & Main Bell", phone: "+91 94520 10004", experience: "8 Years",  status: "Active" },
  { id: 5, name: "Shri Rameshwar Prasad", designation: "Campus & Science Lab Attendant (Peon)",     dutyArea: "Science Labs & Campus Grounds",              phone: "+91 94520 10005", experience: "10 Years", status: "Active" }
];

// Classes from 6th to 12th
export const initialClasses = [
  { id: 1,  name: "Class 6 - Section A",       gradeNumber: "6",  classTeacher: "Shri Vijay Pratap",    room: "Room 101",          totalStudents: 45, schedule: "8:00 AM - 2:00 PM" },
  { id: 2,  name: "Class 6 - Section B",       gradeNumber: "6",  classTeacher: "Shri Suresh Babu",     room: "Room 102",          totalStudents: 42, schedule: "8:00 AM - 2:00 PM" },
  { id: 3,  name: "Class 7 - Section A",       gradeNumber: "7",  classTeacher: "Shri Arvind Patel",    room: "Room 103",          totalStudents: 48, schedule: "8:00 AM - 2:00 PM" },
  { id: 4,  name: "Class 7 - Section B",       gradeNumber: "7",  classTeacher: "Shri Harish Chandra",  room: "Room 104",          totalStudents: 44, schedule: "8:00 AM - 2:00 PM" },
  { id: 5,  name: "Class 8 - Section A",       gradeNumber: "8",  classTeacher: "Smt. Pratibha Tiwari", room: "Room 105",          totalStudents: 50, schedule: "8:00 AM - 2:00 PM" },
  { id: 6,  name: "Class 8 - Section B",       gradeNumber: "8",  classTeacher: "Shri Satish Kumar",    room: "Room 106",          totalStudents: 47, schedule: "8:00 AM - 2:00 PM" },
  { id: 7,  name: "Class 9 - Section A",       gradeNumber: "9",  classTeacher: "Shri Manoj Shukla",    room: "Room 201",          totalStudents: 55, schedule: "8:00 AM - 2:00 PM" },
  { id: 8,  name: "Class 9 - Section B",       gradeNumber: "9",  classTeacher: "Shri Alok Bajpai",     room: "Room 202",          totalStudents: 52, schedule: "8:00 AM - 2:00 PM" },
  { id: 9,  name: "Class 10 - Section A",      gradeNumber: "10", classTeacher: "Shri Devendra Kumar",  room: "Room 203",          totalStudents: 58, schedule: "8:00 AM - 2:00 PM" },
  { id: 10, name: "Class 10 - Section B",      gradeNumber: "10", classTeacher: "Smt. Sunita Devi",     room: "Room 204",          totalStudents: 56, schedule: "8:00 AM - 2:00 PM" },
  { id: 11, name: "Class 11 - Science Stream", gradeNumber: "11", classTeacher: "Shri B.P. Maurya",     room: "Room 301 (Sci Block)", totalStudents: 62, schedule: "8:00 AM - 2:00 PM" },
  { id: 12, name: "Class 11 - Arts & Commerce",gradeNumber: "11", classTeacher: "Shri Om Prakash",      room: "Room 302",          totalStudents: 54, schedule: "8:00 AM - 2:00 PM" },
  { id: 13, name: "Class 12 - Science Stream", gradeNumber: "12", classTeacher: "Shri S.N. Singh",      room: "Room 303 (Sci Block)", totalStudents: 65, schedule: "8:00 AM - 2:00 PM" },
  { id: 14, name: "Class 12 - Arts & Commerce",gradeNumber: "12", classTeacher: "Dr. R.K. Pandey",      room: "Room 304",          totalStudents: 58, schedule: "8:00 AM - 2:00 PM" }
];

// Daily College Bell Schedule & Timetable Periods
export const dailyBellSchedule = [
  { period: "Assembly",  time: "8:00 AM - 8:30 AM",  type: "prayer", activity: "Morning Prayer, National Anthem & Daily News/Thoughts" },
  { period: "Period 1",  time: "8:30 AM - 9:15 AM",  type: "class",  activity: "Main Subject 1" },
  { period: "Period 2",  time: "9:15 AM - 10:00 AM", type: "class",  activity: "Main Subject 2" },
  { period: "Period 3",  time: "10:00 AM - 10:45 AM",type: "class",  activity: "Main Subject 3" },
  { period: "Period 4",  time: "10:45 AM - 11:30 AM",type: "class",  activity: "Language / Hindi / Sanskrit" },
  { period: "Recess",    time: "11:30 AM - 12:05 PM",type: "break",  activity: "Mid-Day Meal & Refreshment Break" },
  { period: "Period 5",  time: "12:05 PM - 12:50 PM",type: "class",  activity: "Science / Practical / Labs" },
  { period: "Period 6",  time: "12:50 PM - 1:30 PM", type: "class",  activity: "Social Science / Commerce / Arts" },
  { period: "Period 7",  time: "1:30 PM - 2:00 PM",  type: "class",  activity: "Physical Training, Sports & Moral Education" }
];

export const classTimeTables = {
  "10": [
    { period: "1", time: "8:30 - 9:15",  subject: "Mathematics",              teacher: "Shri Devendra Kumar" },
    { period: "2", time: "9:15 - 10:00", subject: "Science (Physics/Chem)",   teacher: "Smt. Sunita Devi" },
    { period: "3", time: "10:00 - 10:45",subject: "English",                  teacher: "Shri Pradeep Rathore" },
    { period: "4", time: "10:45 - 11:30",subject: "Hindi",                    teacher: "Smt. Rekha Sharma" },
    { period: "Lunch", time: "11:30 - 12:05", subject: "Recess Break",        teacher: "All Staff Duty" },
    { period: "5", time: "12:05 - 12:50",subject: "Social Science",           teacher: "Shri Manoj Shukla" },
    { period: "6", time: "12:50 - 1:30", subject: "Drawing / Art",            teacher: "Smt. Vandana Gupta" },
    { period: "7", time: "1:30 - 2:00",  subject: "Physical Education (Sports)",teacher: "Shri Santosh Kumar" }
  ],
  "12": [
    { period: "1", time: "8:30 - 9:15",  subject: "Physics",                  teacher: "Shri S.N. Singh" },
    { period: "2", time: "9:15 - 10:00", subject: "Chemistry",                teacher: "Dr. Anita Awasthi" },
    { period: "3", time: "10:00 - 10:45",subject: "Mathematics / Biology",    teacher: "Shri B.P. Maurya / Shri V.K. Dixit" },
    { period: "4", time: "10:45 - 11:30",subject: "English",                  teacher: "Smt. Shashi Lata" },
    { period: "Lunch", time: "11:30 - 12:05", subject: "Recess Break",        teacher: "All Staff Duty" },
    { period: "5", time: "12:05 - 12:50",subject: "Hindi Literature",         teacher: "Dr. R.K. Pandey" },
    { period: "6", time: "12:50 - 1:30", subject: "Science Lab Practical",    teacher: "Lab Incharges" },
    { period: "7", time: "1:30 - 2:00",  subject: "Library & Self-Study",     teacher: "Shri Vinay Mishra" }
  ]
};

export const initialNotices = [
  { id: 1, title: "UP Board High School & Intermediate Form Submission", date: "2026-09-20", category: "Board Exam", priority: "High",   description: "All students of Class 10th & 12th must verify their exam application details and submit passport photos to their class teachers by Monday." },
  { id: 2, title: "Inter-School Sports Meet & Drill Competition",          date: "2026-09-23", category: "Sports",    priority: "Normal", description: "Athletics, Volleyball, and Kabaddi team selections will be organized by Sports Teacher Shri Santosh Kumar on the main college ground." },
  { id: 3, title: "Quarterly Unit Test Schedule for Classes 6th to 12th", date: "2026-09-28", category: "Academic",  priority: "High",   description: "Quarterly examinations will commence from October 5th. Detailed date-sheets are displayed on the main notice board outside the Principal office." }
];
