-- Create the database if it does not already exist
IF DB_ID('EventManagementDB') IS NULL
BEGIN
CREATE DATABASE EventManagementDB;
END;
GO

USE EventManagementDB;

CREATE TABLE EventInfo (
	EventInfoId INT IDENTITY(1,1) PRIMARY KEY,
	EventTitle NVARCHAR(100) NOT NULL,
	EventDescription NVARCHAR(500) NOT NULL
);

CREATE TABLE EventLocation (
	LocationId INT IDENTITY(1,1) PRIMARY KEY,
	LocationName NVARCHAR(100) NOT NULL
);

CREATE TABLE Category(
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName  NVARCHAR(50)  NOT NULL
);

CREATE TABLE Organizer (
    OrganizerId   INT IDENTITY(1,1) PRIMARY KEY,
    OrganizerName NVARCHAR(100) NOT NULL
);


CREATE TABLE TypeEvent(
    EventId INT IDENTITY(1,1) PRIMARY KEY,
    EventDate DATETIME2 NOT NULL,

    FkEventInfoId INT NOT NULL,
    FkLocationId INT NOT NULL,
    FkCategoryId INT NOT NULL,
    FkOrganizerId INT NOT NULL

    FOREIGN KEY(FkEventInfoId) REFERENCES EventInfo(EventInfoId),

    FOREIGN KEY(FkLocationId) REFERENCES EventLocation(LocationId),

    FOREIGN KEY(FkCategoryId) REFERENCES Category(CategoryId),

    FOREIGN KEY(FkOrganizerId) REFERENCES Organizer(OrganizerId),
); 

CREATE TABLE Visitor(
    VisitorId INT IDENTITY(1,1) PRIMARY KEY,
    VisitorName NVARCHAR(50) NOT NULL,
    VisitorEmail NVARCHAR(100) NOT NULL,
    VisitorNumber INT NOT NULL,
); 

CREATE TABLE Booking(
    BookingId INT IDENTITY(1,1) PRIMARY KEY,
    BookingDate DATETIME2  NOT NULL,
    FkVisitorId INT NOT NULL,
    FkEventId INT NOT NULL,

    FOREIGN KEY(FkVisitorId) REFERENCES Visitor(VisitorId),
    FOREIGN KEY(FkEventId) REFERENCES TypeEvent(EventId)
); 

