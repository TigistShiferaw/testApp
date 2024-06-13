import { Restaurant, IRestaurant } from '../models/Restaurant';

export async function fuzzySearchRestaurants(query: string): Promise<IRestaurant[]> {
  try {
    return await Restaurant.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { cuisine: { $regex: new RegExp(query, 'i') } },
        { 'address.street': { $regex: new RegExp(query, 'i') } },
      ]
    }).lean().exec();
  } catch (error) {
    throw new Error('Error fetching restaurants');
  }
}
