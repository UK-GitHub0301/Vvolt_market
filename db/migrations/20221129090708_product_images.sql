-- migrate:up
CREATE TABLE product_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url varchar(2000) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
    )
-- migrate:down

