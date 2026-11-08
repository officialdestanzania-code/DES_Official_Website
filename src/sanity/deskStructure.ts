import type { StructureResolver } from 'sanity/structure'

/**
 * Organises the editor workspace around the two main content responsibilities:
 * Butimba project records and DES editorial news.
 *
 * All document types are listed explicitly so Sanity does not add duplicate
 * top-level entries to the custom Structure navigation.
 */
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('DES Content')
    .items([
      S.listItem()
        .title('Butimba Project')
        .child(
          S.list()
            .title('Butimba Project')
            .items([
              S.documentTypeListItem('partnerGroup').title('Partner groups'),
              S.documentTypeListItem('partner').title('Partners & supporters'),
              S.documentTypeListItem('contribution').title('Contributions & project records'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('newsArticle').title('News & updates'),
    ])
