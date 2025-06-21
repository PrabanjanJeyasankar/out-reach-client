import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface AttachmentToggleProps {
  enabled: boolean
  onToggle: (val: boolean) => void
}

export function AttachmentToggle({ enabled, onToggle }: AttachmentToggleProps) {
  return (
    <div className='flex items-center space-x-2'>
      <Switch checked={enabled} onCheckedChange={onToggle} />
      <Label>Enable Attachments</Label>
    </div>
  )
}
