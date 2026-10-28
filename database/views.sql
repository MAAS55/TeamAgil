CREATE VIEW wv_event AS
SELECT e.EventDate, ei.EventTitle, ei.EventDescription, el.LocationName, c.CategoryName, o.OrganizerName
FROM TypeEvent AS e
INNER JOIN EventInfo AS ei
    ON ei.EventInfoId = e.FkEventInfoId
INNER JOIN EventLocation AS el
    ON el.LocationId = e.FkLocationId
INNER JOIN Category AS c
    ON c.CategoryId = e.FkCategoryId
INNER JOIN Organizer AS o
    ON o.OrganizerId = e.FkOrganizerId; 
GO

    CREATE VIEW wv_booking AS
SELECT b.BookingDate, e.EventDate, v.VisitorName, v.VisitorEmail, v.VisitorNumber
FROM Booking AS b
INNER JOIN TypeEvent AS e
    ON e.EventId = b.FkEventId
INNER JOIN Visitor AS v
    ON v.VisitorId = b.FkVisitorId;

    GO
