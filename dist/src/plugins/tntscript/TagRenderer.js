class TagRenderer {
    constructor(root) {
        this.root = root;
    }
    render() {
        const tags = this.root.querySelectorAll("tnt");
        tags.forEach((tag) => {
            if (tag.style.getPropertyValue("display") !== "none") {
                tag.style.setProperty("display", "none");
            }
        });
    }
}

export { TagRenderer };
//# sourceMappingURL=TagRenderer.js.map
