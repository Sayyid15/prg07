// database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("sportLocator.db");

export async function createDatabase() {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS routes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT
            );
        `);
        console.log("Database setup complete");
    } catch (error) {
        console.error("Fout bij database-initialisatie:", error);
    }
}

export async function saveRoute(route) {
    try {
        await db.runAsync(
            "INSERT INTO routes (data) VALUES (?);",
            [JSON.stringify(route)]
        );
        console.log("Route opgeslagen");
    } catch (error) {
        console.error("Fout bij opslaan van route:", error);
    }
}

export async function getRoutes() {
    try {
        const results = await db.getAllAsync("SELECT * FROM routes;");
        return results.map(row => ({
            id: row.id,
            data: JSON.parse(row.data),
        }));
    } catch (error) {
        console.error("Fout bij ophalen van routes:", error);
        return [];
    }
}

export async function deleteRoute(id) {
    if (!id) {
        console.error("Geen geldig ID ontvangen!");
        return;
    }

    try {
        await db.runAsync("DELETE FROM routes WHERE id = ?;", [id]);
        console.log(`Route met ID ${id} is verwijderd`);
    } catch (error) {
        console.error("Fout bij verwijderen van route:", error);
    }
}
