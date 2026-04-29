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
-- Table to track hidden local assets
CREATE TABLE IF NOT EXISTS public.hidden_assets (
  asset_id text PRIMARY KEY,
  hidden_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.hidden_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hidden assets"
  ON public.hidden_assets FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage hidden assets"
  ON public.hidden_assets FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
