// Author: Naren P
// Page elements and app data every other file shares (who's logged in, the clothes, the
// current tab).
// Loaded first.

const root = document.getElementById("root");
const nav = document.getElementById("nav");
const userLabel = document.getElementById("username");

let currentUser = null;
let items = [];
let currentPage = "closet";
let history = [];
let styleWeather = null;
let styleOutfits = [];
let styleMessages = [];
let closetFilter = "All";
