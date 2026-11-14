import { Input, InputGroup } from '@chakra-ui/react'

export default function SearchBar({ value, onChange, placeholder = 'Search recipes...' }) {
  return (
    <InputGroup>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </InputGroup>
  )
}