import axios from "axios";
import store from "@/store/index.js";
import router from "@/router/index.js";

const cirqueInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

export async function getAccounts() {
  try {
    const res = await cirqueInstance("/lanistes");
    return res.data;
  } catch (e) {
    throw new Error("La requête a échoué");
  }
}

export async function connection(email) {
  try {
    const res = await cirqueInstance("/lanistes");
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].email == email) {
        store.commit("setAccount", {
          id: res.data[i].id,
          laniste: res.data[i].laniste,
          deniers: res.data[i].deniers,
        });
        return true;
      }
    }
    return false;
  } catch (e) {
    throw new Error(e);
  }
}

export async function createAccount(
  email,
  password,
  laniste,
  ludi,
  specialite
) {
  try {
    let newId;
    cirqueInstance
      .post("/lanistes", {
        email: email,
        password: password,
        laniste: laniste,
        deniers: 10,
      })
      .then(function (response) {
        newId = response.data.id;
        cirqueInstance
          .post("/ludis", {
            nom: ludi,
            specialite: specialite,
            lanisteId: newId,
          })
          .then(function (response) {
            store.commit("setAccount", {
              id: response.data.lanisteId,
              laniste: laniste,
              deniers: 10,
            });
            router.push("/game");
          })
          .catch(function (error) {
            console.log(error);
            throw new Error("Erreur lors de la création du compte");
          });
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Erreur lors de la création du compte");
      });
  } catch (e) {
    throw new Error("La requête a échoué");
  }
}

export async function getLudisByAccount(id) {
  //verif si id existant avec /lanistes/{id}
  let ludis = [];
  const res = await cirqueInstance("/ludis");
  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].lanisteId == id) {
      ludis.push({
        id: res.data[i].id,
        name: res.data[i].nom,
        specialite: res.data[i].specialite,
      });
    }
  }
  store.commit("setLudis", ludis);
}

export async function getLudiById(id) {
  try {
    const res = await cirqueInstance(`/ludis/${id}`);
    return res.data;
  } catch (e) {
    throw new Error("Une erreur est survenue lors du traitement");
  }
}

export async function getGladiatorsByLudi(id) {
  //verif si id existant avec /ludis/{id}
  let gladiators = [];
  const res = await cirqueInstance("/gladiateurs");
  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].ludiId == id) {
      gladiators.push({
        id: res.data[i].id,
        name: res.data[i].nom,
        adresse: res.data[i].adresse,
        force: res.data[i].force,
        equilibre: res.data[i].equilibre,
        vitesse: res.data[i].vitesse,
        strategie: res.data[i].strategie,
      });
    }
  }
  return gladiators;
}

export async function addLudi(name, specialite, idLaniste) {
  try {
    cirqueInstance
      .post("/ludis", {
        nom: name,
        specialite: specialite,
        lanisteId: idLaniste,
      })
      .then(function (response) {
        store.commit("addLudi", {
          id: response.data.id,
          name: name,
          specialite: specialite,
          lanisteId: idLaniste,
        });
        return true;
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Erreur lors de la création du ludi");
      });
  } catch (e) {
    throw new Error("Erreur lors de la requête");
  }
}

export async function addGladiator(name, idLudi) {
  try {
    cirqueInstance
      .post("/gladiateurs", {
        nom: name,
        adresse: Math.ceil(Math.floor(Math.random() * 4)),
        force: Math.ceil(Math.floor(Math.random() * 4)),
        equilibre: Math.ceil(Math.floor(Math.random() * 4)),
        vitesse: Math.ceil(Math.floor(Math.random() * 4)),
        strategie: Math.ceil(Math.floor(Math.random() * 4)),
        ludiId: idLudi,
      })
      .then(function () {
        store.commit("addGladiateur");
        cirqueInstance
          .patch(`/lanistes/${store.state.id}`, {
            deniers: store.state.deniers,
          })
          .then(() => {
            return true;
          })
          .catch(function (error) {
            console.log(error);
            throw new Error("Erreur lors du traitement");
          });
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Erreur lors de la création du gladiateur");
      });
  } catch (e) {
    throw new Error("Erreur lors de la requête");
  }
}

export async function getGladiatorById(idGladiator) {
  try {
    const res = await cirqueInstance(`/gladiateurs/${idGladiator}`);
    let gladiator = {
      id: res.data.id,
      name: res.data.nom,
      adresse: res.data.adresse,
      force: res.data.force,
      equilibre: res.data.equilibre,
      vitesse: res.data.vitesse,
      strategie: res.data.strategie,
      ludiId: res.data.ludiId,
    };
    return gladiator;
  } catch (e) {
    console.log(e);
    throw new Error("Erreur lors de la requête");
  }
}

export async function getSpecialiteByIdLudi(idLudi) {
  try {
    const res = await cirqueInstance(`/ludis/${idLudi}`);
    let specialite = res.data.specialite;
    return specialite;
  } catch (e) {
    console.log(e);
    throw new Error("Erreur lors de la requête");
  }
}

export async function physicTrain(gladiatorId, specialiteLudi, stats) {
  let PJ;
  switch (specialiteLudi) {
    case "COURSE_DE_CHAR":
      PJ = generateRandom(2, 4);
      break;
    case "LUTTE":
      PJ = generateRandom(3, 6);
      break;
    case "ATHLETISME":
      PJ = generateRandom(3, 5);
      break;
    default:
      PJ = 0;
  }
  cirqueInstance
    .patch(`/gladiateurs/${gladiatorId}`, {
      adresse: stats.adresse + 0.4 * PJ,
      force: stats.force + 0.3 * PJ,
      equilibre: stats.equilibre - 0.1 * PJ,
      vitesse: stats.vitesse + 0.5 * PJ,
      strategie: stats.strategie - 0.2 * PJ,
    })
    .then(() => {
      let date = new Date();
      cirqueInstance
        .post("/entrainements", {
          gladiateurId: gladiatorId,
          date: date.toJSON(),
        })
        .then(() => {
          return true;
        })
        .catch(function (error) {
          console.log(error);
          throw new Error("Erreur lors du traitement");
        });
    })
    .catch(function (error) {
      console.log(error);
      throw new Error("Erreur lors du traitement");
    });
}

export async function tacticTrain(gladiatorId, specialiteLudi, stats) {
  let PJ;
  switch (specialiteLudi) {
    case "COURSE_DE_CHAR":
      PJ = generateRandom(3, 6);
      break;
    case "LUTTE":
      PJ = generateRandom(1, 3);
      break;
    case "ATHLETISME":
      PJ = generateRandom(2, 3);
      break;
    default:
      PJ = 0;
  }
  cirqueInstance
    .patch(`/gladiateurs/${gladiatorId}`, {
      adresse: stats.adresse + 0.4 * PJ,
      force: stats.force + 0.3 * PJ,
      equilibre: stats.equilibre - 0.1 * PJ,
      vitesse: stats.vitesse + 0.5 * PJ,
      strategie: stats.strategie - 0.2 * PJ,
    })
    .then(() => {
      let date = new Date();
      cirqueInstance
        .post("/entrainements", {
          gladiateurId: gladiatorId,
          date: date.toJSON(),
        })
        .then(() => {
          return true;
        })
        .catch(function (error) {
          console.log(error);
          throw new Error("Erreur lors du traitement");
        });
    })
    .catch(function (error) {
      console.log(error);
      throw new Error("Erreur lors du traitement");
    });
}

export async function combinedTrain(gladiatorId, specialiteLudi, stats) {
  let PJ;
  switch (specialiteLudi) {
    case "COURSE_DE_CHAR":
      PJ = generateRandom(2, 7);
      break;
    case "LUTTE":
      PJ = generateRandom(1, 5);
      break;
    case "ATHLETISME":
      PJ = generateRandom(3, 9);
      break;
    default:
      PJ = 0;
  }
  cirqueInstance
    .patch(`/gladiateurs/${gladiatorId}`, {
      adresse: stats.adresse + 0.4 * PJ,
      force: stats.force + 0.3 * PJ,
      equilibre: stats.equilibre - 0.1 * PJ,
      vitesse: stats.vitesse + 0.5 * PJ,
      strategie: stats.strategie - 0.2 * PJ,
    })
    .then(() => {
      let date = new Date();
      cirqueInstance
        .post("/entrainements", {
          gladiateurId: gladiatorId,
          date: date.toJSON(),
        })
        .then(() => {
          return true;
        })
        .catch(function (error) {
          console.log(error);
          throw new Error("Erreur lors du traitement");
        });
    })
    .catch(function (error) {
      console.log(error);
      throw new Error("Erreur lors du traitement");
    });
}

export function generateRandom(min, max) {
  let difference = max + 1 - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

export async function checkLastTraining(gladiatorId) {
  let today = new Date();
  let trainings = [];
  const res = await cirqueInstance("/entrainements");

  //On récupère tous les entrainements du gladiateur actuel
  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].gladiateurId == gladiatorId) {
      trainings.push(res.data[i].date);
    }
  }

  //On récupère la date du dernier entrainement
  let lastTraining = new Date(
    Math.max.apply(
      null,
      trainings.map(function (e) {
        return new Date(e);
      })
    )
  );

  let difference = today - lastTraining;
  let days = Math.ceil(difference / (1000 * 3600 * 24));
  let hoursLeft = Math.ceil(24 - difference / (1000 * 3600));

  //Si cela fait plus d'un jour ou que le gladiateur ne s'est pas encore entrainé une seule fois
  if (days > 1 || trainings.length == 0) {
    return { verif: true };
  } else {
    return { verif: false, hoursLeft: hoursLeft };
  }
}
