const PROJECT_ID = '<PROJECT_ID>';
const DATASET = 'production';

let sanityClient;

if (PROJECT_ID && PROJECT_ID !== '<PROJECT_ID>') {
  sanityClient = window.SanityClient.createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    useCdn: true,
    apiVersion: '2023-01-01',
  });
}

/**
 * Fetch all menu items from Sanity, or fallback to local MENU_DATA if not configured.
 */
async function fetchMenuItems() {
  if (sanityClient) {
    try {
      const query = `*[_type == "menuItem"] | order(category asc, name asc) {
        _id,
        name,
        category,
        description,
        price,
        featured,
        dietary,
        "imageUrl": image.asset->url
      }`;
      const data = await sanityClient.fetch(query);
      return data;
    } catch (err) {
      console.error('Failed to fetch from Sanity:', err);
      console.log('Falling back to local data...');
      return window.MENU_DATA || [];
    }
  } else {
    console.log('Sanity project not configured yet. Using local extracted data.');
    return window.MENU_DATA || [];
  }
}
