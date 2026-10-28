ALTER PROCEDURE dbo.usp_Event
@EventTitle NVARCHAR(50) 
AS
BEGIN
	SELECT *
	FROM wv_Event
	WHERE EventTitle LIKE '%' + @EventTitle + '%';
END;
GO

ALTER PROCEDURE dbo.usp_Booking
@BookingId INT
AS
BEGIN
	SELECT *
	FROM wv_Booking
	WHERE BookingId = @BookingId;
END;
GO
	
EXEC usp_Booking @BookingId = 3;
EXEC usp_Event @EventTitle = 'ro';	
EXEC usp_Event @EventTitle = 'Jazz';