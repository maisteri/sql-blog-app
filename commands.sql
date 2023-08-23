CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Burton G. Malkiel', 'www.malkiel.com', 'A Random Walk Down Wall Street');

INSERT INTO blogs (author, url, title) VALUES ('Mr. Balanis', 'www.malkiel.com', 'Antenna Theory');
