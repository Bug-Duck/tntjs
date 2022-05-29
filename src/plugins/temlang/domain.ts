namespace TemplateLanguage {
    export function tphttpget(dom) {
        const http = new XMLHttpRequest();
        dom.innerHTML = http.open('GET', dom.innerHTML, true);
    }

    export function tphttppost(dom) {
        const http = new XMLHttpRequest();
        dom.innerHTML = http.open('POST', dom.innerHTML, true)
    }
}