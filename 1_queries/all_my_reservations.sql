SELECT reservations.* as all_reservations, properties.* as all_properties, avg(property_revies.rating) as average_rating
 FROM reservations
 JOIN properties ON reservations.property_id = properties.id
 JOIN property_reviews ON property_reviews.property_id = properties.id 
 JOIN users ON reservations.guest_id = users.id  
 WHERE users.id = 1 AND reservations.end-date < now()::date
 GROUP BY properties.id, reservations.id 
 ORDER BY reservations.start_date
 LIMIT 10; 