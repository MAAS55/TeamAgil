
# Sprint goal / Retrospective       

## Datum: 2026-11-25

## Team: Mark, Doan, Simon

## Användarbehov och acceptanskriterium

### Användarbehov: vem är det?
Som besökare vill jag söka efter evenemang så att jag snabbt hittar det som passar mig. Det kan vara: 

- Lokalbo i Sundsvall som vill hitta på något i helgen
- Förälder som letar barnvänliga aktiviteter
- Nyinflyttad som vill lära känna staden
- Turist på besök några dagar

### Acceptanskriterier
- Användaren kan skriva i sökrutan och se matchande evenemang.
- Användaren kan klicka och kartegorisera olika evenemang
- Användaren kan klicka på ett förslag och få upp just det evenemanget.
- Om inget matchar visas ett tydligt meddelande: "Inga evenemang hittades."
- Knappen "Visa alla" är under beslut. Klicka-i-sökrutan kan räcka som lösning, men teamet behöver bekräfta det.



### Demoresultat:
- Det här visade vi: profilerna och antalet visades på sidan.
- Network: GET-anropet syntes och fick status 200.
- Begränsningar: profilerna är fiktiva och hämtas från ett externt API.
- Återstår: felvägen har ännu inte visats.

Feedback
- Positiv observation: Det är tydligt att profilerna är fiktiva.
- Fråga: Hur ser det ut när hämtningen misslyckas? Det står "Tjänstfel! kunde inte hitta evenmang, försök igen!"
- Nästa steg: Kontrollera felmeddelandet vid offline. 

# Retrospective

### Behåll
- Vi gjorde små steg med test i webbläsaren efter varje ändring gjorde det lätt att hitta vad som gick fel.
- Felsökning med konsolen (F12) gav tydliga felmeddelanden.
- dokumentation hjälpte oss att hitta lätt till vad som skulle göras.
- kommunikationen
- Vi är bra på att fördela arbetsuppgifter och ansvar mellan teammedlemmarna, vilket gör det tydligt vem som ansvarar för vad och hjälper oss att arbeta mer effektivt tillsammans.


### Förändring
- Flera versioner av app.js och index.html skapade osäkerhet om vilken som gällde.
- Filer låg i olika mappar (frontend/ och rotmappen), vilket gav konflikter vid sammanslagning i Git.
- Vi fick någon merge konflikt några gånger, ett hinder som gjorde så att vi hamnade efter men vi löste det. 
- vi kunde ha refaktorisera lite annolunda
### Valt tema
- Situation: Vi arbetade i en stor app.js-fil där flera personer behövde göra ändringar. Det ökade risken för merge-konflikter och gjorde koden svårare att hantera.
- Vem ansvarar: [alla]

### Förbättringsåtgärd
- Förbättring: bestämma en gemensam mappstruktur innan nästa merge.
- Konkret beteende: en person kontrollerar main och bekräftar strukturen i teamet innan någon pushar.
- Istället för att arbeta i en stor app.js-fil hade vi kunnat dela upp koden i mindre, separata filer med tydligare ansvarsområden. Det hade gjort koden lättare att förstå, underhålla och arbeta med tillsammans, samtidigt som risken för merge-konflikter hade minskat.
- Vi kommer att pusha smått och tyligare i fram tiden. 
- Ansvarig: [Simon]
- När följer vi upp: nästa sprint review, discord och slack.
- Vad tittar vi efter: inga konflikter vid merge till main.

## Uppföljning
- Datum: [11/25/2026]
### Vad observerade vi: 
- vi observerade att vi kunde strukrurera planen lite bättre, vi skulle ha skapat flera items i backlogen för att kunna pusha smått och undvika onödiga tids press. 
### Nästa steg: nice to have

- **Kort dokumentation:** När vi tar ansvar för uppgifter dokumenterar vi kort (2–3 meningar) vad vi har gjort, likt en standup, för att underlätta den individuella inlämningen.
- **Uppdaterad Kanban:** Vi håller Kanban-tavlan uppdaterad och tilldelar uppgifter tydligt för att undvika onödiga väntetider.
- **Strukturerad dokumentation:** Vi skapar tydligare struktur för våra loggar och bestämmer vilka tre plattformar vi använder för dokumentation.
- **Bättre estimat:** Vi förbättrar vår tidsplanering och sätter tydligare Sprint Goals.
- **Små commits:** Vi pushar kod regelbundet och i mindre delar för att minska risken för merge-konflikter.
