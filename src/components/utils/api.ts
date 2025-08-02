export async function fetchUsers({limit, skip}: {limit?: number, skip?: number}) {
    try {
        const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching users: ', error)
        throw error
    }
}

export async function deleteUser(userId: number) {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'DELETE',
        });

        if(!response.ok) {
            throw new Error('Failed to delete user');
        }

        const data = await response.json()
        return data.user

    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
}

export async function fetchUserBySearchQuery(query: string) {
    try {
        const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching user: ', error)
        throw error
    }
}