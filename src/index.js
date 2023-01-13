import { initializeApp } from "firebase/app";

import {
    collection, getDocs, query, where, getFirestore,
    onSnapshot, getDoc, ref
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBanM8UFvBbPZDzh6Oh8Hth3WB5t36yDuY",
    authDomain: "reinsdyrdb-53e3a.firebaseapp.com",
    projectId: "reinsdyrdb-53e3a",
    storageBucket: "reinsdyrdb-53e3a.appspot.com",
    messagingSenderId: "712916570524",
    appId: "1:712916570524:web:57862baaa4499e2f707859"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const search = document.getElementById('search');
const output = document.getElementById('searchOutput');

const reinDB = collection(db, 'reinsdyr');
const flokkDB = collection(db, 'flokk');
const eierDB = collection(db, 'eier');
const beiteDB = collection(db, 'beiteområde');

search.addEventListener('submit', e => {
    e.preventDefault();
    let reinSearch = search.search.value;
    search.reset();
    DBsearch(reinSearch);
});

const reinDoc = ['flokk', 'fødselsdato', 'navn', 'serienummer'];
const flokkDoc = ['beiteområde', 'buemerke', 'buemerkeURL', 'eier', 'flokknavn', 'serieinndeling'];
const eierDoc = ['Kontaktspråk', 'Telefonnummer', 'navn', 'personnummer'];
const beiteDoc = ['Fylke', 'område']

async function DBsearch(input) {
    output.innerHTML = "";
    for (let i = 0; i < reinDoc.length; i++) {
        const q = query(reinDB, where(reinDoc[i], '==', input));
        const searchQ = await getDocs(q);
        searchQ.forEach((doc) => {
            output.innerHTML += `
            <div class="searchRes">
            <h4>${doc.data().navn}</h4>
            <p>Født: ${doc.data().fødselsdato}</p>
            <p id="${doc.data().flokk}">Flokk: ${doc.data().flokk}</p>
            <p>Serienummer: ${doc.data().serienummer}</p>
            <div>
            `
        });
    };
    for (let i = 0; i < flokkDoc.length; i++) {
        const q = query(flokkDB, where(flokkDoc[i], '==', input));
        const searchQ = await getDocs(q);
        searchQ.forEach((doc) => {
            output.innerHTML += `
            <div class="searchRes">
            <h4>${doc.data().flokknavn}</h4>
            <p id="${doc.data().eier}">Eier: ${doc.data().eier}</p>
            <p>Serieinndeling: ${doc.data().serieinndeling}</p>
            <p>Beiteområde: ${doc.data().beiteområde}</p>
            <p>Buemerke: ${doc.data().buemerke}</p>
            <a class="serienummer" href="${doc.data().buemerkeURL}">buemerke bilde</a>
            <div>
            `
        });
    };
    for (let i = 0; i < eierDoc.length; i++) {
        const q = query(eierDB, where(eierDoc[i], '==', input));
        const searchQ = await getDocs(q);
        searchQ.forEach((doc) => {
            output.innerHTML += `
            <div class="searchRes">
            <h4>${doc.data().navn}</h4>
            <p>Personnummer: ${doc.data().personnummer}</p>
            <p>Kontaktspråk: ${doc.data().Kontaktspråk}</p>
            <p>Telefonnummer: ${doc.data().Telefonnummer}</p>
            <div>
            `
        });
    };
    for (let i = 0; i < beiteDoc.length; i++) {
        const q = query(beiteDB, where(beiteDoc[i], '==', input));
        const searchQ = await getDocs(q);
        searchQ.forEach((doc) => {
            output.innerHTML += `
            <div class="searchRes">
            <h4>${doc.data().område}</h4>
            <p>Fylke: ${doc.data().Fylke}</p>
            <div>
            `
        });
    };
};