-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    rating numeric(3,2) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review text NOT NULL,
    avatar text,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid errors
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Anyone can insert testimonials" ON public.testimonials;
    DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
END $$;

-- Allow anyone to view testimonials
CREATE POLICY "Anyone can view testimonials"
  ON public.testimonials
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert testimonials
CREATE POLICY "Anyone can insert testimonials"
  ON public.testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admins to manage testimonials
CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Update gallery table
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS category text DEFAULT 'All';

-- Enable RLS on gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can view gallery" ON public.gallery;
    DROP POLICY IF EXISTS "Admins can manage gallery" ON public.gallery;
END $$;

-- Allow anyone to view gallery
CREATE POLICY "Anyone can view gallery"
  ON public.gallery
  FOR SELECT
  TO public
  USING (true);

-- Allow admins to manage gallery
CREATE POLICY "Admins can manage gallery"
  ON public.gallery
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
-- Add display_order to gallery
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Table to store overrides for local assets (caption, category, order, hidden status)
CREATE TABLE IF NOT EXISTS public.asset_overrides (
  asset_id text PRIMARY KEY,
  caption text,
  category text,
  display_order integer DEFAULT 0,
  is_hidden boolean DEFAULT false,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.asset_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view asset overrides"
  ON public.asset_overrides FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage asset overrides"
  ON public.asset_overrides FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  review text NOT NULL,
  rating numeric NOT NULL DEFAULT 5,
  avatar text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON public.testimonials FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert testimonials"
  ON public.testimonials FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Drop the old hidden_assets table as it's now merged into asset_overrides
DROP TABLE IF EXISTS public.hidden_assets;
