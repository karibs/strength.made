/*! coi-serviceworker v0.1.7 - Guido Zuidhof, licensed under MIT */
let coepCredentialless = false;
if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

    self.addEventListener("message", (ev) => {
        if (!ev.data) {
            return;
        } else if (ev.data.type === "deregister") {
            self.registration
                .unregister()
                .then(() => {
                    return self.clients.matchAll();
                })
                .then((clients) => {
                    clients.forEach((client) => client.navigate(client.url));
                });
        } else if (ev.data.type === "coepCredentialless") {
            coepCredentialless = ev.data.value;
        }
    });

    self.addEventListener("fetch", function (event) {
        const r = event.request;
        if (r.cache === "only-if-cached" && r.mode !== "same-origin") {
            return;
        }

        const request = (coepCredentialless && r.mode === "no-cors")
            ? new Request(r, { credentials: "omit" })
            : r;

        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.status === 0) {
                        return response;
                    }

                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Embedder-Policy",
                        coepCredentialless ? "credentialless" : "require-corp"
                    );
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
                .catch((e) => console.error(e))
        );
    });

} else {
    (() => {
        const reloadedBySelf = window.sessionStorage.getItem("coiReloadedBySelf");
        window.sessionStorage.removeItem("coiReloadedBySelf");
        const coepDegrading = (reloadedBySelf == "coepdegrade");

        // Check if we have SharedArrayBuffer
        if (window.crossOriginIsolated !== false && window.SharedArrayBuffer) return;

        // Check if service workers are available
        if (!window.isSecureContext) {
            console.log("COOP/COEP Service Worker: Secure context required.");
            return;
        }

        if (!("serviceWorker" in navigator)) {
            console.log("COOP/COEP Service Worker: Not available.");
            return;
        }

        // Check already controlling
        if (navigator.serviceWorker.controller) {
            console.log("COOP/COEP Service Worker: Already registered.");
            return;
        }

        const scriptPath = document.currentScript?.src || new URL("coi-serviceworker.js", window.location.href).href;

        navigator.serviceWorker
            .register(scriptPath)
            .then((registration) => {
                console.log("COOP/COEP Service Worker: Registered.", registration.scope);

                registration.addEventListener("updatefound", () => {
                    console.log("COOP/COEP Service Worker: Update found, reloading...");
                    window.sessionStorage.setItem("coiReloadedBySelf", "updatefound");
                    window.location.reload();
                });

                if (registration.active && !navigator.serviceWorker.controller) {
                    console.log("COOP/COEP Service Worker: Reloading to activate...");
                    window.sessionStorage.setItem("coiReloadedBySelf", "notcontrolling");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error("COOP/COEP Service Worker: Registration failed.", error);
            });
    })();
}
