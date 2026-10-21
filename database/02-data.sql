USE EventManagementDB;

INSERT INTO EventInfo(EventTitle, EventDescription)
VALUES
(N'Jazz Concert', 'Live jazz performance'),
(N'Rock Concert', 'Kizz live band');

INSERT INTO EventLocation(LocationName)
VALUES
(N'Sundsvall'),
(N'Stockholm'),
(N'Malmö');


INSERT INTO Category (CategoryName)
VALUES
    (N'Nordic Events AB'),
    (N'City Live Entertainment');

INSERT INTO Organizer (OrganizerName)
VALUES
    (N'Sunsdvall Jazzklubb'),
    (N'Stokcholm Idrottsförening');


INSERT INTO TypeEvent(EventDate, FkEventInfoId, FkLocationId, FkCategoryId, FkOrganizerId)
VALUES 
('2026-10-12T12:00:00', 1, 1, 1, 1),
('2026-11-05T05:00:00', 2, 1, 1, 2),
('2026-12-12T10:00:00', 2, 3, 2, 1),
('2026-10-12T12:00:00', 1, 1, 1, 1),
('2026-11-05T05:00:00', 2, 1, 1, 2),
('2026-12-12T10:00:00', 2, 3, 2, 1);

INSERT INTO Visitor(VisitorName, VisitorEmail, VisitorNumber)
VALUES 
(N'Doan', N'Doan@email', 072554243),
(N'Simon', N'Simon@email', 80934289),
(N'Mark', N'Mark@email', 43128908);

INSERT INTO Booking(BookingDate, FkVisitorId, FkEventId)
VALUES 
('2026-09-22T10:00:00', 1, 3),
('2026-08-22T10:00:00', 2, 1),
('2026-07-22T10:00:00', 3, 1);