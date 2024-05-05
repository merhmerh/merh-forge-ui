import { writable } from "svelte/store";

export const notify = createNotify();

function createNotify() {
    const { subscribe, update } = writable([]);

    function add(msg, opts = { type: "info" }) {
        const notification = {
            id: generateID(),
            message: msg,
            options: opts,
        };

        update((notifications) => [...notifications, notification]);

        // Automatically remove the notification after a specified duration (default: 5000ms)
        const duration = opts.duration || 5000;
        setTimeout(() => {
            remove(notification.id);
        }, duration);

        return notification.id;
    }

    function alert(msg, opts = { type: "alert", duration: false }) {
        const notification = {
            id: generateID(),
            message: msg,
            options: opts,
        };

        update((notifications) => [...notifications, notification]);

        // Automatically remove the notification after a specified duration (default: 5000ms)
        if (opts.duration == false) {
            return notification.id;
        }
        const duration = opts.duration || 5000;

        setTimeout(() => {
            remove(notification.id);
        }, duration);

        return notification.id;
    }

    function remove(id) {
        update((notifications) => notifications.filter((notification) => notification.id !== id));
    }

    return { subscribe, add, alert, remove };
}

function generateID(length) {
    if (!length) {
        length = 8;
    }
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }

    return id;
}
