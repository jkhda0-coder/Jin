//
// backup.js
// 📌 데이터 백업 / 복원 (JSON 파일 export/import)
//

import { syncSave } from "./app.js";

// ==========================
// 📌 초기화
// ==========================
export function initBackup(state) {

    const backupBtn = document.getElementById("backupBtn");

    // --------------------------
    // 📌 백업 버튼 (Export)
    // --------------------------
    backupBtn.addEventListener("click", () => {
        exportBackup(state);
    });

    // --------------------------
    // 📌 드래그&드롭 복원 (확장 가능)
// ==========================
    enableImportDrop(state);
}

// ==========================
// 📌 JSON 파일로 백업 export
// ==========================
function exportBackup(state) {
    const dataStr = JSON.stringify(state.topics, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_${Date.now()}.json`;

    a.click();

    URL.revokeObjectURL(url);
}

// ==========================
// 📌 복원 (파일 import)
// ==========================
function importBackup(file, state) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const parsed = JSON.parse(e.target.result);

            if (!Array.isArray(parsed)) {
                alert("잘못된 파일 형식");
                return;
            }

            state.topics = parsed;

            syncSave();
            location.reload(); // 가장 단순 안정 복원
        } catch (err) {
            alert("복원 실패");
            console.error(err);
        }
    };

    reader.readAsText(file);
}

// ==========================
// 📌 드래그 & 드롭 복원
// ==========================
function enableImportDrop(state) {

    window.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    window.addEventListener("drop", (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (!file) return;

        importBackup(file, state);
    });
}
