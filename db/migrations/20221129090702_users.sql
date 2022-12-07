-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    address varchar(50) NOT NULL,
    latitude DECIMAL(16,14) NOT NULL,
    longitude DECIMAL(16,14) NOT NULL,
    user_image varchar(50) NULL,
    nickname varchar(50) NOT NULL,
    description varchar(50) NULL,
    social_id varchar(50) NOT NULL,
    social_platform_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (social_platform_id) REFERENCES social_platform(id),
    UNIQUE(nickname)
)

-- migrate:down

