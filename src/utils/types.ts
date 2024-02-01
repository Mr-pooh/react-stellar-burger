export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  id?: string;
  key?: string;
  index?: number;
};

export type TOrder = {
  _id: string;
  ingredients: TIngredient[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrders = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  user?: string;
  accessToken: string;
  refreshToken: string;
};

export type TDeteils = {
  order: TOrder;
};

export type TUseForm = {
  [key: string]: string;
};
