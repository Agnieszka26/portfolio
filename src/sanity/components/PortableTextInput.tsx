'use client'

import {useCallback} from 'react'
import {isKeySegment, type ArrayOfObjectsInputProps, type Path} from 'sanity'

/**
 * Editing a field that belongs to a block (a code block's code, a link's URL)
 * makes the Portable Text editor re-emit its selection in that block. Sanity
 * reports it as focus on the block or its text, which moves the open path away
 * from the field and closes the dialog or popover after the first keystroke.
 * Ignore those reports while focus is in such a field of the same block;
 * explicit close actions use `onPathOpen` and are not affected.
 */
export function PortableTextInput(props: ArrayOfObjectsInputProps) {
  const {focusPath, onPathFocus} = props

  const handlePathFocus = useCallback<ArrayOfObjectsInputProps['onPathFocus']>(
    (path: Path, payload) => {
      const [block] = path
      const [focusedBlock] = focusPath
      const isEditorSelection = path.length === 1 || path[1] === 'children'
      const isFocusInBlockField = focusPath.length > 1 && focusPath[1] !== 'children'
      const isSelectionEchoForFocusedField =
        isEditorSelection &&
        isFocusInBlockField &&
        isKeySegment(block) &&
        isKeySegment(focusedBlock) &&
        block._key === focusedBlock._key

      if (isSelectionEchoForFocusedField) return
      onPathFocus(path, payload)
    },
    [focusPath, onPathFocus],
  )

  return props.renderDefault({...props, onPathFocus: handlePathFocus})
}
