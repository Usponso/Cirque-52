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
        throw new Error("Erreur lors de la création du compte");
      });
  } catch (e) {
    throw new Error("Erreur lors de la requête");
  }
}
