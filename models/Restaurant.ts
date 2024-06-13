import mongoose, { Schema, Document, model } from 'mongoose';

interface IGrade {
  date: Date;
  grade: string;
  score: number;
}

interface IAddress {
  building: string;
  street: string;
}

export interface IRestaurant extends Document {
  address: IAddress;
  cuisine: string;
  grades: IGrade[];
  name: string;
  restaurant_id: string;
}

const gradeSchema = new Schema<IGrade>({
  date: { type: Date, required: true },
  grade: { type: String, required: true },
  score: { type: Number, required: true }
});

const addressSchema = new Schema<IAddress>({
  building: { type: String, required: true },
  street: { type: String, required: true }
});

const restaurantSchema = new Schema<IRestaurant>({
  address: addressSchema,
  cuisine: { type: String, required: true },
  grades: [gradeSchema],
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true }
});

export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);
