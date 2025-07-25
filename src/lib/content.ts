// Mock database for teacher-uploaded content
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'note' | 'video' | 'link';
  url: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  uploadDate: string;
  isActive: boolean;
}

export const teacherContent: ContentItem[] = [
  {
    id: "content-1",
    title: "Introduction to Algebra - Complete Guide",
    description: "Comprehensive notes covering basic algebraic concepts and equations",
    type: "note",
    url: "https://example.com/algebra-notes.pdf",
    teacherId: "teacher-1",
    teacherName: "Dr. Emily Wilson",
    subject: "Mathematics",
    uploadDate: "2024-01-15",
    isActive: true
  },
  {
    id: "content-2",
    title: "World War II Documentary Series",
    description: "Educational video series covering key events of World War II",
    type: "video",
    url: "https://www.youtube.com/watch?v=example123",
    teacherId: "teacher-2",
    teacherName: "Prof. Michael Brown",
    subject: "History",
    uploadDate: "2024-01-12",
    isActive: true
  },
  {
    id: "content-3",
    title: "Chemistry Lab Safety Guidelines",
    description: "Important safety protocols for chemistry laboratory work",
    type: "note",
    url: "https://example.com/chemistry-safety.pdf",
    teacherId: "teacher-1",
    teacherName: "Dr. Emily Wilson",
    subject: "Chemistry",
    uploadDate: "2024-01-10",
    isActive: true
  },
  {
    id: "content-4",
    title: "Interactive Physics Simulations",
    description: "Collection of interactive physics experiments and simulations",
    type: "link",
    url: "https://phet.colorado.edu/en/simulations",
    teacherId: "teacher-2",
    teacherName: "Prof. Michael Brown",
    subject: "Physics",
    uploadDate: "2024-01-08",
    isActive: true
  }
];

export function getContentForStudents() {
  return teacherContent.filter(item => item.isActive);
}

export function getContentByTeacher(teacherId: string) {
  return teacherContent.filter(item => item.teacherId === teacherId && item.isActive);
}

export function getContentBySubject(subject: string) {
  return teacherContent.filter(item => item.subject === subject && item.isActive);
}
