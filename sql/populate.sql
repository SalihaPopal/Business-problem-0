DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS notifications;

DROP TABLE IF EXISTS session_signups;

DROP TABLE IF EXISTS session_privacy;

CREATE TABLE users (id SERIAL PRIMARY KEY,
                                          name VARCHAR(50) NOT NULL,
                                                           email VARCHAR(100) NOT NULL,
                                                                   phone INT(20),
                                                                        password VARCHAR(100) NOT NULL,
                                                                              role VARCHAR(20) NOT NULL);
            

CREATE TABLE sessions (id SERIAL PRIMARY KEY,
                                          session_date_time TIMESTAMP NOT NULL,
                                                           session_description TEXT,
                                                                  FOREIGN KEY (volunteer_id, 
                                                                               manager_id) REFERENCES users(id),
                                                                  status VARCHAR(10) NOT NULL); 
 

CREATE TABLE notifications (id SERIAL PRIMARY KEY,
                                         FOREIGN KEY (volunteer_id,
                                                      manager_id) REFERENCES users(id),
                                                        message TEXT,
                                                                   timestamp TIMESTAMP NOT NULL,
                                                                        status VARCHAR(10) NOT NULL);
              

CREATE TABLE session_signups (session_signup_id SERIAL PRIMARY KEY,
                                          FOREIGN KEY session_id REFERENCES sessions(id),
                                                  FOREIGN KEY volunteer_id REFERENCES users(id)); 
            

CREATE TABLE session_privacy (id SERIAL PRIMARY KEY,
                                         FOREIGN KEY session_id INT REFERENCES sessions(id),
                                                          FOREIGN KEY volunteer_id REFERENCES users(id),
                                                                   privacy_status VARCHAR (10) NOT NULL);



        


