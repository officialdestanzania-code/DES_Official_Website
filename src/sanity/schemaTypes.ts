import { defineField, defineType } from 'sanity'

const slugField = defineField({
  name: 'slug',
  title: 'Profile URL slug',
  type: 'slug',
  options: { source: 'name', maxLength: 80 },
  validation: (Rule) => Rule.required(),
})

const sourceObject = defineType({
  name: 'partnerSource',
  title: 'External source',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Link label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
  ],
})

const galleryImage = defineType({
  name: 'partnerGalleryImage',
  title: 'Gallery image',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'permissionConfirmed', title: 'Permission for public display confirmed', type: 'boolean', initialValue: false, validation: (Rule) => Rule.required() }),
  ],
})

const partnerGroup = defineType({
  name: 'partnerGroup',
  title: 'Partner group',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Group name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'displayOrder', title: 'Display order', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

const partner = defineType({
  name: 'partner',
  title: 'Partner / Supporter',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full name or organisation name', type: 'string', validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: 'group', title: 'Partner group', type: 'reference', to: [{ type: 'partnerGroup' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Role / category', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', title: 'Location / affiliation label', type: 'string' }),
    defineField({ name: 'summary', title: 'Short public description', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role in the Butimba project', type: 'text', rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: 'statusNote', title: 'Public status note (optional)', type: 'text', rows: 3, description: 'Use for transparent notes about incomplete or paused initiatives.' }),
    defineField({ name: 'affiliation', title: 'Works under / affiliated with', type: 'reference', to: [{ type: 'partner' }], description: 'Use this for people working under a partner organisation, such as Thomas Barcatta under Mwanza e.V.' }),
    defineField({ name: 'sources', title: 'External project references', type: 'array', of: [{ type: 'partnerSource' }] }),
    defineField({ name: 'gallery', title: 'Profile photo gallery', type: 'array', of: [{ type: 'partnerGalleryImage' }] }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'logo' } },
})

const contribution = defineType({
  name: 'contribution',
  title: 'Contribution / Project Record',
  type: 'document',
  fields: [
    defineField({ name: 'partner', title: 'Contributor', type: 'reference', to: [{ type: 'partner' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', title: 'Contribution title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (Rule) => Rule.required().min(1950).max(2100) }),
    defineField({ name: 'contributionType', title: 'Contribution type', type: 'string', options: { list: [
      { title: 'Equipment / materials', value: 'equipment' },
      { title: 'Infrastructure / construction', value: 'infrastructure' },
      { title: 'Connectivity / internet', value: 'connectivity' },
      { title: 'Education / training', value: 'education' },
      { title: 'Coordination / professional support', value: 'coordination' },
      { title: 'Wellbeing / student support', value: 'wellbeing' },
      { title: 'Other', value: 'other' },
    ] }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'quantity', title: 'Quantity (optional)', type: 'string', description: 'Example: 15 chairs, 1 photocopy machine, or a monthly Wi-Fi service.' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [
      { title: 'Completed', value: 'completed' },
      { title: 'Ongoing', value: 'ongoing' },
      { title: 'Paused / incomplete', value: 'paused' },
      { title: 'Coordination / ongoing support', value: 'coordination' },
    ] }, initialValue: 'completed', validation: (Rule) => Rule.required() }),
    defineField({ name: 'gallery', title: 'Contribution photographs', type: 'array', of: [{ type: 'partnerGalleryImage' }] }),
    defineField({ name: 'sources', title: 'External references', type: 'array', of: [{ type: 'partnerSource' }] }),
  ],
  orderings: [{ title: 'Newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'year', media: 'gallery.0.image' } },
})

export const partnerSchemaTypes = [partnerGroup, partner, contribution, sourceObject, galleryImage]
