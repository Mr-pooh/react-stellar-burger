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
  readonly _id: string;
  readonly ingredients: TIngredient[];
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
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
