import { useQuery } from 'react-query';
import { getCollections } from '../api/collectionApi/collections';

export const useCollections = () => {
  return useQuery('/getCollections', async () => {
    const collections = await getCollections();
    return collections;
  });
};