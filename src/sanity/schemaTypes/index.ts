import {type SchemaTypeDefinition} from 'sanity'

import project from './project'
import post from './post'
import {markdownContent} from './objects/markdownContent'
import {portableText} from './objects/portableText'
import {seo} from './objects/seo'

export const schemaTypes: SchemaTypeDefinition[] = [
  markdownContent,
  portableText,
  seo,
  project,
  post,
]

export const schema: {types: SchemaTypeDefinition[]} = {
  types: schemaTypes,
}
