//
// pdf.js
// 📌 현재 논점 / 전체 논점 PDF 저장
//

// ==========================
// 📌 초기화
// ==========================
export function initPDF(state) {

    const btn = document.getElementById("pdfBtn");

    btn.addEventListener("click", () => {
        exportAllToPDF(state);
    });
}

// ==========================
// 📌 전체 논점 PDF export
// ==========================
function exportAllToPDF(state) {

    const content = generateText(state.topics);

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `논점전체_${Date.now()}.txt`;

    a.click();

    URL.revokeObjectURL(url);
}

// ==========================
// 📌 현재 논점 PDF (선택 확장용)
// ==========================
export function exportCurrentToPDF(state) {

    const current = state.topics.find(t => t.id === state.currentId);

    if (!current) {
        alert("선택된 논점 없음");
        return;
    }

    const content = `
[제목]
${current.title}

[그룹]
${current.group}

[내용]
${current.content}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `논점_${current.id}.txt`;

    a.click();

    URL.revokeObjectURL(url);
}

// ==========================
// 📌 텍스트 변환기
// ==========================
function generateText(topics) {

    let result = "";

    topics.forEach((t, index) => {

        result += `
==============================
[${index + 1}] ${t.title}
그룹: ${t.group}
즐겨찾기: ${t.favorite ? "YES" : "NO"}

내용:
${t.content}

==============================

`;
    });

    return result;
}
