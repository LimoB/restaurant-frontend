import { store } from "../store/store";

const API_URL = "http://localhost:3000/api";

const getToken = () => store.getState().auth.token || "";

export interface Driver {
    id: number;
    name?: string; // Optional here since `name` is likely from `users` table
    car_make?: string;
    car_model?: string;
    car_year?: string;
    license_plate?: string;
    user_id?: number;
    active?: boolean;
}

// Fetch all drivers
export const fetchAllDrivers = async (): Promise<Driver[]> => {
    const res = await fetch(`${API_URL}/drivers`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch drivers");

    return await res.json();
};

// Fetch a driver by ID
export const fetchDriverById = async (id: number): Promise<Driver> => {
    const res = await fetch(`${API_URL}/driver/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) throw new Error(`Failed to fetch driver with ID ${id}`);

    return await res.json();
};

// Fetch drivers by User ID
export const fetchDriversByUserId = async (userId: number): Promise<Driver[]> => {
    const res = await fetch(`${API_URL}/driver/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) throw new Error(`Failed to fetch drivers for user ${userId}`);

    return await res.json();
};

// Create a new driver
export const createDriver = async (data: Omit<Driver, "id">) => {
    const res = await fetch(`${API_URL}/driver`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to create driver: ${error}`);
    }

    return await res.json();
};

// Update an existing driver
export const updateDriver = async (id: number, data: Partial<Driver>) => {
    const res = await fetch(`${API_URL}/driver/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update driver: ${error}`);
    }

    return await res.json();
};

// Delete a driver
export const deleteDriver = async (id: number) => {
    const res = await fetch(`${API_URL}/driver/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to delete driver: ${error}`);
    }
};
