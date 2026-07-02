//
// storage.js
// 📌 로컬 저장 / 복원 담당 (Ctrl+S 핵심 엔진)
//

const STORAGE_KEY = "APP_TOPICS_V1";

// ==========================
// 📌 저장
// ==========================
export function saveToStorage(topics) {
    try {
        const data = JSON.stringify(topics);
        localStorage.setItem(STORAGE_KEY, data);
    } catch (err) {
        console.error("저장 실패:", err);
    }
}

// ==========================
// 📌 불러오기
// ==========================
export function loadFromStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;

        return JSON.parse(data);
    } catch (err) {
        console.error("복원 실패:", err);
        return null;
    }
}

// ==========================
// 📌 즉시 저장 (단축 함수)
// ==========================
export function quickSave(state) {
    saveToStorage(state.topics);
}

// ==========================
// 📌 전체 초기화 (디버그용)
// ==========================
export function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}
