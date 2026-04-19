-- Drop existing admin-only policies
DROP POLICY IF EXISTS "Admins can insert photos" ON public.photos;
DROP POLICY IF EXISTS "Admins can delete photos" ON public.photos;

-- Allow anyone to insert/delete photos (password protection happens in frontend)
CREATE POLICY "Anyone can insert photos"
ON public.photos FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can delete photos"
ON public.photos FOR DELETE
TO anon, authenticated
USING (true);

-- Make uploaded_by nullable since we won't have auth users
ALTER TABLE public.photos ALTER COLUMN uploaded_by DROP NOT NULL;

-- Storage policies for gallery bucket
DROP POLICY IF EXISTS "Admins can upload to gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete from gallery" ON storage.objects;

CREATE POLICY "Anyone can upload to gallery"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Anyone can delete from gallery"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'gallery');