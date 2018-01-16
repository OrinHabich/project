# Vuurwerkschade
#### Orin Habich

# day 6
Een lijngrafiek is vervallen wegens gebrek aan toegevoegde waarde aan het verhaal.
Voor de andere lijngrafiek heb ik andere data gezocht. Ik wil namelijk alle grafieken over dezelfde jaarwisselingen laten gaan, en bovendien de meest recente jaarwisselingen laten zien.
![](doc/schetsWebsite3.png)
Van de meest recente jaarwisseling heb ik alleen een interactieve grafiek online waaruit ik waarschijnlijk de benodigde data kan scrapen.
De data voor de lijngrafiek komt niet allemaal in één json file, maar in meerdere csv files.
Dit is enerzijds omdat dit beter matched met de gevonden voorbeelden over linecharts.
Maar vooral omdat ik geen hele grote json files wil met veel indiceer-lagen. Want als ik
een jaarwisseling wil toevoegen moet dat niet te moeilijk gaan.
Ik heb nu een python-scriptje geschreven om de gedownloade data om te zetten naar geschikte csv files.
Dit geeft toch wat problemen met de updateLinechart-functie en de scope van de ingeladen data.
Hiervoor heb ik nu als tijdelijke oplossing om alle datasets mee te geven aan updateLinechart() maar dat kan waarschijnlijk beter.
De flow van het programma begint erg onlogisch te worden.
Het is nu zoals in onderstaand schema.
![](doc/functies2.png)

# day 7
De updateLinechart functie begint met een aantal if-statements om de data van de gekozen jaarwisseling te selecteren. Liever zou ik deze keuze meegeven aan de functie, ipv zoals nu alle data en de gekozen jaar wisseling meegeven en dan in de functie pas de juiste data selecteren.

Dit wilde ik doen door updateLinechart("fijnstof" + xPosition) te gebruiken.
Maar dit geeft updateLinechart("fijnstof17-18") ipv updateLinechart(fijnstof17-18). Dus een string als input ipv de data.

Vandaar deze oplossing dus met if-statements.