export type Course = {
  code: string;
  title: string;
  credits: number;
  elective: boolean;
};

export type Semester = {
  yearLabel: string;
  semesterLabel: string;
  totalContactHours: string;
  electiveCreditsRequired: number;
  courses: Course[];
};

export const bscEeeSemesters: Semester[] = [
  {
    yearLabel: '1st Year',
    semesterLabel: '1st Semester',
    totalContactHours: '18.0',
    electiveCreditsRequired: 0,
    courses: [
      { code: 'EEE 1101', title: 'Electrical Circuits I', credits: 3.0, elective: false },
      { code: 'EEE 1102', title: 'Electrical Circuits I Sessional', credits: 1.5, elective: false },
      { code: 'Math 1101', title: 'Mathematics I', credits: 3.0, elective: false },
      { code: 'Chem 1101', title: 'Engineering Chemistry', credits: 3.0, elective: false },
      { code: 'Chem 1102', title: 'Engineering Chemistry Sessional', credits: 1.5, elective: false },
      { code: 'Hum 1101', title: 'Developing English Language Skills', credits: 3.0, elective: false },
    ],
  },
  {
    yearLabel: '1st Year',
    semesterLabel: '2nd Semester',
    totalContactHours: '15.0',
    electiveCreditsRequired: 0,
    courses: [
      { code: 'EEE 1201', title: 'Electrical Circuits II', credits: 3.0, elective: false },
      { code: 'EEE 1202', title: 'Electrical Circuits II Sessional', credits: 1.5, elective: false },
      { code: 'Math 1201', title: 'Mathematics II', credits: 3.0, elective: false },
      { code: 'CE 1202', title: 'Engineering Drawing Sessional', credits: 1.5, elective: false },
      { code: 'Phy 1201', title: 'Engineering Physics I', credits: 3.0, elective: false },
    ],
  },
  {
    yearLabel: '1st Year',
    semesterLabel: '3rd Semester',
    totalContactHours: '14.0',
    electiveCreditsRequired: 0,
    courses: [
      { code: 'CSE 1301', title: 'Computer Fundamentals and Web Technology', credits: 3.0, elective: false },
      { code: 'CSE 1302', title: 'Computer Fundamentals and Web Technology Sessional', credits: 1.5, elective: false },
      { code: 'Phy 1301', title: 'Engineering Physics II', credits: 3.0, elective: false },
      { code: 'Phy 1302', title: 'Engineering Physics I & II Sessional', credits: 1.5, elective: false },
      { code: 'Ban 1301', title: 'Bengali Language and Literature', credits: 2.0, elective: false },
    ],
  },
  {
    yearLabel: '2nd Year',
    semesterLabel: '1st Semester',
    totalContactHours: '15.0',
    electiveCreditsRequired: 0,
    courses: [
      { code: 'EEE 2101', title: 'Electronics I', credits: 3.0, elective: false },
      { code: 'EEE 2102', title: 'Electronics I Sessional', credits: 1.5, elective: false },
      { code: 'EEE 2104', title: 'Electronic Circuit Simulation Sessional', credits: 1.5, elective: false },
      { code: 'Ban 2101', title: 'History of Bangladesh Independence', credits: 3.0, elective: false },
      { code: 'ME 2101', title: 'Mechanical Engineering Fundamentals', credits: 3.0, elective: false },
    ],
  },
  {
    yearLabel: '2nd Year',
    semesterLabel: '2nd Semester',
    totalContactHours: '18.0',
    electiveCreditsRequired: 0,
    courses: [
      { code: 'Math 2201', title: 'Mathematics III', credits: 3.0, elective: false },
      { code: 'CSE 2201', title: 'Computer Programming', credits: 3.0, elective: false },
      { code: 'CSE 2202', title: 'Computer Programming Sessional', credits: 1.5, elective: false },
      { code: 'EEE 2201', title: 'Electronics II', credits: 3.0, elective: false },
      { code: 'EEE 2202', title: 'Electronics II Sessional', credits: 1.5, elective: false },
      { code: 'EEE 2206', title: 'Numerical Methods Sessional', credits: 1.5, elective: false },
    ],
  },
  {
    yearLabel: '2nd Year',
    semesterLabel: '3rd Semester',
    totalContactHours: '15.0',
    electiveCreditsRequired: 0,
    courses: [
      { code: 'EEE 2303', title: 'Energy Conversion I', credits: 3.0, elective: false },
      { code: 'EEE 2304', title: 'Energy Conversion I Sessional', credits: 1.5, elective: false },
      { code: 'EEE 2307', title: 'Continuous Signals and Linear Systems', credits: 3.0, elective: false },
      { code: 'Math 2301', title: 'Mathematics IV', credits: 3.0, elective: false },
      { code: 'Hum 2301', title: 'Financial and Managerial Accounting', credits: 3.0, elective: false },
    ],
  },
];
