
# Applicazione Gestione Conti Correnti

## Descrizione
Questa applicazione permette di gestire conti correnti bancari tramite un'interfaccia web. Il sistema si compone di una **WebAPI** che gestisce le operazioni legate ai conti correnti, e un frontend sviluppato in **Angular**. Le funzionalità principali includono la registrazione, il login, la gestione dei movimenti e la possibilità di effettuare operazioni come ricariche telefoniche e bonifici.

## Struttura del Database
### Tabelle principali:

#### 1. TContiCorrenti
| Campo              | Tipo          | Descrizione                            |
|--------------------|---------------|----------------------------------------|
| ContoCorrenteID     | INT           | Identificativo univoco del conto       |
| Email               | VARCHAR(255)  | Email dell'utente                      |
| Password            | VARCHAR(255)  | Password criptata                      |
| CognomeTitolare     | VARCHAR(255)  | Cognome del titolare                   |
| NomeTitolare        | VARCHAR(255)  | Nome del titolare                      |
| DataApertura        | DATE          | Data di apertura del conto             |
| IBAN                | VARCHAR(34)   | IBAN associato al conto                |

#### 2. TMovimentiContoCorrente
| Campo              | Tipo          | Descrizione                            |
|--------------------|---------------|----------------------------------------|
| MovimentoID         | INT           | Identificativo univoco del movimento   |
| ContoCorrenteID     | INT           | ID del conto corrente associato        |
| Data                | DATE          | Data del movimento                     |
| Importo             | DECIMAL(10,2) | Importo del movimento                  |
| Saldo               | DECIMAL(10,2) | Saldo finale dopo il movimento         |
| CategoriaMovimentoID| INT           | Categoria del movimento                |
| DescrizioneEstesa   | TEXT          | Dettaglio del movimento                |

#### 3. TCategorieMovimenti
| Campo              | Tipo          | Descrizione                            |
|--------------------|---------------|----------------------------------------|
| CategoriaMovimentoID | INT          | Identificativo della categoria         |
| NomeCategoria       | VARCHAR(255)  | Nome della categoria (es. Bonifico)    |
| Tipologia           | VARCHAR(10)   | "Entrata" o "Uscita"                   |

### Dati di test:
Saranno caricati **almeno 10 movimenti** per due conti correnti di test. Il primo movimento sarà l'apertura del conto con importi a zero e gli altri movimenti includeranno entrate e uscite con saldo aggiornato.

## Funzionalità principali

### 1. Registrazione
- L'utente inserisce email, password, conferma password, nome e cognome.
- Verifiche lato client:
  - Tutti i campi sono obbligatori.
  - Validità della mail.
  - Password di almeno 8 caratteri con una maiuscola e un simbolo.
  - Conferma password deve coincidere con la password.
- Lato server:
  - Verifica che l'email non esista già.
  - Se la registrazione va a buon fine, viene inviato un'email di conferma.
  - Creazione automatica di un movimento di apertura conto con importi a zero.
- La password viene criptata prima di essere salvata nel database.

### 2. Login
- L'utente inserisce email e password.
- Timeout di 30 secondi, dopo il quale il form si resetta.
- In caso di login valido, l'utente viene reindirizzato alla home page, dove vede il saldo del conto e gli ultimi 5 movimenti.
- Ogni accesso viene memorizzato in una tabella separata con IP, data/ora e esito dell'accesso.

### 3. Movimenti
#### 3.1 RicercaMovimenti1
- L'utente può visualizzare gli ultimi **n** movimenti con il saldo finale.
- Ordinamento decrescente per data.
- Possibilità di esportare in formato Excel o CSV.

#### 3.2 RicercaMovimenti2
- Visualizza gli ultimi **n** movimenti filtrati per categoria scelta dall'utente.
- Non viene visualizzato il saldo finale.
- Ordinamento decrescente per data.
- Possibilità di esportare in formato Excel o CSV.

#### 3.3 RicercaMovimenti3
- Visualizza gli ultimi **n** movimenti tra due date scelte dall'utente.
- Non viene visualizzato il saldo finale.
- Ordinamento decrescente per data.
- Possibilità di esportare in formato Excel o CSV.

### 4. Ricarica Cellulare
- L'utente inserisce numero telefonico, operatore e importo della ricarica.
- Verifica se c'è saldo disponibile prima di completare l'operazione.
- Memorizzazione dell'operazione in una tabella separata con IP, data/ora e esito.

### 5. Bonifico
- Procedura per effettuare un bonifico verso un altro conto corrente della stessa applicazione.
- Verifica se l'IBAN del destinatario esiste e se c'è saldo sufficiente.
- Memorizzazione dell'operazione in una tabella separata con IP, data/ora e esito.

### 6. Modifica Password
- L'utente può modificare la password solo se autenticato.
- Memorizzazione dell'operazione con IP, data/ora e esito.

### 7. Profilo
- Visualizza tutti i dati del conto corrente, tranne la password, nella pagina del profilo.

### 8. Menu di Navigazione
- Tutte le pagine sono accessibili tramite un menu di navigazione che appare dopo il login.

## Tecnologia utilizzata
- **Backend**: WebAPI (tecnologia a scelta, es. Node.js con Express, .NET Core, Flask, etc.)
- **Frontend**: Angular (o altro framework frontend a scelta)
- **Database**: A scelta (es. MySQL, PostgreSQL, SQLite)

## Istruzioni per l'installazione
1. **Clonare il repository**:
   ```bash
   git clone [https://github.com/tuo-username/progetto-conti-correnti.git](https://github.com/wickedfluke/projectWorkBanking.git)
   cd progetto-conti-correnti
   ```

2. **Configurare il backend**:
   - Modifica il file `.env` per configurare le variabili di connessione al database e altre impostazioni.
   - Esegui i comandi per installare le dipendenze del backend:
     ```bash
     npm install
     npm start
     ```

3. **Configurare il frontend**:
   - Vai nella cartella del frontend e installa le dipendenze:
     ```bash
     cd frontend
     npm install
     ng serve
     ```

4. **Popolare il database**:
   - Carica le categorie di movimenti nel database e crea i dati di test per i conti correnti e i movimenti associati.

5. **Accedi all'applicazione**:
   - Una volta avviata l'applicazione, apri il browser e naviga verso `http://localhost:4200` per accedere all'interfaccia utente.

## Pubblicazione
Per la pubblicazione dell'applicazione, si consiglia l'utilizzo di servizi come **Heroku**, **Netlify** (per il frontend), o **DigitalOcean** per il deployment di applicazioni full-stack.
