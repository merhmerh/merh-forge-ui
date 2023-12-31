import { writable } from 'svelte/store';

// The notifyStore will be a writable store that holds an array of notifications
export const notifyStore = writable([]);

function createCount() {
    const { subscribe, update } = writable([]);

    function add(msg, opts = {}) {
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

        console.log(notification);
        return notification.id;
    }

    function remove(id) {
        update((notifications) => notifications.filter((notification) => notification.id !== id));
    }

    return { subscribe, add, remove };
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

export const notify = createCount();