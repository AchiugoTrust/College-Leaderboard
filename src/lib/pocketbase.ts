import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

// PocketBase instance
export const pb = new PocketBase('http://localhost:8090');

// Types for our collections
export interface User {
	id: string;
	email: string;
	username: string;
	name: string;
	avatar?: string;
	role: 'student' | 'lecturer' | 'staff' | 'admin';
	student_id?: string;
	department?: string;
	year_of_study?: number;
	phone?: string;
	bio?: string;
	created: string;
	updated: string;
}

export interface Department {
	id: string;
	name: string;
	code: string;
	description?: string;
	head_of_department?: string;
	created: string;
	updated: string;
}

export interface Course {
	id: string;
	name: string;
	code: string;
	description?: string;
	credits: number;
	department: string;
	lecturer: string;
	semester: 'Fall' | 'Spring' | 'Summer';
	year: number;
	max_students?: number;
	is_active: boolean;
	created: string;
	updated: string;
}

export interface Enrollment {
	id: string;
	student: string;
	course: string;
	enrollment_date: string;
	status: 'enrolled' | 'dropped' | 'completed';
	final_grade?: string;
	created: string;
	updated: string;
}

export interface Assignment {
	id: string;
	title: string;
	description?: string;
	course: string;
	type: 'homework' | 'quiz' | 'exam' | 'project' | 'lab';
	total_points: number;
	due_date: string;
	created_by: string;
	instructions?: string;
	attachments?: string[];
	is_published: boolean;
	allow_late_submission: boolean;
	late_penalty_percent?: number;
	created: string;
	updated: string;
}

export interface Submission {
	id: string;
	assignment: string;
	student: string;
	submitted_at: string;
	content?: string;
	attachments?: string[];
	score?: number;
	feedback?: string;
	graded_by?: string;
	graded_at?: string;
	status: 'submitted' | 'graded' | 'returned';
	is_late: boolean;
	created: string;
	updated: string;
}

export interface Announcement {
	id: string;
	title: string;
	content: string;
	course?: string;
	created_by: string;
	priority: 'low' | 'normal' | 'high' | 'urgent';
	is_pinned: boolean;
	target_roles: ('student' | 'lecturer' | 'staff' | 'all')[];
	expires_at?: string;
	created: string;
	updated: string;
}

export interface Grade {
	id: string;
	student: string;
	course: string;
	assignment?: string;
	points_earned: number;
	points_possible: number;
	percentage: number;
	letter_grade?: string;
	graded_by: string;
	graded_at: string;
	comments?: string;
	created: string;
	updated: string;
}

export interface Attendance {
	id: string;
	student: string;
	course: string;
	date: string;
	status: 'present' | 'absent' | 'late' | 'excused';
	notes?: string;
	recorded_by: string;
	created: string;
	updated: string;
}

export interface Notification {
	id: string;
	user: string;
	title: string;
	message: string;
	type: 'assignment' | 'grade' | 'announcement' | 'system';
	is_read: boolean;
	related_id?: string;
	related_type?: string;
	created: string;
	updated: string;
}

// Auth store
export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		isAuthenticated: false,
		user: null,
		loading: true
	});

	return {
		subscribe,
		
		// Initialize auth state from PocketBase
		init: async () => {
			update(state => ({ ...state, loading: true }));
			
			// Check if there's a valid auth token
			if (pb.authStore.isValid) {
				try {
					// Refresh the auth token
					await pb.collection('users').authRefresh();
					set({
						isAuthenticated: true,
						user: pb.authStore.model as User,
						loading: false
					});
				} catch (error) {
					console.error('Auth refresh failed:', error);
					pb.authStore.clear();
					set({
						isAuthenticated: false,
						user: null,
						loading: false
					});
				}
			} else {
				set({
					isAuthenticated: false,
					user: null,
					loading: false
				});
			}
		},

		// Login
		login: async (email: string, password: string) => {
			try {
				const authData = await pb.collection('users').authWithPassword(email, password);
				set({
					isAuthenticated: true,
					user: authData.record as User,
					loading: false
				});
				return { success: true };
			} catch (error: any) {
				console.error('Login failed:', error);
				return { 
					success: false, 
					error: error.message || 'Login failed' 
				};
			}
		},

		// Register
		register: async (userData: {
			email: string;
			password: string;
			passwordConfirm: string;
			name: string;
			username: string;
			role: 'student' | 'lecturer' | 'staff';
			student_id?: string;
			department?: string;
			year_of_study?: number;
		}) => {
			try {
				const record = await pb.collection('users').create(userData);
				
				// Auto-login after registration
				const authData = await pb.collection('users').authWithPassword(userData.email, userData.password);
				set({
					isAuthenticated: true,
					user: authData.record as User,
					loading: false
				});
				return { success: true };
			} catch (error: any) {
				console.error('Registration failed:', error);
				return { 
					success: false, 
					error: error.message || 'Registration failed' 
				};
			}
		},

		// Logout
		logout: () => {
			pb.authStore.clear();
			set({
				isAuthenticated: false,
				user: null,
				loading: false
			});
		},

		// Update user profile
		updateProfile: async (userData: Partial<User>) => {
			try {
				if (!pb.authStore.model?.id) throw new Error('No authenticated user');
				
				const updatedUser = await pb.collection('users').update(pb.authStore.model.id, userData);
				update(state => ({
					...state,
					user: updatedUser as User
				}));
				return { success: true };
			} catch (error: any) {
				console.error('Profile update failed:', error);
				return { 
					success: false, 
					error: error.message || 'Profile update failed' 
				};
			}
		}
	};
}

export const authStore = createAuthStore();

// Collection helpers
export const collections = {
	users: () => pb.collection('users'),
	departments: () => pb.collection('departments'),
	courses: () => pb.collection('courses'),
	enrollments: () => pb.collection('enrollments'),
	assignments: () => pb.collection('assignments'),
	submissions: () => pb.collection('submissions'),
	announcements: () => pb.collection('announcements'),
	grades: () => pb.collection('grades'),
	attendance: () => pb.collection('attendance'),
	notifications: () => pb.collection('notifications')
};

// Utility functions
export const utils = {
	// Get user's enrolled courses
	getUserCourses: async (userId: string): Promise<Course[]> => {
		const enrollments = await collections.enrollments().getFullList({
			filter: `student = "${userId}" && status = "enrolled"`,
			expand: 'course'
		});
		return enrollments.map((enrollment: any) => enrollment.expand.course);
	},

	// Get assignments for a course
	getCourseAssignments: async (courseId: string): Promise<Assignment[]> => {
		return await collections.assignments().getFullList({
			filter: `course = "${courseId}" && is_published = true`,
			sort: '-due_date'
		});
	},

	// Get user's submissions
	getUserSubmissions: async (userId: string): Promise<Submission[]> => {
		return await collections.submissions().getFullList({
			filter: `student = "${userId}"`,
			expand: 'assignment,assignment.course',
			sort: '-submitted_at'
		});
	},

	// Get grades for a student in a course
	getStudentGrades: async (studentId: string, courseId: string): Promise<Grade[]> => {
		return await collections.grades().getFullList({
			filter: `student = "${studentId}" && course = "${courseId}"`,
			expand: 'assignment',
			sort: '-graded_at'
		});
	},

	// Calculate course average
	calculateCourseAverage: (grades: Grade[]): number => {
		if (grades.length === 0) return 0;
		const total = grades.reduce((sum, grade) => sum + grade.percentage, 0);
		return Math.round((total / grades.length) * 100) / 100;
	},

	// Get user's notifications
	getUserNotifications: async (userId: string): Promise<Notification[]> => {
		return await collections.notifications().getFullList({
			filter: `user = "${userId}"`,
			sort: '-created'
		});
	},

	// Mark notification as read
	markNotificationRead: async (notificationId: string): Promise<void> => {
		await collections.notifications().update(notificationId, { is_read: true });
	}
};

