import { Items } from "../models/items";

// Fetch Data
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        throw Error("Data error");
    }
}

// Fetch items
export async function fetchItems(): Promise<Items []> {
    const response = await fetchData("https://658d975e7c48dce94739738c.mockapi.io/todos", { method: "GET" });
    return response.json();
}

// Create Items
export interface ItemsInput {
    title: string,
    text: string,
    isEnding: boolean,
    created: number,
}

export async function createItems(myItems: ItemsInput): Promise<Items> {
    const response = await fetchData("https://658d975e7c48dce94739738c.mockapi.io/todos", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(myItems),
    });
    return response.json();
}

// Update Items
export async function updateItem(itemId: string, updatedData: Partial<ItemsInput>): Promise<Items> {
    const response = await fetchData(`https://658d975e7c48dce94739738c.mockapi.io/todos/${itemId}`, 
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  }

// Delete Items
export async function deleteItem(itemId: string) {
    const response = await fetchData(`https://658d975e7c48dce94739738c.mockapi.io/todos/${itemId}`, { method: "DELETE" });
    return response.json();
  }