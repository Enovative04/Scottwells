
export type Category = 'All' | 'Laptops' | 'Computers' | 'Printers' | 'Appliances' | 'Furniture' | 'Cars' | 'Electronics';

export interface Product {
  id: string;
  name: string;
  price: number;
  tags: Category[];
  description: string;
  image_url: string;
  gallery?: string[]; // Supporting multiple images
  status: 'Available' | 'Sold';
  created_at?: string;
}
