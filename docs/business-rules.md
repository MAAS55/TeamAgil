Skriv varje relation i båda riktningarna, exempelvis:

### En deltagare kan ha noll eller många anmälningar.
  
Från deltagare håll: Kan noll eller flera.

Från anmälningar håll: måste ha ett eller flera

### Varje anmälan tillhör exakt en deltagare.

Från anmälan håll: kan ha bara ett deltagare

Från deltagare håll: Kan anmäla sig flera gånger

### Ett evenemang kan ha noll eller många anmälningar.

Från evenemang håll: kan ha noll eller flera anmälningar

Från anmälningar håll: kan anmäla till flera olika evenemang

### Varje anmälan gäller exakt ett evenemang.

Från anmälan håll: Kan ha ett evenemang

Från evenemang håll: Kan ha flera anmälningar

## Dokumentera minst:

### fem verksamhetsregler
* Anmälningar måste åtminstone ha en deltagare för kunna anmäla sig
* Deltagare kan anmäla sig flera gånger, det kommer räknas som flera anmälningar för att undvika dubbla anmälningar i samma rad
* Man kan bara anmäla sig en gång till ett event, för att undvika att dubbla anmälningar i samma event
* Kan ha bara ett evenemang per anmälning, för att undvika två olika evenemang i ett cell som går imot 1NF
* Evenemang kan ha både noll eller flera anmälningar, för att evenemang kan göra även om den har noll anmälning
* ALla event måste minst ha oganisation.
* Alla Organinsation kan ha en eller flera events.

### en obligatorisk relation
* Ett evenemang måste kunna identifiera genom namn eller kategorisering.

## en valfri relation
* En besökare kan går till flera event och en event kan har flera besökare

## en 1:N-relation
* En organisation kan vara i ett eller flera evenemang

## en N:M-relation som löses med en kopplingsentitet
* En event kan har flera besökare, en besökare kan går i flera event
