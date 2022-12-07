-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    user_id INT NOT NULL,
    location VARCHAR(100) NOT NULL,
    latitude DECIMAL(16,14) NOT NULL,
    longitude DECIMAL(16,14) NOT NULL,
    product_status_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (product_status_id) REFERENCES product_status(id)
    )

-- migrate:down

