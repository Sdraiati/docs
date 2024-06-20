
---

# Proxy

Proxy è una classe generica per la gestione dei dati. Si occupa di effettuare le
get dei dati. Per questo motivo, c'è bisogno di una classe proxy per ogni dato
dinamico all'interno della pagina. I dati dinamici saranno:
- Transazioni (le liste di transazioni e le canvas sono dinamiche);
- Progetti (la lista dei progetti è dinamica);
- Tag (le liste dei tag sono dinamiche);
- UserInfo (le informazioni dell'utente sono dinamici);
- Nome progetto.

## Observable

Ciascuna classe proxy deve essere un observable, infatti ogni volta che viene
eseguita una get request, i dati dinamici all'interno della pagina devono essere
aggiornati. Le classi che si occupano di aggiornare i dati saranno gli observer.
Mentre questa classe sarà un'observable per poter notificare l'aggiornamento dei
dati.

## Observer

Questo è meno intuitivo. Ciascuna classe proxy deve essere un observer, infatti
ogni volta che viene eseguita una post request, i dati nel database sono
cambiati. Allora i dati nel client devono essere aggiornati. Come sono
aggiornati? Quando viene eseguita una post, la classe che esegue la post è un
observable che notifica la classe proxy, che effettua una nuova get e aggiorna i
dati sul client.

---
