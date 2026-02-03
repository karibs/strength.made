(function () {
    const contentId = 'content-root';
    const pageStyleId = 'page-style';

    const isSameOrigin = (url) => {
        if (location.origin === 'null') {
            return true;
        }
        return url.origin === location.origin;
    };

    const shouldHandle = (link) => {
        const href = link.getAttribute('href');
        if (!href) return false;
        if (href.startsWith('#')) return false;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        if (link.target === '_blank') return false;
        if (link.hasAttribute('download')) return false;
        const url = new URL(link.href, location.href);
        if (!isSameOrigin(url)) return false;
        return /\.html($|[?#])/.test(url.pathname);
    };

    const syncPageStyle = (doc) => {
        const newStyle = doc.getElementById(pageStyleId);
        const currentStyle = document.getElementById(pageStyleId);
        if (!currentStyle) return;
        currentStyle.textContent = newStyle ? newStyle.textContent : '';
    };

    const runScriptsInOrder = async (root) => {
        const scripts = Array.from(root.querySelectorAll('script'));
        for (const script of scripts) {
            if (script.src) {
                const existing = document.querySelector(`script[src="${script.src}"]`);
                if (existing) continue;
                await new Promise((resolve, reject) => {
                    const tag = document.createElement('script');
                    tag.src = script.src;
                    tag.async = false;
                    tag.onload = resolve;
                    tag.onerror = reject;
                    document.body.appendChild(tag);
                });
            } else if (script.textContent.trim()) {
                const tag = document.createElement('script');
                tag.textContent = script.textContent;
                document.body.appendChild(tag);
            }
        }
    };

    const swapContent = async (doc, url, pushState) => {
        const newContent = doc.getElementById(contentId);
        const currentContent = document.getElementById(contentId);
        if (!newContent || !currentContent) {
            location.href = url;
            return;
        }

        // Replace entire body content except scripts
        const currentBody = document.body;
        const newBody = doc.body;

        // Keep track of existing scripts to avoid re-adding
        const existingScripts = new Set(
            Array.from(currentBody.querySelectorAll('script[src]'))
                .map(s => s.src)
        );

        // Clear current body and copy new content
        while (currentBody.firstChild) {
            currentBody.removeChild(currentBody.firstChild);
        }

        // Copy all children from new body
        Array.from(newBody.childNodes).forEach(node => {
            if (node.nodeName === 'SCRIPT') {
                // Skip scripts, they'll be handled by runScriptsInOrder
                return;
            }
            currentBody.appendChild(node.cloneNode(true));
        });

        syncPageStyle(doc);

        if (doc.title) {
            document.title = doc.title;
        }

        if (pushState) {
            history.pushState({ url }, '', url);
        }

        await runScriptsInOrder(doc.body);

        if (window.initToolPage) {
            window.initToolPage();
        }
        if (window.initVideoAnalysis) {
            window.initVideoAnalysis();
        }

        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const loadPage = async (url, pushState = true) => {
        try {
            const res = await fetch(url, { headers: { 'X-Requested-With': 'fetch' } });
            const text = await res.text();
            const doc = new DOMParser().parseFromString(text, 'text/html');
            await swapContent(doc, url, pushState);
        } catch (err) {
            location.href = url;
        }
    };

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link || !shouldHandle(link)) return;
        event.preventDefault();
        loadPage(link.href, true);
    });

    window.addEventListener('popstate', (event) => {
        const url = (event.state && event.state.url) ? event.state.url : location.href;
        loadPage(url, false);
    });
})();
