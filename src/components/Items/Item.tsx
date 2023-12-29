import { useState } from "react";
import { Items as ItemsModel } from "../../models/items";
import { formatDate } from "../../utils/formateDate";
import * as TodoApi from "../../network/todo_api";

interface ItemProps {
    myItem: ItemsModel,
    onDeletemyItemClicked: (myItem: ItemsModel) => void,
}

const Item = ({ myItem, onDeletemyItemClicked }: ItemProps) => {

  const {
    id,
    title,
    text,
    isEnding,
    created
  } = myItem;

  const formateDate = formatDate(created);

  const [Ending, setEnding] = useState(isEnding);

  async function handleCheckboxChange() {
    try {
        await TodoApi.updateItem(id, { isEnding: !Ending })
    } catch (error) {
        console.error(error);
    }
    setEnding((prevIsEnding) => !prevIsEnding);
  }

  return (
    <div className="block text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div className="flex justify-between">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
            <button
                className=""
                onClick={() => onDeletemyItemClicked(myItem)}
            > 
                X
            </button>
        </div>
        
        <h2 className="text-gray-700">{text}</h2>
        <p>Created: {formateDate}</p>
        <div className="flex justify-between">
            <p>Complete: </p>
            <input type="checkbox" checked={Ending} onChange={handleCheckboxChange} />
        </div>
        
    </div>
  )
}

export default Item;
