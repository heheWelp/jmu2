CREATE TABLE public.course (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  name text NULL,
  course_code text NULL,
  education_level uuid NULL,
  user_type uuid NULL,
  thumbnail_url text NULL,
  status text NULL DEFAULT 'draft'::text,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  created_by uuid NULL,
  feedback_enabled boolean NULL DEFAULT false,
  feedback_type text NULL,
  feedback_frequency text NULL,
  published_at timestamp with time zone NULL,
  CONSTRAINT course_pkey PRIMARY KEY (id),
  CONSTRAINT course_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id),
  CONSTRAINT fk_course_education_level FOREIGN KEY (education_level) REFERENCES education_levels(id),
  CONSTRAINT fk_course_user_type FOREIGN KEY (user_type) REFERENCES user_roles(id)
);

CREATE TABLE public.course_content_structure (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  parent_id uuid,
  display_order integer NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT course_content_structure_pkey PRIMARY KEY (id),
  CONSTRAINT unique_content_item UNIQUE (content_type, content_id),
  CONSTRAINT unique_content_order UNIQUE (course_id, parent_id, display_order),
  CONSTRAINT fk_course_content_structure_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_course_content_structure_course_id ON public.course_content_structure USING btree (course_id);
CREATE INDEX IF NOT EXISTS idx_course_content_structure_parent_id ON public.course_content_structure USING btree (parent_id);

CREATE TABLE public.course_details (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  description text NULL,
  is_progress_limited boolean NULL DEFAULT false,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT course_details_pkey PRIMARY KEY (id),
  CONSTRAINT course_details_course_id_key UNIQUE (course_id),
  CONSTRAINT course_details_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_course_details_course_id ON public.course_details USING btree (course_id);

CREATE TABLE public.course_feedback_settings (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  feedback_enabled boolean NULL DEFAULT false,
  feedback_type character varying(50) NULL,
  feedback_frequency character varying(50) NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT course_feedback_settings_pkey PRIMARY KEY (id),
  CONSTRAINT unique_course_feedback_settings UNIQUE (course_id),
  CONSTRAINT course_feedback_settings_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE public.course_media (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  media_type character varying(50) NOT NULL,
  media_url text NOT NULL,
  course_order integer NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT course_media_pkey PRIMARY KEY (id),
  CONSTRAINT course_media_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE public.course_objectives (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  objective_text text NOT NULL,
  objective_order integer NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT course_objectives_pkey PRIMARY KEY (id),
  CONSTRAINT fk_course_objectives_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_course_objectives_course_id ON public.course_objectives USING btree (course_id);

CREATE TABLE public.course_pricing (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  price integer NULL,
  currency text NULL DEFAULT 'USD'::text,
  is_free boolean NULL DEFAULT false,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT course_pricing_pkey PRIMARY KEY (id),
  CONSTRAINT course_pricing_course_id_key UNIQUE (course_id),
  CONSTRAINT course_pricing_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_course_pricing_course_id ON public.course_pricing USING btree (course_id);

CREATE TABLE public.discussion_posts (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  user_id uuid NULL,
  course_order integer NOT NULL,
  content text NOT NULL,
  parent_id uuid,
  created_at timestamp with time zone NULL DEFAULT now(),
  course_id uuid NULL,
  CONSTRAINT discussion_posts_pkey PRIMARY KEY (id),
  CONSTRAINT discussion_posts_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
  CONSTRAINT discussion_posts_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES discussion_posts(id) ON DELETE CASCADE,
  CONSTRAINT discussion_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_discussion_posts_course_id ON public.discussion_posts USING btree (course_id);
CREATE INDEX IF NOT EXISTS idx_discussion_posts_user_id ON public.discussion_posts USING btree (user_id);

CREATE TABLE public.education_levels (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  level_name text NOT NULL,
  CONSTRAINT education_levels_pkey PRIMARY KEY (id)
);

CREATE TABLE public.enrolment (
  course_id uuid NOT NULL,
  student_id uuid NOT NULL,
  enrolment_datetime timestamp with time zone NULL,
  completed_datetime timestamp with time zone NULL,
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  CONSTRAINT enrolment_pkey PRIMARY KEY (id),
  CONSTRAINT unique_enrolment UNIQUE (course_id, student_id),
  CONSTRAINT fk_enrol_course FOREIGN KEY (course_id) REFERENCES course(id),
  CONSTRAINT fk_enrol_student FOREIGN KEY (student_id) REFERENCES profiles(id)
);

CREATE TABLE public.lesson (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  module_id uuid NOT NULL,
  name text NULL,
  number integer NULL,
  course_order integer NULL,
  CONSTRAINT lesson_pkey PRIMARY KEY (id),
  CONSTRAINT fk_lesson_module FOREIGN KEY (module_id) REFERENCES module(id)
);

CREATE TABLE public.lesson_content (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  lesson_id uuid NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  content_type text NOT NULL DEFAULT 'text'::text,
  title text NULL,
  content_order integer NOT NULL DEFAULT 0,
  display_order integer NULL DEFAULT 0,
  content_id uuid,
  CONSTRAINT lesson_content_pkey PRIMARY KEY (id),
  CONSTRAINT lesson_content_discussion_fkey FOREIGN KEY (content_id) REFERENCES lesson_discussions(id) ON DELETE CASCADE,
  CONSTRAINT lesson_content_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lesson(id) ON DELETE CASCADE,
  CONSTRAINT lesson_content_media_fkey FOREIGN KEY (content_id) REFERENCES media(id) ON DELETE CASCADE,
  CONSTRAINT lesson_content_text_fkey FOREIGN KEY (content_id) REFERENCES text_content(id) ON DELETE CASCADE,
  CONSTRAINT lesson_content_type_check CHECK ((content_type = ANY (ARRAY['text'::text, 'media'::text, 'discussion'::text])))
);
CREATE INDEX IF NOT EXISTS idx_lesson_content_lesson_id ON public.lesson_content USING btree (lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_content_order ON public.lesson_content USING btree (lesson_id, display_order);
CREATE INDEX IF NOT EXISTS idx_lesson_content_content_id ON public.lesson_content USING btree (content_id);
CREATE INDEX IF NOT EXISTS idx_lesson_content_lesson_id_order ON public.lesson_content USING btree (lesson_id, content_order);

CREATE TABLE public.lesson_discussions (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  title text NULL,
  description text NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT lesson_discussions_pkey PRIMARY KEY (id)
);
CREATE INDEX IF NOT EXISTS idx_lesson_discussions_id ON public.lesson_discussions USING btree (id);

CREATE TABLE public.media (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NULL,
  media_type text NOT NULL,
  media_url text NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  title text NULL,
  description text NULL,
  file_type text NULL,
  file_size integer NULL,
  duration integer NULL,
  document_type text NULL,
  CONSTRAINT media_pkey PRIMARY KEY (id),
  CONSTRAINT fk_media_course FOREIGN KEY (course_id) REFERENCES course(id),
  CONSTRAINT media_document_type_check CHECK ((document_type = ANY (ARRAY['pdf'::text, 'doc'::text, 'docx'::text, 'txt'::text, 'xlsx'::text, 'pptx'::text, NULL::text])))
);
CREATE INDEX IF NOT EXISTS idx_media_course_id ON public.media USING btree (course_id);

CREATE TABLE public.module (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  name text NULL,
  number integer NULL,
  CONSTRAINT module_pkey PRIMARY KEY (id),
  CONSTRAINT fk_module_course FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  user_id uuid NOT NULL,
  first_name text NULL,
  last_name text NULL,
  email text NULL,
  preferred_name text NULL,
  profile_picture text NULL,
  user_role uuid NULL,
  education_level uuid NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_education_level_fkey FOREIGN KEY (education_level) REFERENCES education_levels(id),
  CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT profiles_user_role_fkey FOREIGN KEY (user_role) REFERENCES user_roles(id)
);
CREATE INDEX IF NOT EXISTS idx_profiles_user_role ON public.profiles USING btree (user_role);
CREATE INDEX IF NOT EXISTS idx_profiles_education_level ON public.profiles USING btree (education_level);

CREATE TABLE public.quiz (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  name text NULL,
  number integer NULL,
  course_order integer NULL,
  description text NULL,
  time_limit_minutes integer NULL,
  passing_score integer NULL DEFAULT 70,
  max_attempts integer NULL,
  is_randomized boolean NULL DEFAULT false,
  module_id uuid NULL,
  CONSTRAINT quiz_pkey PRIMARY KEY (id),
  CONSTRAINT fk_quiz_course FOREIGN KEY (course_id) REFERENCES course(id),
  CONSTRAINT quiz_module_id_fkey FOREIGN KEY (module_id) REFERENCES module(id) ON DELETE CASCADE
);

CREATE TABLE public.quiz_answer (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  question_id uuid NOT NULL,
  answer_text text NULL,
  is_correct boolean NULL,
  CONSTRAINT quiz_answer_pkey PRIMARY KEY (id),
  CONSTRAINT fk_quizans_question FOREIGN KEY (question_id) REFERENCES quiz_question(id)
);

CREATE TABLE public.quiz_question (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  quiz_id uuid NOT NULL,
  question_title text NULL,
  CONSTRAINT quiz_question_pkey PRIMARY KEY (id),
  CONSTRAINT fk_quizquest_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE public.quiz_question_options (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  question_id uuid NOT NULL,
  option_text text NOT NULL,
  is_correct boolean NULL DEFAULT false,
  option_order integer NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT quiz_question_options_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_question_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

CREATE TABLE public.quiz_questions (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  quiz_id uuid NOT NULL,
  question_text text NOT NULL,
  question_type character varying(50) NOT NULL,
  points integer NULL DEFAULT 1,
  question_order integer NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT quiz_questions_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE public.quiz_settings (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  quiz_id uuid NOT NULL,
  min_pass_score integer NULL,
  is_pass_required boolean NULL DEFAULT false,
  time_limit_minutes integer NULL,
  allow_retakes boolean NULL DEFAULT true,
  max_attempts integer NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT quiz_settings_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_settings_quiz_id_key UNIQUE (quiz_id),
  CONSTRAINT quiz_settings_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_quiz_settings_quiz_id ON public.quiz_settings USING btree (quiz_id);

CREATE TABLE public.quizzes (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  course_id uuid NOT NULL,
  name character varying(255) NOT NULL,
  description text NULL,
  number integer NOT NULL,
  course_order integer NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT quizzes_pkey PRIMARY KEY (id),
  CONSTRAINT quizzes_course_id_fkey FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE public.student_lesson (
  student_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  completed_datetime timestamp with time zone NULL,
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  CONSTRAINT student_lesson_pkey PRIMARY KEY (id),
  CONSTRAINT unique_student_lesson UNIQUE (student_id, lesson_id),
  CONSTRAINT fk_stdles_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id),
  CONSTRAINT fk_stdles_student FOREIGN KEY (student_id) REFERENCES profiles(id)
);

CREATE TABLE public.student_quiz_attempt (
  student_id uuid NOT NULL,
  quiz_id uuid NOT NULL,
  attempt_datetime timestamp with time zone NULL,
  score_achieved integer NULL,
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  CONSTRAINT student_quiz_attempt_pkey PRIMARY KEY (id),
  CONSTRAINT unique_student_quiz_attempt UNIQUE (student_id, quiz_id, attempt_datetime),
  CONSTRAINT fk_stdquiz_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id),
  CONSTRAINT fk_stdquiz_student FOREIGN KEY (student_id) REFERENCES profiles(id)
);

CREATE TABLE public.text_content (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  content text NOT NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT text_content_pkey PRIMARY KEY (id)
);
CREATE INDEX IF NOT EXISTS idx_text_content_id ON public.text_content USING btree (id);

CREATE TABLE public.user_demographics (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  profile_id uuid NOT NULL,
  gender text NULL,
  pronouns text NULL,
  race_ethnicity text NULL,
  month_of_birth integer NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT user_demographics_pkey PRIMARY KEY (id),
  CONSTRAINT user_demographics_profile_id_key UNIQUE (profile_id),
  CONSTRAINT user_demographics_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_user_demographics_profile_id ON public.user_demographics USING btree (profile_id);

CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  role_name text NOT NULL,
  CONSTRAINT user_roles_pkey PRIMARY KEY (id)
);