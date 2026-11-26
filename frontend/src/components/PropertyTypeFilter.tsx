import React, { useState } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings as cpStrings } from '@/lang/property'
import { strings } from '@/lang/properties'
import Accordion from './Accordion'

import '@/assets/css/property-type-filter.css'

interface PropertyTypeFilterProps {
  className?: string
  onChange?: (values: movininTypes.PropertyType[]) => void
}

const allPropertyTypes = movininHelper.getAllPropertyTypes()

const propertyTypeOptions: { value: movininTypes.PropertyType, label: string }[] = [
  { value: movininTypes.PropertyType.Apartment, label: strings.APARTMENT },
  { value: movininTypes.PropertyType.Commercial, label: strings.COMMERCIAL },
  { value: movininTypes.PropertyType.Farm, label: strings.FARM },
  { value: movininTypes.PropertyType.House, label: strings.HOUSE },
  { value: movininTypes.PropertyType.Hotel, label: strings.HOTEL },
  { value: movininTypes.PropertyType.Industrial, label: strings.INDUSTRIAL },
  { value: movininTypes.PropertyType.Plot, label: strings.PLOT },
  { value: movininTypes.PropertyType.Riad, label: strings.RIAD },
  { value: movininTypes.PropertyType.Townhouse, label: strings.TOWN_HOUSE },
  { value: movininTypes.PropertyType.Villa, label: strings.VILLA },
]

const PropertyTypeFilter = ({
  className,
  onChange
}: PropertyTypeFilterProps) => {
  const [values, setValues] = useState<movininTypes.PropertyType[]>(allPropertyTypes)
  const allChecked = values.length === allPropertyTypes.length

  const publish = (nextValues: movininTypes.PropertyType[]) => {
    setValues(nextValues)
    onChange?.(nextValues.length === 0 ? allPropertyTypes : movininHelper.clone(nextValues))
  }

  const handleToggle = (type: movininTypes.PropertyType, checked: boolean) => {
    const nextValues = checked
      ? [...values, type]
      : values.filter((value) => value !== type)
    publish(nextValues)
  }

  const handleToggleAll = () => {
    publish(allChecked ? [] : allPropertyTypes)
  }

  return (
    <Accordion title={cpStrings.PROPERTY_TYPE} className={`${className ? `${className} ` : ''}property-type-filter`}>
      <div className="filter-elements">
        {propertyTypeOptions.map((option) => (
          <div className="filter-element" key={option.value}>
            <input
              id={`property-type-${option.value.toLowerCase()}`}
              type="checkbox"
              className="property-type-checkbox"
              checked={values.includes(option.value)}
              onChange={(event) => handleToggle(option.value, event.target.checked)}
            />
            <label htmlFor={`property-type-${option.value.toLowerCase()}`}>
              <span>{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="filter-actions">
        <span role="button" tabIndex={0} onClick={handleToggleAll} className="uncheckall">
          {allChecked ? commonStrings.UNCHECK_ALL : commonStrings.CHECK_ALL}
        </span>
      </div>
    </Accordion>
  )
}

export default PropertyTypeFilter
