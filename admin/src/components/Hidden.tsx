import React from 'react'
import { VisibilityOff as HiddenIcon } from '@mui/icons-material'
import { strings } from '@/lang/hidden'

import '@/assets/css/hidden.css'

interface HiddenProps {
  className?: string
  label?: string
  title?: string
}

const Hidden = ({ className, label, title }: HiddenProps) => (
  <div className={`label hidden${className ? ` ${className}` : ''}`} title={title || strings.HIDDEN_INFO}>
    <HiddenIcon className="label-icon" />
    <span>
      {' '}
      {label || strings.HIDDEN}
      {' '}
    </span>
  </div>
)

export default Hidden
