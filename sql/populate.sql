CREATE TABLE IF NOT EXISTS Users (
    UserID SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    PhoneNumber TEXT,
    Password TEXT NOT NULL,
    Role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Sessions (
    SessionID SERIAL PRIMARY KEY,
    Date DATE NOT NULL,
    Time TEXT NOT NULL,
    VolunteerID INTEGER REFERENCES Users(UserID),
    Capacity INTEGER NOT NULL,
    Session_Status VARCHAR(20) NOT NULL DEFAULT 'Available', 
    Is_Morning BOOLEAN NOT NULL,
    Is_Evening BOOLEAN NOT NULL
);


INSERT INTO Users (Name, Email, PhoneNumber, Password, Role) 
VALUES ('John Doe', 'john@example.com', '123-456-7890', 'hashed_password', 'Manager');

INSERT INTO Users (Name, Email, PhoneNumber, Password, Role) 
VALUES ('Roman Joey', 'rom@example.com', '123-456-7654', 'hashed_password', 'Volunteer');

INSERT INTO Users (Name, Email, PhoneNumber, Password, Role) 
VALUES ('John Roy', 'Roy@example.com', '123-654-7654', 'hashed_password', 'Volunteer');

INSERT INTO Users (Name, Email, PhoneNumber, Password, Role) 
VALUES ('Roma John', 'roma@example.com', '123-654-7654', 'hashed_password', 'Volunteer');

INSERT INTO Users (Name, Email, PhoneNumber, Password, Role) 
VALUES ('Gretchen Cal', 'cal@example.com', '123-654-7654', 'hashed_password', 'Volunteer');


INSERT INTO Sessions (SessionID, Date, Time, Capacity, Session_Status, Is_Morning, Is_Evening) 
VALUES (1, '2023-09-25', 'Morning', 1, 'Available', true, false);

INSERT INTO Sessions (SessionID, Date, Time, Capacity, Session_Status, Is_Morning, Is_Evening) 
VALUES (2, '2023-09-25', 'Evening', 1, 'Available', true, false);

INSERT INTO Sessions (SessionID, Date, Time, Capacity, Session_Status, Is_Morning, Is_Evening) 
VALUES (3, '2023-09-25', 'Morning', 1, 'Available', true, false);

INSERT INTO Sessions (SessionID, Date, Time, Capacity, Session_Status, Is_Morning, Is_Evening) 
VALUES (4, '2023-09-25', 'Morning', 1, 'Available', true, false);

INSERT INTO Sessions (SessionID, Date, Time, Capacity, Session_Status, Is_Morning, Is_Evening) 
VALUES (5, '2023-09-25', 'Evening', 2, 'Available', true, false);



