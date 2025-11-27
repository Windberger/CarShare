INSERT INTO public.address (address_id, place_id, description) VALUES (1001, 'ChIJ6cmXL--zb0cRLBlzX8cewxY', 'Blumenweg 23, 8072 Enzelsdorf, Österreich');
INSERT INTO public.address (address_id, place_id, description) VALUES (1002, 'ChIJ1wvjNMCkb0cR3kRkVkLEB7Y', 'HTBLA Kaindorf an der Sulm, Grazer Straße, Kaindorf, Österreich');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1003, 'Fernitz-Mellach', 'AT', '29', '8072', 'Blumenweg');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1004, 'Fernitz-Mellach', 'AT', '27', '8072', 'Blumenweg');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1006, 'Kaindorf', 'AT', '202', '8430', 'Grazer Strasse');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1007, 'Kaindorf an der Sulm', 'AT', '202', '8430', 'Grazer Strasse');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1008, 'Feldkirchen bei Graz', 'AT', '35', '8073', 'Trattenstrasse');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1009, 'Laa', 'AT', '5', '8141', 'Grillweg');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1005, 'Graz', 'AT', '116', '8020', 'Keplerstrasse');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1010, 'Berlin', 'DE', '2', '10117', 'Pariser Platz');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1011, 'Salzburg', 'AT', '2', '5020', 'Saint-Julien-Strasse');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1012, 'Moscow', 'RU', '3', '119334', 'Ulitsa Vavilova');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1014, 'Feldkirchen bei Graz', 'AT', '179', '8073', 'Triester Strasse');
-- INSERT INTO public.address (address_id, city, country, house_number, postal_code, street) VALUES (1015, 'Lebring', 'AT', '14', '8403', 'Leibnitzer Strasse');

INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1007, 'din@cajic.com', 'Din ', 'Cajic', '$2a$10$mLuYmTBLxfQZT1HeQVLtSutbnhXfM2PBbxsBemzoLHmAVjEEbsmA.');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1001, 'david@fink.com', 'David', 'Fink', '$2a$10$OXgD3lfuZzwEFyzNYImxzOqTNYL9VHNcN6.h1YEms/B8SkyiirtiC');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1002, 'mario@wind.com', 'Mario', 'Windberger', '$2a$10$4kdwTEdGg7SsUyD8qLSKj.Y224rBevnkJ/gL99BQUIb.yjxST9Ufe');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1003, 'mario@windberger.com', 'Mario', 'Windberger', '$2a$10$fgTfVifZzYzngQ/nH7/8YuhGXcIfu70msN3vVVfrsq98LueF.g4ru');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1006, 'nico@riedner.com', 'Nico', 'Riedner', '$2a$10$zzySX4C8eV2wLZSLSc4AzeSEmjZwcRTmHF2VevovNqOqYPSc3McFi');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1005, 'test1@gmail.com', 'Test 1', 'Test 1', '$2a$10$twJm8/coUDp0rbTHVWy4SO5zP1yQQhA2HVLx61CGN89iKioC1gNq2');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1008, 'din2@cajic.com', 'Din', 'Cajic', '$2a$10$znWrqjbBoEWtnKFRThKXNOmcl5lFWfdNaOh9/2t8Izuf9rH4yMSNq');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1009, 'johanna.hechtl@gmail.com', null, null, '$2a$10$1bXvT56nIYFzAJyrR2YKhOb7BZHMkkr64Eks8D8Gc5zLzR5Qqv5Lu');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1010, 'test@gmail.com', 'Mario', 'Windberger', '$2a$10$kLf2W3GiP8tyGTVd82n7z.uMTMsvXfjrDFtd5CGFrNzZDxhMoaSkS');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1011, 'test2@gmail.com', 'Johanna', 'Hechtl', '$2a$10$3j1yq3tjwiIyijyWB8ERJOJ/zrkEKh//2dy1L9bQvbPaE7vV124ey');
INSERT INTO public.user_account (user_id, email, firstname, lastname, password) VALUES (1012, 'test3@gmail.com', 'Din', 'Cajic', '$2a$10$YpsW0K/QYywXGqemd4AIx.6svAWqplhxsdZACys6yXm6zJj3e0tLa');

INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1010, 1001, 1001, 1002, '2025-12-31 23:59:00.000000', 'WQUD1CHG');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1002, 1002, 1007, 1001, '2025-05-31 02:05:00.000000', 'HYQM92QE');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1003, 1003, 1008, 1001, '2025-07-06 15:58:00.000000', 'RDLFYZD3');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1001, 1006, 1010, 1005, '2025-06-05 10:00:00.000000', 'YOBWI3BC');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1001, 1010, 1013, 1001, '2025-06-15 17:02:00.000000', 'L15H8XN4');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1001, 1012, 1014, 1001, '2025-06-15 17:28:00.000000', 'ZF33GVCL');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1001, 1002, 1022, 1001, '2025-12-31 23:59:00.000000', '65SG23S0');
-- INSERT INTO public.route (driver, end_address, route_id, start_address, start_time, join_code) VALUES (1010, 1006, 1023, 1001, '2025-07-06 12:00:00.000000', 'OPYBNA40');
--
INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1002, 1002, 1001, 1001);
-- INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1004, 1001, 1008, 1001);
-- INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1006, 1006, 1010, 1005);
-- INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1009, 1005, 1010, 1005);
-- INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1010, 1006, 1013, 1011);
-- INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1006, 1011, 1023, 1014);
-- INSERT INTO public.route_member (end_address, member_id, route_id, start_address) VALUES (1015, 1012, 1023, 1001);

