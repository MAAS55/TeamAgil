
CREATE TABLE BookingChangeLog(
    LogId INT IDENTITY(1,1) PRIMARY KEY,
    BookingId INT NOT NULL,
    OldDate DATETIME2 NOT NULL,
    NewDate DATETIME2 NOT NULL,
    ChangedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TRIGGER tr_Booking_AfterUpdate_Log
ON Booking
AFTER UPDATE
AS
BEGIN
    INSERT INTO BookingChangeLog (BookingId, OldDate, NewDate)
    SELECT 
    i.BookingId, 
    d.BookingDate, 
    i.BookingDate
    FROM inserted i
    JOIN deleted d ON d.BookingId = i.BookingId
    WHERE i.BookingDate <> d.BookingDate;
END;

--Test 1 här ändrar jag bokning
UPDATE Booking
SET BookingDate = '2027-01-15T10:00:00'
WHERE BookingId = 1;
-- test 2 man kan ändra samma boking i samma update 
UPDATE Booking
SET BookingDate = DATEADD(day, 7, BookingDate)
WHERE BookingId IN (2, 3);
--test 3
UPDATE Visitor
SET VisitorName = 'Alfred Schmidt'
WHERE VisitorId = 1;



SELECT * FROM BookingChangeLog;

