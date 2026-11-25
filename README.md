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

## installations- och startinstruktioner

## hur SQL-skript körs

## externt API och kända begränsningar

## testinstruktioner

## säkerhets- och integritetsbeslut

## teamets Git-workflow
