-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer' CHECK (role IN ('customer', 'admin'));

-- Update existing profiles to have customer role by default
UPDATE public.profiles 
SET role = 'customer' 
WHERE role IS NULL;

-- Create index for role column for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Update RLS policies to allow admins to read all profiles
CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Drop the old select policy and replace it
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
