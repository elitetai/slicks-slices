import React from 'react';
import S from '@sanity/desk-tool/structure-builder'; // Internal sanity studio's input (need to declare it at `sanity.json` file under `parts`)

// build a custom sidebar (remember to re-deploy production once complete)
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID, so that we won't have a random string of numbers
            .documentId('downtown')
        ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
