SELECT properties.city as city, count(properties.city) as city_reservations
FROM reservations
JOIN properties ON reservations.property_id = properties.id
GROUP BY properties.city
ORDER BY city_reservations DESC;