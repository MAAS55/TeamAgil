# Evenemang projekt

## projektets syfte och målgrupp


## kundvärde

## centralt användarflöde
1. **Start sida:** Användaren kan navigera genom 3 knapparna som finns på huvudmenyn. 
2. **Boka:** Användaren kan antingen klicka på "Boka arrangemang" knappen på huvudmenyn eller välja ett evenemang som pågår, klicka på "läasmer" och "boka här" knappen. Allt uppgift måste vara fyllt för att användare ska kunna boka.
3. **Bekräftelse:** Efter användaren har klickat på "Boka" knappen genom formuläret, får de kontrollera informationen genom att välja mellan "Avbryts" för att avbryta bokningen eller "confirm" för att bekräfta bokningen. De får ett kvitto när bekräftningen går genom.
4.  **Söka eller filtrera:** Användaren kan söka eller filtrera efter ett evenemang i fältet som ligger under huvudmenyn.
## tekniker

## mappstruktur
## 📁 Mappstruktur

```text
TeamAgil

├── database/                # Innehåller alla sql filer
│   ├── database
│   │   ├── triggers.sql/ 
│   ├── 01-schema.sql/    
│   ├── 02-data.sql/       
│   ├── 03-queries.sql/     
│   ├── Trigger.sql/ 
│   ├── services/   
│   ├── procedures.sql/ 
│   ├── Trigger.sql/  
│   └── views.sql/
├── docs/                    # Projektdokumentation
│   ├── api-review.md/     
│   ├── business-rule.md/ 
│   ├── sdaily-log.md/   
│   ├── erd_database.png/ 
│   ├── normalization.md/  
│   └── product-vision.md/
├── frontend/
│   ├── Booking/
│   │   ├── Receipt/
│   │   │   ├── Receipt.html/    
│   │   │   └── ReceiptScript.js/
│   │   ├── Booking.html/  
│   │   ├── BookingScript.js/    
│   │   └── BookingStyle.css/
│   ├── eventflow-api/ 
│   ├── images/             # Alla bilder 
│   ├── about.html/  
│   ├── app.js/    
│   ├── index.html/   
│   └── style.css/
├── .gitignore    
├── Program.cs
├── README.md  
└── TeamAgil.csproj
```
## installations- och startinstruktioner

## ⚙️ Hur SQL-skript körs

Instruktion för att sätta upp och köra databasen lokalt.

### Förutsättningar
* [SQL Server Management Studio (SSMS)] installerat på datorn.
* Laddar ner SQL-filer i https://github.com/MAAS55/TeamAgil/tree/main/database
* Importera och kör filerna i följande ordning:
1. Skapa tabeller genom att köra 01-schema.sql fil.
2. Fyller tabeller med testdata i 02-data.sql fil.
3. Både koppla relationer, nycklarna och köra tabellerna i 03-queries.sql fil.
4. Skapa view genom skripten views.sql fel.
5. Efter view har skapat. Du kan använda procedures med skripten procedures.sql.

### Söka event titel eller bokning ID:
* Söka upp event title genom att byta ut namn i 'Jazz' med ett event title
* Söka upp booking ID genom att byta ut nummer i '3' med ett annat nummer
```sql
EXEC usp_Event @EventTitle = 'Jazz';
EXEC usp_Booking @BookingId = 3;
```
### Hur man använder trigger från skripten Trigger.sql

1. Skapa trigger genom att köra koden i Trigger.sql filen
```sql
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
```
2. Testa ändringar genom att ändra värde i varje test
```sql

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
```

## externt API och kända begränsningar

## testinstruktioner

## säkerhets- och integritetsbeslut

## teamets Git-workflow
