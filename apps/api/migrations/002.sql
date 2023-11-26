DELETE FROM user_profiles as p WHERE p.user_id in (SELECT id FROM users WHERE telegram_id IN (1000, 2000, 3000));
DELETE FROM user_data as p WHERE p.user_id in (SELECT id FROM users WHERE telegram_id IN (1000, 2000, 3000));
DELETE FROM users WHERE telegram_id IN (1000, 2000, 3000);

-- **** Test1
INSERT INTO users (telegram_id, telegram_username) VALUES (1000, 'test1');
INSERT INTO user_data (user_id, data) VALUES ((SELECT id FROM users WHERE telegram_id = 1000), '{"firstName":"Test1","lastName":"Tester1","avatarUrl":"https://i.pravatar.cc/150?img=3"}');
-- Národní Muzeum coordinates
INSERT INTO user_profiles (type, value, user_id, location) VALUES ('musician', '{}', (SELECT id FROM users WHERE telegram_id = 1000), ST_MakePoint(50.0792892944596, 14.430894345419974));

-- **** Test2
INSERT INTO users (telegram_id, telegram_username) VALUES (2000, 'test2');
INSERT INTO user_data (user_id, data) VALUES ((SELECT id FROM users WHERE telegram_id = 2000), '{"firstName":"Test2","lastName":"Tester2","avatarUrl":"https://i.pravatar.cc/150?img=3"}');
-- Dancing House
INSERT INTO user_profiles (type, value, user_id, location) VALUES ('singer', '{}', (SELECT id FROM users WHERE telegram_id = 2000), ST_MakePoint(50.07577208732303, 14.414210180128977));

-- **** Test3
INSERT INTO users (telegram_id, telegram_username) VALUES (3000, 'test3');
INSERT INTO user_data (user_id, data) VALUES ((SELECT id FROM users WHERE telegram_id = 3000), '{"firstName":"Test3","lastName":"Tester3","avatarUrl":"https://i.pravatar.cc/150?img=3"}');
-- Hotel Globus
INSERT INTO user_profiles (type, value, user_id, location) VALUES ('musician', '{}', (SELECT id FROM users WHERE telegram_id = 3000), ST_MakePoint(50.03517553318093, 14.476592911777223));
-- Microsoft
INSERT INTO user_profiles (type, value, user_id, location) VALUES ('singer', '{}', (SELECT id FROM users WHERE telegram_id = 3000), ST_MakePoint(50.048763284931916, 14.457323922916714));

-- **** Sergey
INSERT INTO users (telegram_id, telegram_username) VALUES (1312211840, 'akopkokhyants') ON CONFLICT DO NOTHING;
INSERT INTO user_data (user_id, data) VALUES ((SELECT id FROM users WHERE telegram_id = 1312211840), '{"firstName":"Sergey","lastName":"Akopkokhyants","avatarUrl":"https://i.pravatar.cc/150?img=3"}');
-- Address in coordinates
INSERT INTO user_profiles (type, value, user_id, location) VALUES ('musician', '{}', (SELECT id FROM users WHERE telegram_id = 1312211840), ST_MakePoint(50.08533392799772, 14.454851835705819));