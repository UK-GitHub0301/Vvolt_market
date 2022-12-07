-- migrate:up
CREATE TABLE follow (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    follower INT NOT NULL,
    followee INT NOT NULL,
    FOREIGN KEY (follower) REFERENCES users(id),
    FOREIGN KEY (followee) REFERENCES users(id)
    )

-- migrate:down

