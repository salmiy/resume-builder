
export function findStyleSheetByTitle(title: string) {
    const arr = Array.from(document.styleSheets)
    return arr.find(c => c.title == title)
}
export function changeStyleSheetSelectors(s: CSSStyleSheet | undefined, fn: (s:string) => string)
{
    if (!s) return

    const rules = Array.from(s.cssRules)

    rules.forEach(r => {
        if ((r as CSSStyleRule).selectorText)
        (r as CSSStyleRule).selectorText = fn((r as CSSStyleRule).selectorText)
    })
}
export function setStyleSheetDisabled(title: string) {
    const styleSheet = findStyleSheetByTitle(title)
    if (styleSheet) styleSheet.disabled = true;
}