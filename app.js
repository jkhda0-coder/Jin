// app.js
// 📌 전체 시스템 초기화 + 모듈 연결 허브

import { topics } from "./data.js";
import { loadFromStorage, saveToStorage } from "./storage.js";
import { initEditor, bindEditorEvents } from "./editor.js";
import { initSearch } from "./search.js";
import { initBackup } from "./backup.js";
import { initPDF } from "./pdf.js";

// ==========================
// 📌 전역 상태 (단일 진실)
// ==========================
export let state = {
    topics: [],        // 전체 논점 데이터
    currentId: null    // 선택된 논점
};

// ==========================
// 📌 DOM 캐싱 (성능 + 구조 안정)
// ==========================
export const dom = {
    list: null,
    titleInput: null,
    contentInput: null,
    searchInput: null
};

// ==========================
// 📌 초기 렌더링
// ==========================
function renderList() {
    if (!dom.list) return;

    dom.list.innerHTML = "";

    state.topics.forEach(item => {
        const el = document.createElement("div");
        el.className = "topic-item";
        el.dataset.id = item.id;

        el.innerHTML = `
            <div class="title">
                ${item.favorite ? "⭐ " : ""}${item.title}
            </div>
            <small>${item.group}</small>
        `;

        el.addEventListener("click", () => {
            selectTopic(item.id);
        });

        dom.list.appendChild(el);
    });
}

// ==========================
// 📌 선택 로직
// ==========================
export function selectTopic(id) {
    state.currentId = id;

    const target = state.topics.find(t => t.id === id);
    if (!target) return;

    dom.titleInput.value = target.title;
    dom.contentInput.value = target.content;

    renderList();
}

// ==========================
// 📌 초기 데이터 로딩
// ==========================
function initData() {
    const saved = loadFromStorage();

    if (saved && saved.length > 0) {
        state.topics = saved;
    } else {
        state.topics = topics; // 기본 데이터
    }
}

// ==========================
// 📌 DOM 연결
// ==========================
function bindDOM() {
    dom.list = document.getElementById("topicList");
    dom.titleInput = document.getElementById("titleInput");
    dom.contentInput = document.getElementById("contentInput");
    dom.searchInput = document.getElementById("searchInput");
}

// ==========================
// 📌 저장 트리거
// ==========================
export function syncSave() {
    saveToStorage(state.topics);
}

// ==========================
// 📌 초기 실행
// ==========================
function initApp() {
    bindDOM();
    initData();

    renderList();

    initEditor(state, dom, renderList, syncSave);
    initSearch(state, dom, renderList);
    initBackup(state);
    initPDF(state);

    bindEditorEvents(state, dom, renderList, syncSave);
}

// 실행
initApp();
