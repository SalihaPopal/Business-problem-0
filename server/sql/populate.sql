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
