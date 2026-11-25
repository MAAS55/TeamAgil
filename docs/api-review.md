## AI-assisterad review på User Story: Hämta data från externt API #31

### Kandidatfynd från AI 

- **Ingen åtskillnad mellan HTTP-fel och nätverksfel** - skiljer inte mellan tex 500 fel, nätverksfel osv...
- **Onödig header vid GET** - Eftersom en `GET`-förfrågan saknar body behövs inte Content-Type': 'application/json
- **Redundant statuskontroll** - den andra delen överflödig då `response.ok` endast är `true` för status 200–299.
- **Saknad initial laddning** - loadData() körs endast när något ändras i filterForm
- **XSS-risk via `innerHTML`** - applikationen kan rendera html element från API Datan
- **Sårbar split på `venue`:** I `transformRawData` - ifall api datan i venue saknar ett komma tecken kan programet krasha och ge TypeError
### Fynd som verifierades och accepterades
- Ingen åtskillnad mellan HTTP-fel och nätverksfel. det stämmer att fel hanteringen i fetch funktionen är generell och inte skiljer på olika fel som mellan 500 fel och nätverk.
- **Onödig header vid GET**. tekniskt sätt så behövs inte header json/application när det inte finns någon body. man skulle också kunna ta bort metod: "GET" efter som att default metoden är GET. som visas i exemplen på Mmdn Docs
	https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- **Redundant statuskontroll**. eftersom att 404 inte är inom 200-299 range så kommer den att return:a false vilket gör att man inte behöver checka den individuellt. 
	https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
- **Saknad initial laddning**, det stämmer att loadData kör just nu bara när man gör en ändring i eventForm. Vi lägger till anrop till loadData I app.js så att den även laddas in när man öppnar sidan. 
- XSS-risk via `innerHTML` eftersom att innerHTML renderar ut html element så kan html kod från en api eller liknande rendera ut datan som ett element i DOM. vilket kan skapa en XSS-risk till exempel ifall api datan hade innehålt osäker kod som 
  `<button onclick="window.location.replace('http://www.malicioussite.com');">läs mer</button>`
-  **Sårbar split på `venue`* - ifall ett komma tecken inte finns så kan fel uppstå. det är lämligt att lägga till en validering och fallback ifall det sker så att inte programmet slutar fungera.
### Fynd som korrigerades
inga fynd korrigerades direkt, anser fynden vara tillräckligt givande I sig utan någon korrigering. 
### Fynd som avvisades och varför
några mindre fynd som kan fixas i senare skede, fynd som inte nödvändigtvis behövs åtgärdas i denna storyns scope. 
### Mänskligt beslut
Vi är enad om att dessa förslag är värt att implementera för att bättre uppfylla acceptancekriterierna och säkerhet.