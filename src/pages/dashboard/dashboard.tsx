import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Send, Users, Mail, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Contact {
  id: string
  email: string
  company: string
  role: string
  status: 'pending' | 'sent' | 'delivered' | 'failed'
}

const mockContacts: Contact[] = [
  {
    id: '1',
    email: 'john@techcorp.com',
    company: 'TechCorp',
    role: 'CEO',
    status: 'sent',
  },
  {
    id: '2',
    email: 'sarah@startup.io',
    company: 'Startup.io',
    role: 'CTO',
    status: 'delivered',
  },
  {
    id: '3',
    email: 'mike@enterprise.com',
    company: 'Enterprise Co',
    role: 'VP Engineering',
    status: 'pending',
  },
  {
    id: '4',
    email: 'lisa@growth.co',
    company: 'Growth Co',
    role: 'Head of Marketing',
    status: 'failed',
  },
]

const getStatusBadge = (status: Contact['status']) => {
  const variants = {
    pending: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    sent: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    delivered: 'bg-green-100 text-green-700 hover:bg-green-200',
    failed: 'bg-red-100 text-red-700 hover:bg-red-200',
  }

  return (
    <Badge variant='secondary' className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)

  const handleSendEmail = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, status: 'sent' as const } : contact))
    )
    toast('Email sent', {
      description: 'Your personalized email has been sent successfully.',
    })
  }

  const handleSendAll = () => {
    const pendingContacts = contacts.filter((c) => c.status === 'pending')
    setContacts((prev) =>
      prev.map((contact) => (contact.status === 'pending' ? { ...contact, status: 'sent' as const } : contact))
    )
    toast('Bulk send complete', {
      description: `Sent ${pendingContacts.length} personalized emails.`,
    })
  }

  const stats = {
    total: contacts.length,
    sent: contacts.filter((c) => c.status === 'sent' || c.status === 'delivered').length,
    pending: contacts.filter((c) => c.status === 'pending').length,
  }
  return (
    <>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
        </div>
      </header>
      <div className='px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold text-gray-900 mb-2'>Dashboard</h1>
          <p className='text-gray-600'>Manage your outreach campaigns with precision</p>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-xl border border-gray-200/60 hover:shadow-md transition-shadow'>
            <div className='flex items-center'>
              <div className='p-2 bg-gray-100 rounded-lg mr-4'>
                <Users className='w-6 h-6 text-gray-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Total Contacts</p>
                <p className='text-2xl font-semibold text-gray-900'>{stats.total}</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl border border-gray-200/60 hover:shadow-md transition-shadow'>
            <div className='flex items-center'>
              <div className='p-2 bg-green-100 rounded-lg mr-4'>
                <CheckCircle className='w-6 h-6 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Emails Sent</p>
                <p className='text-2xl font-semibold text-gray-900'>{stats.sent}</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl border border-gray-200/60 hover:shadow-md transition-shadow'>
            <div className='flex items-center'>
              <div className='p-2 bg-blue-100 rounded-lg mr-4'>
                <Mail className='w-6 h-6 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-gray-600'>Pending</p>
                <p className='text-2xl font-semibold text-gray-900'>{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-900'>Contacts</h2>
          <Button
            onClick={handleSendAll}
            disabled={stats.pending === 0}
            className='bg-gray-900 hover:bg-gray-800 text-white px-6'>
            <Send className='w-4 h-4 mr-2' />
            Send All ({stats.pending})
          </Button>
        </div>

        {/* Table */}
        <div className='bg-white rounded-xl border border-gray-200/60 overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow className='bg-gray-50/50'>
                <TableHead className='font-semibold text-gray-900'>Email</TableHead>
                <TableHead className='font-semibold text-gray-900'>Company</TableHead>
                <TableHead className='font-semibold text-gray-900'>Role</TableHead>
                <TableHead className='font-semibold text-gray-900'>Status</TableHead>
                <TableHead className='font-semibold text-gray-900'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className='hover:bg-gray-50/50 transition-colors'>
                  <TableCell className='font-medium text-gray-900'>{contact.email}</TableCell>
                  <TableCell className='text-gray-600'>{contact.company}</TableCell>
                  <TableCell className='text-gray-600'>{contact.role}</TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>
                    {contact.status === 'pending' && (
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleSendEmail(contact.id)}
                        className='hover:bg-gray-900 hover:text-white transition-colors'>
                        <Send className='w-3 h-3 mr-1' />
                        Send
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
