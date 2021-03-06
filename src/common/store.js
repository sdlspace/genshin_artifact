import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

let id = 0;
let flower = [];
let feather = [];
let sand = [];
let cup = [];
let head = [];
let localStoredArtifacts = localStorage.getItem("artifacts");
if (localStoredArtifacts) {
    let obj = JSON.parse(localStoredArtifacts);

    flower = obj.flower || [];
    feather = obj.feather || [];
    sand = obj.sand || [];
    cup = obj.cup || [];
    head = obj.head || [];

    let temp = flower.concat(feather).concat(sand).concat(cup).concat(head);
    for (let item of temp) {
        id = Math.max(id, item.id);
    }
    id++;
}

let _store = new Vuex.Store({
    state: {
        flower,
        feather,
        sand,
        cup,
        head,
    },
    mutations: {
        removeArtifact(state, obj) {
            console.log(obj);
            state[obj.position].splice(obj.index, 1);
        },

        addArtifact(state, item) {
            item.id = id++;
            state[item.position].push(item);
        },

        toggleArtifact(state, obj) {
            let art = state[obj.position][obj.index];
            art.omit = !art.omit;
        },

        setArtifacts(state, obj) {
            ["flower", "feather", "sand", "cup", "head"].forEach(item => {
                state[item] = obj[item];
            })
        }
    },
    getters: {
        flowerCount: state => {
            return state.flower.length;
        },

        featherCount: state => {
            return state.feather.length;
        },

        sandCount: state => {
            return state.sand.length;
        },

        cupCount: state => {
            return state.cup.length;
        },

        headCount: state => {
            return state.head.length;
        },

        iterCount: (state, getters) => {
            let a = Math.max(getters.flowerCount, 1);
            let b = Math.max(getters.featherCount, 1);
            let c = Math.max(getters.sandCount, 1);
            let d = Math.max(getters.cupCount, 1);
            let e = Math.max(getters.headCount, 1);

            let prod = a * b * c * d * e;
            return prod;
        },

        valid: (state, getters) => {
            return getters.iterCount < 1500000;
        }
    }
})

_store.watch(
    state => ({
        flower: state.flower,
        feather: state.feather,
        sand: state.sand,
        cup: state.cup,
        head: state.head,
    }),
    newValue => {
        localStorage.setItem("artifacts", JSON.stringify(newValue));
    }
);

export default _store;