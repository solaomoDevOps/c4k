-- Computer Kids Learning MySQL Database Schema
-- This file should be imported into your Hostinger MySQL database

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(64) NULL,
    verification_token_expires TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_verification_token (verification_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS children (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    name VARCHAR(100) NOT NULL,
    hand_preference ENUM('left', 'right') DEFAULT 'right',
    computer_type ENUM('mac', 'pc') DEFAULT 'pc',
    selected_avatar VARCHAR(50) DEFAULT 'robot',
    career_role VARCHAR(100) NULL,
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    age_group VARCHAR(20) DEFAULT '5-7',
    total_play_time INT DEFAULT 0,
    last_login_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    lesson_number INT NOT NULL,
    description TEXT,
    computer_type VARCHAR(20) DEFAULT 'all',
    content JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_lesson_number (lesson_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 0,
    attempts INT DEFAULT 0,
    time_spent INT DEFAULT 0,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_child_lesson (child_id, lesson_id),
    INDEX idx_child_id (child_id),
    INDEX idx_lesson_id (lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    audio_enabled BOOLEAN DEFAULT TRUE,
    text_size ENUM('small', 'medium', 'large') DEFAULT 'medium',
    difficulty_level INT DEFAULT 1,
    screen_time_limit INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    UNIQUE KEY unique_child_settings (child_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS daily_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    child_id INT NOT NULL,
    reward_date DATE NOT NULL,
    xp_earned INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    UNIQUE KEY unique_child_date (child_id, reward_date),
    INDEX idx_child_id (child_id),
    INDEX idx_reward_date (reward_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default lessons
INSERT INTO lessons (title, category, lesson_number, description, computer_type) VALUES
('What is a Mouse?', 'mouse', 1, 'Learn to move the mouse cursor', 'all'),
('Single Clicking', 'mouse', 2, 'Learn to click buttons', 'all'),
('Double Clicking', 'mouse', 3, 'Master double-clicking', 'all'),
('Drag and Drop', 'mouse', 4, 'Learn to drag items', 'all'),
('Introduction to Keyboard', 'keyboard', 1, 'Learn keyboard layout', 'all'),
('Hand Placement', 'keyboard', 2, 'Proper hand position', 'all'),
('Typing Letters', 'keyboard', 3, 'Practice typing letters', 'all'),
('Typing Simple Words', 'keyboard', 4, 'Practice typing words', 'all'),
('What is a Computer?', 'computer-basics', 1, 'Learn about computers', 'all'),
('Turning Computer On and Off', 'computer-basics', 2, 'Turn computer on and off', 'all'),
('Using the Desktop', 'computer-basics', 3, 'Learn about the desktop', 'all'),
('Opening and Closing Programs', 'computer-basics', 4, 'Start and exit programs', 'all'),
('Understanding Windows', 'navigation', 1, 'Minimize, maximize, close', 'all'),
('Switching Between Windows', 'navigation', 2, 'Navigate between windows', 'all'),
('Using Scrollbars', 'navigation', 3, 'Learn to scroll content', 'all'),
('Using Menus', 'navigation', 4, 'Navigate menus and buttons', 'all'),
('What Are Files and Folders?', 'files', 1, 'Understanding file systems', 'all'),
('Creating Files', 'files', 2, 'Learn to create new files', 'all'),
('Saving and Opening Files', 'files', 3, 'Save and open documents', 'all'),
('Naming Files', 'files', 4, 'Proper file naming conventions', 'all'),
('Drawing Tools', 'creative-tools', 1, 'Use digital drawing tools', 'all'),
('Stamps and Stickers', 'creative-tools', 2, 'Add fun elements to art', 'all'),
('Taking Screenshots', 'creative-tools', 3, 'Capture screen images', 'all'),
('Creating a Comic Strip', 'creative-tools', 4, 'Make your own comic', 'all'),
('Creative Story Builder', 'creative-tools', 5, 'Build interactive stories', 'all'),
('Capital Letters', 'advanced-typing', 1, 'Using shift key for capitals', 'all'),
('Punctuation Practice', 'advanced-typing', 2, 'Type punctuation marks', 'all'),
('Arrow Keys Navigation', 'advanced-typing', 3, 'Navigate with arrow keys', 'all'),
('Backspace and Delete', 'advanced-typing', 4, 'Learn to edit text', 'all'),
('What Is the Internet?', 'internet-safety', 1, 'Understanding the internet', 'all'),
('Using a Browser', 'internet-safety', 2, 'Browse websites safely', 'all'),
('Online Safety Basics', 'internet-safety', 3, 'Stay safe online', 'all'),
('Recognizing Ads and Pop-ups', 'internet-safety', 4, 'Identify online ads', 'all'),
('Basic Troubleshooting', 'bonus-skills', 1, 'Fix common problems', 'all'),
('Sound Settings', 'bonus-skills', 2, 'Adjust audio settings', 'all'),
('Touch Screens', 'bonus-skills', 3, 'Use touchscreen devices', 'all'),
('Using a Trackpad', 'bonus-skills', 4, 'Master trackpad gestures', 'all'),
('Keyboard Shortcuts for Kids', 'bonus-skills', 5, 'Learn helpful shortcuts', 'all'),
('Text Formatting Basics', 'bonus-skills', 6, 'Format text styles', 'all'),
('Drag-and-Drop Mastery', 'bonus-skills', 7, 'Advanced drag and drop', 'all')
ON DUPLICATE KEY UPDATE title=VALUES(title);
