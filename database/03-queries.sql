USE EventManagementDB

/*SELECT e.EventDate, ei.EventTitle, ei.EventDescription, el.LocationName, c.CategoryName, o.OrganizerName
FROM TypeEvent AS e
INNER JOIN EventInfo AS ei
    ON ei.EventInfoId = e.FkEventInfoId
INNER JOIN EventLocation AS el
    ON el.LocationId = e.FkLocationId
INNER JOIN Category AS c
    ON c.CategoryId = e.FkCategoryId
INNER JOIN Organizer AS o
    ON o.OrganizerId = e.FkOrganizerId; 


SELECT b.BookingDate, e.EventDate, v.VisitorName, v.VisitorEmail, v.VisitorNumber
FROM Booking AS b
INNER JOIN TypeEvent AS e
    ON e.EventId = b.FkEventId
INNER JOIN Visitor AS v
    ON v.VisitorId = b.FkVisitorId */

    /*
Verksamhetsfråga: Vilka event finns det? på vilken plats, tid eller vad är det för event?
En resultatrad representerar: Event och booking info
Förväntat resultat: information i event och booking
Så verifierades resultatet: Kolla på listan som vi skapade om det stämmer i resultatet
*/

SELECT * FROM Booking
RIGHT JOIN Visitor
    ON  BookingId = VisitorId

SELECT LocationName, COUNT(LocationName) AS TotalLocations
FROM EventLocation AS el
INNER JOIN  TypeEvent as e
    ON el.LocationId = e.FkLocationId
GROUP BY LocationName;

/*
Verksamhetsfråga: Hur person har anmäla sig till ett event? eller hur många event finns det i sundsvall? om kunden skulle undra om det
En resultatrad representerar: LocationName och räknas ihop den totala location som finns
Förväntat resultat: den totala location som finns
Så verifierades resultatet: Vi räknade ihop alla location själv och jämföra den med resultatet
*/