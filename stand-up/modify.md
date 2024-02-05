
---

## Modify

I dati inseriti dall'utente potrebbero essere sbagliati. Oppure l'utente
potrebbe volerli modificare. Questa classe si occupa proprio dell'aggiornamento,
della modifica o dell'eliminazione dei dati. A tutti gli effetti, questa è la
classe che si occupa delle post request.  

## Observable

Ogni volta che viene eseguita una post request, è necessario notificare la
classe che si occupa della gestione dei dati sul client. Infatti ogni volta che
viene eseguita una post request, sappiamo che almeno qualche dato nel server
differisce rispetto ai dati nel client. Questa classe segnala la discrepanza e
ordina l'aggiornamento dei dati sul client.

---
