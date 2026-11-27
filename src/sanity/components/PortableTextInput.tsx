'use client'

import {useCallback} from 'react'
import {isKeySegment, type ArrayOfObjectsInputProps, type Path} from 'sanity'

/**
 * Editing a field inside a block object (e.g. a code block's code) makes the
 * Portable Text editor re-emit its selection on that block. Sanity reports it
 * as focus on the block itself, which moves the open path up to the array and
 * closes the edit dialog after the first keystroke. Ignore that report while
 * focus is already inside the same block; explicit close actions use
 * `onPathOpen` and are not affected.
 */
export function PortableTextInput(props: ArrayOfObjectsInputProps) {
  const {focusPath, onPathFocus} = props

  const handlePathFocus = useCallback<ArrayOfObjectsInputProps['onPathFocus']>(
    (path: Path, payload) => {
      const [block] = path
      const [focusedBlock] = focusPath
      const isSelectionEchoForFocusedBlock =
        path.length === 1 &&
        focusPath.length > 1 &&
        isKeySegment(block) &&
        isKeySegment(focusedBlock) &&
        block._key === focusedBlock._key

      if (isSelectionEchoForFocusedBlock) return
      onPathFocus(path, payload)
    },
    [focusPath, onPathFocus],
  )

  return props.renderDefault({...props, onPathFocus: handlePathFocus})
}
