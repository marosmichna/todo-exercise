import { ItemsInput } from "../../network/todo_api";
import TextInputField from "../Form/TextInputFiled";
import { useForm } from 'react-hook-form';
import * as TodoApi from "../../network/todo_api";
import { Items } from "../../models/items";

interface CreateItemsProps {
    onItemSaved: (tennisTeam: Items) => void,
}

const CreateItems = ({ onItemSaved }: CreateItemsProps) => {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<ItemsInput>({});

    async function onSubmit(input: ItemsInput) {
        try {
            const inputeResponse = await TodoApi.createItems(input);
            onItemSaved(inputeResponse);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div>
      <form id="createItemForm" onSubmit={handleSubmit(onSubmit)}>
        <TextInputField 
            name="title"
            label="Title"
            type = "text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
        />
        <TextInputField 
            name="text"
            label="Text"
            type = "text"
            placeholder="Text"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.text}
        />
      </form>
      <button 
        type="submit"
        form="createItemForm"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm mt-2"
      >
        Save
      </button>  
    </div>
  )
}

export default CreateItems
