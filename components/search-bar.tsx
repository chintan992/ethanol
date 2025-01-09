'use client'

import { useState, ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        type="search"
        placeholder="Search anime..."
        value={query}
        onChange={handleChange}
        className="w-full"
      />
    </form>
  )
}
