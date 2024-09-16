fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Il tuo IP è:", data.ip);
  })
  .catch((error) => {
    console.error("Errore nel recupero dell'IP:", error);
  });
