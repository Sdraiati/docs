
---

# Canvas

Canvas è la classe che si occupa di interagire con l'elemento canvas di html.
Non ho guardato eccessivamente il codice di Simone, può darsi che si riesca a
creare una classe che sta in mezzo tra la mia e la sua. Forse mi sbaglio.
Nel nostro sito abbiamo deciso di sviluppare due canvas: LineChart e CakeChart. 

## Observer

Ciascuna cavas deve essere aggiornata quando i dati di riferimento (le
transazioni) nel client sono aggiornati.  

## UserInterface

Le canvas non sono le uniche classi che visualizzano i dati sul client.
UserInterface è la classe che raggruppa gli elementi che visualizzano i dati nel
client. UserInterface fornisce un'interfaccia comune per visualizzare i dati.
Questa divisione è virtuale, nella pratica Observer e UserInterface sono
collassate in una sola classe.

---
