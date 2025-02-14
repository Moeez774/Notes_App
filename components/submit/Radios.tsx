'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Details {
    state: {
        name: string,
        uid: string,
        email: string,
        category: string,
        title: string,
        content: string,
        emoji: string
    },
    setState: Dispatch<SetStateAction<Details['state']>>
}

const Radios: React.FC<Details> = ({ state, setState }) => {

    const setValues = (e: string, emoji: string) => setState((prev) => ({...prev, category: e, emoji: emoji}))

    return (
        <div>
            <RadioGroup className='flex justify-between mb-6 mt-3' value={state.category}>

                <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="Important" onClick={(e) => setValues((e.target as HTMLInputElement).value, '🔥')} />
                    <Label >Important &#x1F525;</Label>
                </div>

                <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="Normal" onClick={(e) => setValues((e.target as HTMLInputElement).value, '📝')} />
                    <Label >Normal &#x1F4DD;</Label>
                </div>

                <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="Personal" onClick={(e) => setValues((e.target as HTMLInputElement).value, '🔒')} />
                    <Label >Personal &#x1F512;</Label>
                </div>

                <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="Work" onClick={(e) => setValues((e.target as HTMLInputElement).value, '📚')} />
                    <Label >Work &#x1F4DA;</Label>
                </div>

                <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="Idea" id="option-two" onClick={(e) => setValues((e.target as HTMLInputElement).value, '💡')} />
                    <Label htmlFor="option-two">Idea &#x1F4A1;</Label>
                </div>
            </RadioGroup>
        </div>
    )
}

export default Radios
