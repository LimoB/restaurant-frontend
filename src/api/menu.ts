import client from './client';

export async function fetchAllMenuItems() {
    const res = await client.get('/menu_item'); // adjust path if needed
    return res.data;
}
