//
// editor.js
// 📌 추가 / 수정 / 삭제 / 복사 / 이동 / 즐겨찾기 / Ctrl+S 처리
//

import { state, selectTopic, dom } from "./app.js";
import { syncSave } from "./app.js";

// ==========================
// 📌 초기화 (필요 시 확장용)
// ==========================
export function initEditor(appState, appDom, renderList, saveFn) {
    // 현재는 구조만 확보
}

// ==========================
// 📌 이벤트 바인딩
// ==========================
export function bindEditorEvents(state, dom, renderList, saveFn) {

    const titleInput = dom.titleInput;
    const contentInput = dom.contentInput;

    // --------------------------
    // 📌 제목 수정
    // --------------------------
    titleInput.addEventListener("input", () => {
        const item = getCurrentItem(state);
        if (!item) return;

        item.title = titleInput.value;
        renderList();
        saveFn();
    });

    // --------------------------
    // 📌 내용 수정
    // --------------------------
    contentInput.addEventListener("input", () => {
        const item = getCurrentItem(state);
        if (!item) return;

        item.content = contentInput.value;
        saveFn();
    });

    // --------------------------
    // 📌 Ctrl + S 저장
    // --------------------------
    window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
            e.preventDefault();
            saveFn();
        }
    });

    // --------------------------
    // 📌 추가 버튼
    // --------------------------
    document.getElementById("addBtn").addEventListener("click", () => {
        const newItem = createNewTopic(state);
        state.topics.unshift(newItem);

        selectTopic(newItem.id);
        renderList();
        saveFn();
    });

    // --------------------------
    // 📌 삭제 버튼
    // --------------------------
    document.getElementById("deleteBtn").addEventListener("click", () => {
        const id = state.currentId;
        if (!id) return;

        state.topics = state.topics.filter(t => t.id !== id);

        state.currentId = null;
        renderList();
        saveFn();
    });

    // --------------------------
    // 📌 복사 버튼
    // --------------------------
    document.getElementById("copyBtn").addEventListener("click", () => {
        const item = getCurrentItem(state);
        if (!item) return;

        const copy = {
            ...item,
            id: generateId(state),
            title: item.title + " (복사)"
        };

        state.topics.unshift(copy);
        renderList();
        saveFn();
    });

    // --------------------------
    // 📌 즐겨찾기
    // --------------------------
    document.getElementById("favoriteBtn").addEventListener("click", () => {
        const item = getCurrentItem(state);
        if (!item) return;

        item.favorite = !item.favorite;
        renderList();
        saveFn();
    });

    // --------------------------
    // 📌 이동 (위로/아래로 토글 방식)
    // --------------------------
    document.getElementById("moveBtn").addEventListener("click", () => {
        const id = state.currentId;
        if (!id) return;

        const index = state.topics.findIndex(t => t.id === id);
        if (index === -1) return;

        // 위로 이동
        if (index > 0) {
            const temp = state.topics[index - 1];
            state.topics[index - 1] = state.topics[index];
            state.topics[index] = temp;
        }

        renderList();
        saveFn();
    });
}

// ==========================
// 📌 현재 선택된 아이템
// ==========================
function getCurrentItem(state) {
    return state.topics.find(t => t.id === state.currentId);
}

// ==========================
// 📌 새 논점 생성
// ==========================
function createNewTopic(state) {
    return {
        id: generateId(state),
        group: "A",
        title: "새 논점",
        content: "",
        favorite: false
    };
}

// ==========================
// 📌 ID 생성
// ==========================
function generateId(state) {
    return Date.now() + Math.floor(Math.random() * 1000);
}
