-- Database Schema for Learning Management System (LMS)

-- User Management Tables
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE education_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    education_level UUID REFERENCES education_levels(id),
    user_role UUID REFERENCES user_roles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ
);

CREATE TABLE user_demographics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE REFERENCES profiles(id),
    date_of_birth DATE,
    gender TEXT,
    country TEXT,
    city TEXT,
    occupation TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Course Management Tables
CREATE TABLE course (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    course_code TEXT,
    education_level UUID REFERENCES education_levels(id),
    user_type UUID REFERENCES user_roles(id),
    thumbnail_url TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES profiles(id),
    feedback_enabled BOOLEAN DEFAULT false,
    feedback_type TEXT,
    feedback_frequency TEXT,
    published_at TIMESTAMPTZ
);

CREATE TABLE course_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID UNIQUE REFERENCES course(id),
    description TEXT,
    learning_outcomes TEXT,
    prerequisites TEXT,
    duration_minutes INTEGER
);

CREATE TABLE course_objectives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    objective TEXT,
    order_number INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE course_pricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID UNIQUE REFERENCES course(id),
    price DECIMAL,
    currency TEXT,
    is_free BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE course_feedback_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID UNIQUE REFERENCES course(id),
    feedback_type TEXT,
    frequency TEXT,
    is_anonymous BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Course Content Structure
CREATE TABLE module (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    title TEXT,
    order_number INTEGER
);

CREATE TABLE lesson (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES module(id),
    title TEXT,
    order_number INTEGER,
    duration_minutes INTEGER
);

CREATE TABLE lesson_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID UNIQUE REFERENCES lesson(id),
    content TEXT,
    video_url TEXT,
    attachments JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE course_content_structure (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    content_type TEXT,
    content_id UUID,
    parent_id UUID,
    display_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(content_type, content_id),
    UNIQUE(course_id, parent_id, display_order)
);

-- Media Management
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    module_id UUID REFERENCES module(id),
    title TEXT,
    file_type TEXT,
    file_url TEXT,
    thumbnail_url TEXT,
    description TEXT,
    duration_seconds INTEGER,
    size_bytes BIGINT,
    course_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(course_id, course_order)
);

CREATE TABLE course_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    media_type TEXT,
    file_url TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Assessment Tables
CREATE TABLE quiz (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    module_id UUID REFERENCES module(id),
    title TEXT,
    description TEXT,
    passing_score INTEGER,
    max_attempts INTEGER,
    time_limit_minutes INTEGER,
    is_randomized BOOLEAN DEFAULT false,
    show_correct_answers BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quiz_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID UNIQUE REFERENCES quiz(id),
    time_limit_minutes INTEGER,
    passing_score INTEGER,
    max_attempts INTEGER,
    show_correct_answers BOOLEAN DEFAULT true,
    randomize_questions BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quiz_question (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quiz(id),
    question_text TEXT
);

CREATE TABLE quiz_answer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES quiz_question(id),
    answer_text TEXT,
    is_correct BOOLEAN DEFAULT false
);

-- Newer Quiz Tables (Updated Structure)
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    title TEXT,
    description TEXT,
    duration_minutes INTEGER,
    passing_score INTEGER,
    max_attempts INTEGER,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id),
    question_text TEXT,
    question_type TEXT,
    points INTEGER DEFAULT 1,
    order_number INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quiz_question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES quiz_questions(id),
    option_text TEXT,
    is_correct BOOLEAN DEFAULT false,
    order_number INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Student Progress Tracking
CREATE TABLE enrolment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id),
    course_id UUID REFERENCES course(id),
    enrolled_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    UNIQUE(student_id, course_id)
);

CREATE TABLE student_lesson (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id),
    lesson_id UUID REFERENCES lesson(id),
    completed_at TIMESTAMPTZ,
    UNIQUE(student_id, lesson_id)
);

CREATE TABLE student_quiz_attempt (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id),
    quiz_id UUID REFERENCES quiz(id),
    score INTEGER,
    attempt_datetime TIMESTAMPTZ DEFAULT now(),
    UNIQUE(student_id, quiz_id, attempt_datetime)
);

-- Discussion Forum
CREATE TABLE discussion_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES course(id),
    parent_id UUID REFERENCES discussion_posts(id),
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID
);

-- Indexes for Performance
CREATE INDEX idx_course_status ON course(status);
CREATE INDEX idx_course_education_level ON course(education_level);
CREATE INDEX idx_course_user_type ON course(user_type);
CREATE INDEX idx_profiles_user_role ON profiles(user_role);
CREATE INDEX idx_profiles_education_level ON profiles(education_level);
CREATE INDEX idx_enrolment_student ON enrolment(student_id);
CREATE INDEX idx_enrolment_course ON enrolment(course_id);
CREATE INDEX idx_lesson_module ON lesson(module_id);
CREATE INDEX idx_module_course ON module(course_id);
CREATE INDEX idx_quiz_course ON quiz(course_id);
CREATE INDEX idx_student_lesson_student ON student_lesson(student_id);
CREATE INDEX idx_student_lesson_lesson ON student_lesson(lesson_id);
CREATE INDEX idx_student_quiz_student ON student_quiz_attempt(student_id);
CREATE INDEX idx_student_quiz_quiz ON student_quiz_attempt(quiz_id);
CREATE INDEX idx_discussion_course ON discussion_posts(course_id);
CREATE INDEX idx_discussion_parent ON discussion_posts(parent_id);

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE course ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrolment ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_lesson ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_quiz_attempt ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_posts ENABLE ROW LEVEL SECURITY;

-- Comments
COMMENT ON TABLE module IS 'A smaller part of a course, which contains lessons.';
COMMENT ON TABLE lesson IS 'An individual step within a course that may include a video and a description.';
COMMENT ON TABLE quiz IS 'A record of a quiz within a course, that a student can take to test their knowledge.';
COMMENT ON TABLE quiz_question IS 'An individual question on a quiz.';
COMMENT ON TABLE quiz_answer IS 'A record of answers that can be selected for a question.';
COMMENT ON TABLE student_quiz_attempt IS 'A record of attempts that a student has made on a course, including their score on the quiz.';
COMMENT ON TABLE student_lesson IS 'A record of students and the lessons for the courses they have enrolled in, so we can track the completion percentage';
COMMENT ON TABLE enrolment IS 'A combination of students and courses to indicate the courses that students have enrolled in.';
COMMENT ON TABLE course IS 'A course that teaches a specific topic and can be enrolled in by students.'; 