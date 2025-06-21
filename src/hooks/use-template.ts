/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

export function useTemplate() {
  const [templates, setTemplates] = useState([])

  const addTemplate = (template: any) => {
    setTemplates((prev) => [...prev, template])
  }

  return { templates, addTemplate }
}
