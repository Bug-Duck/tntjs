class TagRenderer {
    render() {
        const tags = document.querySelectorAll("tnt");
        tags.forEach((tag) => {
            if (tag.style.getPropertyValue("display") !== "none") {
                tag.style.setProperty("display", "none");
            }
        });
    }
}

export { TagRenderer };
//# sourceMappingURL=TagRenderer.js.map
