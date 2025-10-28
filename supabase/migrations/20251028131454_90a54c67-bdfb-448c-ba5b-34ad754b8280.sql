-- Create menu table
CREATE TABLE public.menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  is_veg boolean DEFAULT true,
  is_spicy boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create subscribers table
CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu (public read, admin write)
CREATE POLICY "Anyone can view menu"
  ON public.menu FOR SELECT
  USING (true);

-- RLS Policies for bookings (anyone can insert, admin can view)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- RLS Policies for contact_messages (anyone can insert, admin can view)
CREATE POLICY "Anyone can send contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- RLS Policies for subscribers (anyone can insert)
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  WITH CHECK (true);

-- RLS Policies for gallery (public read, admin write)
CREATE POLICY "Anyone can view gallery"
  ON public.gallery FOR SELECT
  USING (true);

-- Insert sample menu items
INSERT INTO public.menu (name, description, price, category, image_url, is_veg, is_spicy) VALUES
('Classic Cappuccino', 'Rich espresso with steamed milk foam', 120, 'Coffee & Beverages', '/placeholder.svg', true, false),
('Masala Chai', 'Traditional Indian spiced tea', 80, 'Coffee & Beverages', '/placeholder.svg', true, true),
('Cold Brew Coffee', 'Smooth cold-brewed coffee', 150, 'Coffee & Beverages', '/placeholder.svg', true, false),
('Croissant', 'Buttery, flaky French pastry', 100, 'Bakery & Desserts', '/placeholder.svg', true, false),
('Gulab Jamun', 'Sweet milk-solid dumplings in rose syrup', 90, 'Bakery & Desserts', '/placeholder.svg', true, false),
('Chocolate Brownie', 'Rich, fudgy chocolate brownie', 110, 'Bakery & Desserts', '/placeholder.svg', true, false),
('Paneer Butter Masala', 'Creamy tomato curry with cottage cheese', 220, 'Indian Specials', '/placeholder.svg', true, true),
('Masala Dosa', 'Crispy rice crepe with spiced potato filling', 150, 'Indian Specials', '/placeholder.svg', true, true),
('Veg Biryani', 'Fragrant basmati rice with mixed vegetables', 180, 'Indian Specials', '/placeholder.svg', true, true),
('Samosa (2 pcs)', 'Crispy pastry filled with spiced potatoes', 60, 'Indian Specials', '/placeholder.svg', true, true),
('Green Smoothie', 'Spinach, banana, and mango blend', 130, 'Healthy Options', '/placeholder.svg', true, false),
('Berry Blast Smoothie', 'Mixed berries with yogurt', 140, 'Healthy Options', '/placeholder.svg', true, false);

-- Insert sample gallery images
INSERT INTO public.gallery (image_url, caption) VALUES
('/placeholder.svg', 'Our cozy café interior'),
('/placeholder.svg', 'Fresh coffee being brewed'),
('/placeholder.svg', 'Delicious homemade pastries'),
('/placeholder.svg', 'Authentic Indian dishes');
