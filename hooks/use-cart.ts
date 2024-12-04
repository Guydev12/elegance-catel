import { create} from"zustand"
import {persist, createJSONStorage}from"zustand/middleware"
import { ProductDto } from "@/types"
import toast from "react-hot-toast";

//the cart interface
interface CartStore {
    items:ProductDto[];
    addItem: (data:ProductDto)=>void;
    removeItem:(id:string)=>void;
    removeAll:()=>void;
}


export const useCart = create(
    persist<CartStore>((set,get)=>({
      items:[],
      addItem:(data:ProductDto)=>{
            const currentItems = get().items;
            const existingItems =currentItems.find((item)=>item.id===data.id)
            if(existingItems){
                return toast("Vous Avez Deja ce produit dans votre panier.")
            }
            set({items:[...get().items, data]})
            toast.success("Ajoute au panier.")
        },
        removeItem:(id:string)=>{
            set({items:[...get().items.filter((item)=>item.id !== id)
                         ]})
 toast.success("Prodruit Supprimer du panier.")

        },
        removeAll:()=>set({items:[]})
    }),{
            name:"cart-storage",
            storage: createJSONStorage(()=> localStorage)
        })
)
