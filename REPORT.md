## Omschrijving

Een website met visualisaties over vuurwerkschade. Deze visualisaties zijn gecentreerd rond drie m's: schade aan mensen, schade aan milieu en materiële schade.  

## Technisch ontwerp
### files
Er is één html-pagina voor de site. Dit is index.html.
De functionaliteit is verdeeld over meerdere JavaScript files.
Er is een main.js welke wordt uitgevoerd na het laden van de pagina.
Verder zijn er barcharts.js, linechart.js, piecharts.js en helpers.js.

![](docs/imagesProcess/flowFunctions.png)

### functionaliteit
Op twee manieren kan de data op de webpagina veranderd worden.

De eerste manier is door een staaf in één van de drie staafdiagrammen aan te klikken. Dit zorgt dat de taartdiagrammen en de lijngrafiek worden geupdate naar de jaarwisseling van de aangeklikte staaf. Ook de titels worden aangepast, en de keuze in het dropdown menu.

De tweede manier is doormiddel van het dropdown menu.

Met de checkboxes is aan te geven welke taartdiagrammen zichtbaar moeten zijn.

### verdeling code over files
De verdeling van de code over de files is als volgt:
- In main wordt de svg van het poppetje ingeladen, globals gedefinieerd, data geladen en worden de 'kern'-functies aangeroepen.
- In barcharts.js staat alle code met betrekking tot de staafdiagrammen.
- In linechart.js staat alle code met betrekking tot de lijngrafiek.
- In piecharts.js staat alle code met betrekking tot de taartdiagrammen.
- Alle andere functies staan in helpers.js.

### gedetailleerde omschrijving van de werking van de code
De namen van de functies zeggen wat de functies doen.
Het schema hierboven laat de samenhang tussen alle functies zien.

Als de pagina geladen is wordt afterload() aangeroepen.
Hierin worden eerst de benodigde globale variabelen gedefinieerd.
Dan wordt de svg van het poppetje ingeladen.
Daarna wordt alle data ingeladen.
Nadat de data ingeladen is wordt main() aangeroepen.

De functie main() doet het volgende:
- makeBarchart() wordt drie keer aangeroepen. Dit is om de drie staafdiagrammen te maken.
- makePiecharts() aangeroepen om alle taartdiagrammen te maken. De functie makePiecharts() roept de functie makePiechart() aan voor ieder taartdiagram op de website. 
- linechart() wordt aangeroepen om de lijngrafiek te maken.
- makeTitles() wordt aangeroepen om de titels te maken die de gekozen jaarwisseling bevatten.
- tooltipFigureHuman() wordt aangeroepen om de tooltip op het poppetje te verzorgen. Deze functie maakt gebruik van de helpers-functie makeHTMLstring(). Deze maakt een correcte zin voor de data en het gekozen lichaamsdeel. De functie makeHTMLstring() maakt weer gebruik van de functie plural(). Deze laatste functie verzorgt de meervoudsvormen in de tooltip op het poppetje.
- dropdown() wordt aangeroepen om het dropdown menu te maken.
- checkboxes() wordt aangeroepen om de functionaliteit van de checkboxes te verzorgen.

De staafjes in de staafdiagrammen hebben een 'onclick'. Het aanklikken van een staaf doet het volgende:
- De staaf van de geselecteerde jaarwisseling highlight in alle staafdiagrammen.
- updatePiecharts() wordt aangeroepen om de taartdiagrammen te updaten met de data van de gekozen jaarwisseling. De functie updatePiecharts() roept updatePiechart() aan voor ieder taartdiagram op de website.
- updateLinechart() wordt aangeroepen om de lijngrafiek te updaten met de data van de gekozen jaarwisseling.
- makeTitles() wordt aangeroepen om de titels die een jaarwisseling bevatten up te daten.
- tooltipFigureHuman() wordt aangeroepen om de data in de tooltip op het poppetje up to date te maken.
- Als laatst wordt de gekozen jaarwisseling in het dropdown menu aangepast.

Het dropdown menu heeft een 'onchange'. Het veranderen van de geselecteerde jaarwisseling in dit menu doet het volgende:
- De staaf van de geselecteerde jaarwisseling highlight in alle staafdiagrammen.
- updatePiecharts() wordt aangeroepen om de taartdiagrammen te updaten met de data van de gekozen jaarwisseling. De functie updatePiecharts() roept updatePiechart() aan voor ieder taartdiagram op de website.
- updateLinechart() wordt aangeroepen om de lijngrafiek te updaten met de data van de gekozen jaarwisseling.
- makeTitles() wordt aangeroepen om de titels die een jaarwisseling bevatten up te daten.
- tooltipFigureHuman() wordt aangeroepen om de data in de tooltip op het poppetje up to date te maken.

De checkboxes bevatten een 'on change' waardoor de zichtbaarheid van de taartdiagrammen aan- of uitgezet kan worden.

## Ontwikkeling

### data zoeken
Vanaf het begin was duidelijk dat er veel kleine datasets nodig zouden zijn.
Eerst moest worden uitgezocht hoe deze datasets op elkaar aan gingen sluiten, en in hoeverre deze binnen het verhaal gingen passen.
Vooral de data over de afgelopen jaarwisseling compleet krijgen was een google-uitdaging.

Op zich was het voor het doel van de website niet essentieel om data van meerdere jaren te hebben, maar dit maakt het
verhaal wel sterker. Data van slechts één jaar kan immers ook op toeval berusten. Door data van meerdere jaarwisselingen te laten zien, zie je ook een ontwikkeling over de tijd.
De data van de meest recente jaarwisseling is naar mijn mening wel essentieel.

### staafdiagrammen
In het staafdiagram over overlast van vuurwerk wilde ik graag een onderverdeling maken
naar soort klacht. Deze verdeling heb ik van slechts twee jaarwisselingen kunnen vinden, maar daarmee voegt het alsnog iets toe.
Dat niet iedere staaf in dit diagram uit dezelfde componenten bestaat, heb ik opgelost door sommige
componenten op 0 te zetten in de dataset. De tooltip merkte dit helaas wel op. Dus er kwam dan '0 klachten' te staan
bijvoorbeeeld. Een if-statement loste dit op.

In het staafdiagram over materiële schade wilde ik ook een onderverdeling. De data die ik vond bleek bij nadere inspectie helaas inconsistent en dubieus. Daarom heb ik deze eruit gelaten. Hierdoor was een legenda ook niet meer nodig bij dit staafdiagram.

Het onderdeel over materiële schade vind ik uiteindelijk een beetje mager geworden. Ik heb gezocht of ik hier iets bij kon bedenken, maar er was was geen goede data over te vinden. 

Het verhaal dat bij de cijfers over materiële schade hoort is het volgende.
1.  Er is veel schade ieder jaar.
2.  Maar we geven met zijn allen nog veel meer uit aan vuurwerk ieder jaar. Vuurwerk levert de maatschappij dus netto geld op.
3.  Maar we kijken nu alleen naar materiële schade, er zijn nog veel meer kosten voor de maatschappij. Als we die kosten meerekenen komen we netto juist negatief uit. 
Het volgende rekenplaatje maakt dit duidelijk.

>Maar de echte schade zit in het verlies van levenskwaliteit. Als we het leed van lichamelijke schade uitdrukken in geld, is het bedrag schrikbarend. Het Oogziekenhuis gebruikte daarvoor de Qaly-maatstaf, waarmee verlies van levenskwaliteit wordt uitgedrukt in economische waarde.
>Als voorbeeld geeft de OVV het verlies van een oog op achtjarige leeftijd. De 'kosten' daarvan worden jaarlijks uitgedrukt als 12.500  euro. Op een mensenleven levert dat een miljoen euro aan leed op.
>In negen jaar tijd gingen er 158 ogen verloren door vuurwerk bij mensen met een gemiddelde leeftijd van 20 jaar. Ervan uitgaande dat zij 88 jaar worden, levert dat een kostenplaatje op van 134,3 miljoen euro. Alleen al aan verloren levenskwaliteit door oogschade dus.
>Alles bij elkaar opgeteld kost het jaarlijkse feest de maatschappij dus zeker 30 miljoen euro, waarbij moet aangetekend worden dat we veel kosten dus nog niet eens kennen. 
>Bron: https://www.rtlz.nl/algemeen/binnenland/zo-hoog-zijn-de-kosten-van-oud-en-nieuw

Het probleem voor mijn visualisaties was dat er hier geen harde cijfers meer zijn. Bovenstaand stukje is al een vrij wilde schatting. Dit in een visualisatie stoppen zou teveel natte-vinger-werk worden naar mijn smaak.

Wat de website nu laat zien is dat data over lichamelijk letsel veel uitgebreider bijgehouden wordt dan materiële schade. Dit laatste wordt simpelweg gedeclareerd bij de verzekeringen, en vinden we verder blijkbaar niet zo interessant. De beschikbare data laat dus zien dat we materiële schade minder belangrijk vinden dan letselschade. Dit wordt nu indirect ook gevisualiseerd door de website.

### taartdiagrammen
De taartdiagrammen hadden eventueel ook in één sunburst gekund. Dit zou echter weinig toevoegen omdat de data daar niet de geschikte
structuur voor heeft. Taartdiagrammen zijn simpeler en gezien de gekozen doelgroep had dat mijn voorkeur.

De checkboxes bij de taartdiagrammen zijn gemaakt in plaats van de interactieve tabel over illegaal vuurwerk.
Deze tabel paste bij nader inzien toch niet zo goed binnen het verhaal.

### lijngrafiek
De lijngrafiek was een concreet idee met een voor de hand liggende uitvoering. Toch vertelt deze grafiek naar mijn smaak niet genoeg. Daarom heb ik een infographic bedacht voor ernaast. In deze infographic kon ik feiten en cijfers kwijt die het onderwerp vuurwerk en milieu aanvullen.

### het poppetje
Het poppetje leek mij een leuke en originele visualisatie, maar ik had geen idee hoe ik zoiets kon maken.
Verrassend genoeg bestaan er dus teken-programmaatjes om svg's mee te maken.
In dit geval heb ik http://www.drawsvg.org/drawsvg.html gebruikt.
Hierin kunnen id's en class names meegegeven worden aan alle componenten van de tekening.

Aanvankelijk was het idee om het poppetje op een aantal punten aan te vullen met een extra visualisatie of element. Zo wilde ik voor de ogen een extra onderverdeling maken in een taartdiagram.
Dit zou dan wel suggereren dat het een onderverdeling van dezelfde groep is als de andere taartdiagrammen.
Patiënten van de spoedeisende hulp en de oogarts zijn echter twee verschillende groepen.
Het was daarom niet duidelijk wat bij een taartdiagram over oogletsel het totaal moest zijn.
Uiteindelijk kwam het er op neer dat de extra data over oogletsel makkelijker en beter in de tooltip kon staan.
Dit gold ook voor de dodelijke vuurwerkslachtoffers.

## Beslissingen
Het bij elkaar sprokkelen van alle data was mijn grootste struikelblok. Als de gevonden data uitgebreider en complexer zou zijn geweest had ik interesantere visualisaties kunnen maken. In dat opzicht is het zoeken van een geschikt onderwerp met passende data echt een lastige stap. Aan de andere kant heb ik nu wel iets kunnen maken wat nog niet bestond, iets wat best opmerkelijk is gezien de jaarlijks terugkerende discussie over een vuurwerkverbod voor consumenten. 
Als ik meer tijd gehad zou hebben zou ik, in plaats van de data uit nieuwsberichten filteren, datasets opvragen bij de desbetreffende partijen. 
