export interface Course {
    id: number; // Unique ID of the course
    courseImage: string; // URL of the course image
    courseName: string; // Name of the course
    providerName: string; // Name of the course provider
    providerImage: string; // URL of the provider's image
    providerTitle: string; // Title/position of the provider
    price: string; // Price of the course (as a string for display purposes)
    totalEnrolls?: string; // Total number of enrollments (optional)
    courseCategory: string; // Category of the course (e.g., Frontend Development, Backend Development)
    courseType: string; // Type of course (e.g., "featured course", "all course")
  }
  