import { useEffect, useState } from "react";
import { Items as ItemsModel } from "../models/items";
import * as TodoApi from "../network/todo_api";
import Item from "../components/Items/Item";
import CreateItems from "../components/Items/CreateItems";

const ToDosPage = () => {

  const [myItems, setMyItems] = useState<ItemsModel[]>([]);
  const [addToDos, setAddToDos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  // Load Items
  useEffect(() => {
    async function loadItems() {
        try {
            const myItems = await TodoApi.fetchItems();
            setMyItems(myItems);
        } catch (error) {
            console.error(error);
        }
        
    }
    loadItems();
  }, []);

  // Delete Item
  async function deleteItem(myItem: ItemsModel) {
    try {
        await TodoApi.deleteItem(myItem.id);
        setMyItems(myItems.filter(existingMyItem => existingMyItem.id !== myItem.id))
    } catch (error) {
        console.error(error);
    }
  }

  // Filtered Items
  const filteredItems = myItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (!showActiveOnly || !item.isEnding) &&
    (!showCompletedOnly || item.isEnding)
  );

  // Items Grid
  const myItemsGrid = (
    <div className="flex flex-wrap">
      {filteredItems.map((myItem) => (
        <div key={myItem.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
          <Item 
            myItem={myItem} 
            onDeletemyItemClicked = {deleteItem}
          />
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="container mx-auto space-x-4">
        <div className="flex justify-between mt-4 w-full mx-auto">
        <input
          type="text"
          placeholder="Search ToDo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={() => setAddToDos(!addToDos)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm ml-2"
        >
          Add To Dos
        </button>
        <button
          onClick={() => setShowActiveOnly(!showActiveOnly)}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm ml-2`}
        >
          Active
        </button>
        <button
          onClick={() => setShowCompletedOnly(!showCompletedOnly)}
          className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-sm ml-2`}
        >
          Completed
        </button>
      </div>
        {
            myItems.length > 0
                ? myItemsGrid
                : <p>You do not have any To Dos yet</p>
        }
        {
            addToDos && <CreateItems onItemSaved={(newItem) => {
                setMyItems([...myItems, newItem])
            }} />
        }
    </div>
  )
}

export default ToDosPage;
