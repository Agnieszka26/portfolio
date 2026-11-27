'use client'

import {type ArrayOfPrimitivesInputProps} from 'sanity'
import {styled} from 'styled-components'

/**
 * Sanity sizes the tag text field from `scrollWidth`, which some browsers
 * measure without the field's padding, so the first characters get scrolled
 * out of view while typing. With `content-box` the padding is added on top of
 * the measured width (same idea as the upstream fix in Sanity v5.17).
 */
const Root = styled.div`
  [data-ui='TagInput'] input {
    box-sizing: content-box;
  }
`

export function TagsInput(props: ArrayOfPrimitivesInputProps) {
  return <Root>{props.renderDefault(props)}</Root>
}
