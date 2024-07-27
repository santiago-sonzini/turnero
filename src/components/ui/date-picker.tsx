"use client"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"
import { format } from "util"
import { SelectSingleEventHandler } from "react-day-picker"
import React from "react"

export function DatePicker({ selected, onSelect, notFromToday, disabled }: any) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  
    const handleOnSelect: SelectSingleEventHandler = (date) => {
      onSelect?.(date)
      setIsPopoverOpen(false)
    }
    function renderSelected(selected: any) {

      if (selected) {
        let currentDate = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);


        if (selected.getDate() == currentDate.getDate()) {
          return <span>Hoy</span>
        } 
        if (selected.getDate() == tomorrow.getDate()) {
          return <span>Mañana</span>
        }
        return selected.toLocaleDateString()
      } else{
        return <span>Pick a date</span>
      }
      
    }
    const selectedRender = renderSelected(selected)
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'default'}
            className={cn('w-full  justify-center text-left font-normal ', !selected && 'text-muted-foreground')}

          >
            <CalendarIcon className="mr-2 h-4 w-4 " />
            {selectedRender}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar disabled={disabled} className="" fromDate={!notFromToday ? new Date() :  undefined}   mode="single" selected={selected} onSelect={handleOnSelect}  />
        </PopoverContent>
      </Popover>
    )
  }