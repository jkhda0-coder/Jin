//
// search.js
// 📌 제목 + 내용 통합 검색 필터 엔진
//

// ==========================
// 📌 초기화
// ==========================
export function initSearch(state, dom, renderList) {

    const input = dom.searchInput;

    // --------------------------
    // 📌 실시간 검색
    // --------------------------
    input.addEventListener("input", () => {
        const keyword = input.value.trim().toLowerCase();

        if (!keyword) {
            renderList(state.topics);
            return;
        }

        const filtered = state.topics.filter(item => {
            const title = (item.title || "").toLowerCase();
            const content = (item.content || "").toLowerCase();

            return title.includes(keyword) || content.includes(keyword);
        });

        renderList(filtered);
    });
}

// ==========================
// 📌 확장용 검색 함수 (외부 호출 가능)
// ==========================
export function searchTopics(topics, keyword) {
    const k = keyword.trim().toLowerCase();

    if (!k) return topics;

    return topics.filter(item => {
        return (
            (item.title || "").toLowerCase().includes(k) ||
            (item.content || "").toLowerCase().includes(k)
        );
    });
}
