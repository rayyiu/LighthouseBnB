INSERT INTO users (name, email, password)
VALUES ('Bob McBobbingbob', 'thebobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password)
VALUES ('John McJohningjohn', 'thejohns@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password)
VALUES ('Tom McTommingtom', 'thetoms@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES ('Property Harry', 'description', 'https://http.cat/200', 'https://http.cat/200', 80, 1, 1, 1, 'Canada', '122 NO street', 'North Pole', 'North', 'VVV 111', true),
('Property Garry', 'description', 'https://http.cat/200', 'https://http.cat/200', 90, 2, 2, 2, 'Canada', '123 NO street', 'North Pole 2 RENORTHED', 'DoubleNorth', 'VVV 112', true),
('Property Barry', 'description', 'https://http.cat/200', 'https://http.cat/200', 800, 100, 20, 9, 'RichPeopleCountry', 'Gated Community', 'VeggieTown', 'BallLane', 'StandOutside', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2011-11-11', '2011-11-21', 1, 2),
('2012-12-12', '2012-12-20', 2, 1),
('2010-10-10', '2010-12-12', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 1, 1, 4, 'messages'),
VALUES (2, 2, 2, 4, 'messages'),
VALUES (3, 3, 3, 5, 'i got my ball');
