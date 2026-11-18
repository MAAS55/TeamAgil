
USE EventManagementDB;
GO
CREATE TABLE Back_Log(
    LogId     INT IDENTITY(1,1) PRIMARY KEY,
    BookingId INT NOT NULL,
    OldDate   DATETIME2 NOT NULL,
    NewDate   DATETIME2 NOT NULL,
    ChangedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

-- Trigger
CREATE TRIGGER tr_Back_Log
ON Booking
AFTER UPDATE
AS
BEGIN
    INSERT INTO Back_Log (BookingId, OldDate, NewDate)
    SELECT 
        i.BookingId,
        d.BookingDate,
        i.BookingDate
    FROM inserted AS i
    JOIN deleted  AS d ON d.BookingId = i.BookingId
    WHERE i.BookingDate IS DISTINCT FROM d.BookingDate;
END;
GO


-- TEST 1: EN bokning
UPDATE Booking
SET BookingDate = '2027-02-01T10:00'
WHERE BookingId = 9;


-- Alla tester -- 
SELECT 'Efter TEST 1' AS Steg, 
COUNT(*) AS LoggRader 
FROM Back_Log;


-- TEST 2: FLERA bokningar i samma UPDATE, man kan göra ändringnar 
UPDATE Booking
SET BookingDate = DATEADD(day, 7, BookingDate)
WHERE BookingId IN (2, 3);


-- man kan se alla loggrad för att se när ändringarna skedde
SELECT 'Efter TEST 2' 
AS Steg, 
COUNT(*) AS LoggRader 
FROM Back_Log;

-- TEST 3: visa hela loggen
SELECT * FROM Back_Log 
ORDER BY LogId;
-- för att se alla bookningar i bokningar
SELECT * FROM Booking;


-- Här kan man göra ändringar i på datummen i bookingId 1,2,3 tex om de skulle vara i samma sällskap.
UPDATE Booking
SET BookingDate = '2030-06-15 15:00:00'
WHERE BookingId IN (1, 2, 3);


-- Delete och drop table kan man också göra 
/*DELETE FROM Back_log
WHERE BookingId = 9
SELECT * FROM Back_log
*/




