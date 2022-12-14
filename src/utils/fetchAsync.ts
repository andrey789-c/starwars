import axios from "axios"
import { IPersonParams, IPersons } from "../data/IPersonParams";

export const fetchAsync = async(url: string) => {
    const res = await axios.get<IPersons>(url)
    return res.data
}