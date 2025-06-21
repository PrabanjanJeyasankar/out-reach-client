import { create } from 'zustand'

interface Template {
  id: string
  name: string
  subject: string
  html: string
  attachmentsEnabled: boolean
}

interface TemplateState {
  name: string
  subject: string
  html: string
  attachmentsEnabled: boolean
  currentId: string | null
  templates: Template[]

  setName: (name: string) => void
  setSubject: (subject: string) => void
  setHtml: (html: string) => void
  toggleAttachments: () => void

  addTemplate: (template: Template) => void
  updateTemplate: (id: string, data: Partial<Template>) => void
  deleteTemplate: (id: string) => void
  loadTemplate: (id: string) => void
  reset: () => void
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  name: '',
  subject: '',
  html: '',
  attachmentsEnabled: false,
  currentId: null,
  templates: [],

  setName: (name) => set({ name }),
  setSubject: (subject) => set({ subject }),
  setHtml: (html) => set({ html }),
  toggleAttachments: () => set((s) => ({ attachmentsEnabled: !s.attachmentsEnabled })),

  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
      currentId: template.id,
    })),

  updateTemplate: (id, data) =>
    set((state) => ({
      templates: state.templates.map((t) => (t.id === id ? { ...t, ...data } : t)),
    })),

  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== id),
      currentId: state.currentId === id ? null : state.currentId,
    })),

  loadTemplate: (id) => {
    const template = get().templates.find((t) => t.id === id)
    if (template) {
      set({
        name: template.name,
        subject: template.subject,
        html: template.html,
        attachmentsEnabled: template.attachmentsEnabled,
        currentId: template.id,
      })
    }
  },

  reset: () =>
    set({
      name: '',
      subject: '',
      html: '',
      attachmentsEnabled: false,
      currentId: null,
    }),
}))
