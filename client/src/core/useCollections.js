import { useQuery } from 'react-query';
import { getUserCollections } from '../api/collectionApi/userCollections';

export const useCollections = () => {
  return useQuery('/getCollections', async () => {
    const collections = await getUserCollections();
    return collections;
  });
};