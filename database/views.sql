ALTER VIEW wv_Event AS
SELECT  
    e.EventId,
    e.EventDate, 
    ei.EventTitle, 
    ei.EventDescription, 
    el.LocationName, 
    c.CategoryName, 
    o.OrganizerName, 
    COUNT(b.FkEventId) AS TotalVisitors
FROM TypeEvent AS e
INNER JOIN EventInfo AS ei
    ON ei.EventInfoId = e.FkEventInfoId
INNER JOIN EventLocation AS el
    ON el.LocationId = e.FkLocationId
INNER JOIN Category AS c
    ON c.CategoryId = e.FkCategoryId
INNER JOIN Organizer AS o
    ON o.OrganizerId = e.FkOrganizerId
LEFT JOIN Booking AS b
    ON b.FkEventId = e.EventId
GROUP BY 
    e.EventId,
    e.EventDate, 
    ei.EventTitle, 
    ei.EventDescription,
    el.LocationName, 
    c.CategoryName, 
    o.OrganizerName;
GO

ALTER VIEW wv_Booking AS
SELECT 
    b.BookingId,
    b.BookingDate, 
    e.EventDate, 
    v.VisitorName, 
    v.VisitorEmail, 
    v.VisitorNumber,
    v.VisitorId
FROM Booking AS b
INNER JOIN TypeEvent AS e
    ON e.EventId = b.FkEventId
INNER JOIN Visitor AS v
    ON v.VisitorId = b.FkVisitorId;

    GO

SELECT * FROM wv_Event;
SELECT * FROM wv_Booking;
SELECT * FROM TypeEvent;