-- migrate:up
CREATE TABLE product_status (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(20) NOT NULL
    )

-- migrate:down

