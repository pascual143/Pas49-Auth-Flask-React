const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                console.log("Application just loaded, syncing the session storage token");
                if (token && token !== "" && token !== undefined) setStore({ token: token });
            },

            logout: () => {
                sessionStorage.removeItem("token");
                console.log("Logout");
                setStore({ token: null });
            },

            login: async (email, password) => {
                const opts = {
					mode: 'cors',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const resp = await fetch("https://ideal-meme-wg5745gp67x25jqp-3001.app.github.dev/api/login", opts);
                    if (resp.status !== 200) {
                        alert("There has been some error");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("This came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                } catch (error) {
                    console.error("There has been an error logging in", error);
                }
            },

            register: async (email, password) => {
                const opts = {
					mode: 'cors',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const resp = await fetch("https://ideal-meme-wg5745gp67x25jqp-3001.app.github.dev/api/register", opts);
                    if (resp.status !== 200) {
                        alert("There has been some error");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("This came from the backend", data);
                    return true;
                } catch (error) {
                    console.error("There has been an error registering", error);
                }
            },

            getMessage: async () => {
                const store = getStore();
                const opts = {
					mode: 'cors',
                    headers: {
                        Authorization: "Bearer " + store.token
                    }
                };
                try {
                    const resp = await fetch("https://ideal-meme-wg5745gp67x25jqp-3001.app.github.dev/api/hello", opts);
                    if (resp.status !== 200) {
                        console.log("Error loading message from backend");
                        return;
                    }
                    const data = await resp.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) {
                        return {
                            ...elm,
                            background: color
                        };
                    } else {
                        return elm;
                    }
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;