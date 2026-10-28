CREATE PROCEDURE dbo.usp_Event
@EventId INT
AS
BEGIN
	SELECT
		EventId,
		EventTitle,
		EventDescription,
		LocationName,
		CategoryName,
		OrganizerName
	FROM wv_Event
	WHERE EventId = @EventId;
END;
GO

ALTER PROCEDURE dbo.usp_Booking
@BookingId INT
AS
BEGIN
	SELECT
		BookingId,
		VisitorId,
		VisitorName,
		VisitorEmail,
		VisitorNumber
	FROM wv_Booking
	WHERE BookingId = @BookingId;
END;
GO
	
EXEC usp_Booking @BookingId = 2;
EXEC usp_Event @EventId = 2;