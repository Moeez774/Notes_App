import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Details {
    state: {
        name: string,
        uid: string,
        email: string,
        category: string,
        title: string,
        content: string,
        emoji: string,
    },
    setState: Dispatch<SetStateAction<Details['state']>>
}


const Selects: React.FC<Details> = ({ state, setState }) => {

    const all = [{ categ: 'Important', emoji: '🔥' }, { categ: 'Normal', emoji: '📝' }, { categ: 'Personal', emoji: '🔒' }, { categ: 'Work', emoji: '📚' }, { categ: 'Idea', emoji: '💡' }]

    const setValues = (categ: string, emoji: string) => setState((prev) => ({...prev, category: categ, emoji: emoji}))

    return (
        <div>
            <Select>
                <SelectTrigger className="w-[180px] my-6">
                    <SelectValue placeholder="Category ✍️" className='block text-gray-700 text-sm font-bold mb-2' />
                </SelectTrigger>
                <SelectContent>
                    {all.map((e, index) => {
                        return (
                            <SelectItem className='flex gap-1' key={index} value={e.categ} onClick={() => setValues(e.categ, e.emoji)}>
                                <h1>{e.categ} {e.emoji}</h1>
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default Selects
