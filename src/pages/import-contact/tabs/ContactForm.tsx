'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Trash2, Plus, Building2 } from 'lucide-react'

type Employee = {
  first_name: string
  last_name: string
  email: string
  position: string
}

type Company = {
  company: string
  applyFor: string
  employees: Employee[]
}

export default function ContactForm() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      company: '',
      applyFor: '',
      employees: [
        {
          first_name: '',
          last_name: '',
          email: '',
          position: '',
        },
      ],
    },
  ])

  const updateCompanyField = (companyIndex: number, field: keyof Company, value: string) => {
    const updated = [...companies]
    updated[companyIndex][field] = value
    setCompanies(updated)
  }

  const updateEmployeeField = (companyIndex: number, employeeIndex: number, field: keyof Employee, value: string) => {
    const updated = [...companies]
    updated[companyIndex].employees[employeeIndex][field] = value
    setCompanies(updated)
  }

  const addEmployee = (companyIndex: number) => {
    const updated = [...companies]
    updated[companyIndex].employees.push({
      first_name: '',
      last_name: '',
      email: '',
      position: '',
    })
    setCompanies(updated)
  }

  const removeEmployee = (companyIndex: number, employeeIndex: number) => {
    const updated = [...companies]
    updated[companyIndex].employees.splice(employeeIndex, 1)
    setCompanies(updated)
  }

  const addCompany = () => {
    setCompanies([
      ...companies,
      {
        company: '',
        applyFor: '',
        employees: [
          {
            first_name: '',
            last_name: '',
            email: '',
            position: '',
          },
        ],
      },
    ])
  }

  const handleSubmit = () => {
    console.log(companies)
    // TODO: send to backend
  }

  return (
    <div className='space-y-8'>
      {companies.map((comp, cIndex) => (
        <Card key={cIndex}>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Building2 className='h-4 w-4 text-muted-foreground' />
              Company
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Company Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor={`company-${cIndex}`}>Company</Label>
                <Input
                  id={`company-${cIndex}`}
                  placeholder='e.g. Acme Corp'
                  value={comp.company}
                  onChange={(e) => updateCompanyField(cIndex, 'company', e.target.value)}
                />
              </div>

              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor={`applyFor-${cIndex}`}>Applying For</Label>
                <Input
                  id={`applyFor-${cIndex}`}
                  placeholder='e.g. Product Designer'
                  value={comp.applyFor}
                  onChange={(e) => updateCompanyField(cIndex, 'applyFor', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className='text-base font-semibold'>Employees</Label>
            </div>

            {comp.employees.map((emp, eIndex) => (
              <Card key={eIndex} className='!shadow-none !border-none !p-0'>
                <CardContent className='!p-0 grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <Input
                    placeholder='First Name'
                    value={emp.first_name}
                    onChange={(e) => updateEmployeeField(cIndex, eIndex, 'first_name', e.target.value)}
                  />
                  <Input
                    placeholder='Last Name'
                    value={emp.last_name}
                    onChange={(e) => updateEmployeeField(cIndex, eIndex, 'last_name', e.target.value)}
                  />
                  <Input
                    placeholder='Email (e.g. jane@company.com)'
                    value={emp.email}
                    onChange={(e) => updateEmployeeField(cIndex, eIndex, 'email', e.target.value)}
                  />
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Position (e.g. CTO)'
                      value={emp.position}
                      onChange={(e) => updateEmployeeField(cIndex, eIndex, 'position', e.target.value)}
                    />
                    {comp.employees.length > 1 && (
                      <Button
                        type='button'
                        size='icon'
                        variant='ghost'
                        onClick={() => removeEmployee(cIndex, eIndex)}
                        className='text-destructive hover:bg-destructive/10'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant='outline' onClick={() => addEmployee(cIndex)} className='w-full gap-2'>
              <Plus className='h-4 w-4' />
              Add Another Employee
            </Button>
          </CardContent>
        </Card>
      ))}

      <div className='flex flex-col gap-4'>
        <Button variant='secondary' onClick={addCompany} className='w-full gap-2'>
          <Plus className='h-4 w-4' />
          Add Another Company
        </Button>

        <Button onClick={handleSubmit} className='ml-auto'>
          Submit
        </Button>
      </div>
    </div>
  )
}
