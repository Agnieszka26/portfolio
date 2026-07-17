import {type SchemaTypeDefinition} from 'sanity'

import project from './project'
import {markdownContent} from './objects/markdownContent'

export const schemaTypes = [markdownContent, project]

export const schema: {types: SchemaTypeDefinition[]} = {
  types: schemaTypes,
}
