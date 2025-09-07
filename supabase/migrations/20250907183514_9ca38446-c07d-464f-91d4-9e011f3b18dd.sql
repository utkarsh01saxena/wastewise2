-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('resident', 'authority');

-- Create societies/communities table
CREATE TABLE public.societies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'resident',
    society_id UUID REFERENCES public.societies(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create households table (for residents)
CREATE TABLE public.households (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    resident_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    society_id UUID NOT NULL REFERENCES public.societies(id) ON DELETE CASCADE,
    flat_number TEXT NOT NULL,
    floor_number INTEGER,
    wing TEXT,
    family_size INTEGER DEFAULT 1,
    compliance_score DECIMAL(5,2) DEFAULT 100.00,
    total_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(society_id, flat_number, wing)
);

-- Create smart bins table
CREATE TABLE public.smart_bins (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    bin_code TEXT NOT NULL UNIQUE,
    society_id UUID NOT NULL REFERENCES public.societies(id) ON DELETE CASCADE,
    location_description TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    last_maintenance TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create waste disposal records table (core IoT data)
CREATE TABLE public.waste_disposal_records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
    bin_id UUID NOT NULL REFERENCES public.smart_bins(id) ON DELETE CASCADE,
    waste_category TEXT NOT NULL CHECK (waste_category IN ('dry', 'wet', 'mixed')),
    classification_result TEXT NOT NULL CHECK (classification_result IN ('correct', 'incorrect')),
    confidence_score DECIMAL(5,4),
    image_url TEXT,
    points_awarded INTEGER DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.societies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_disposal_records ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS user_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = _user_id;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authorities can view all profiles"
ON public.profiles FOR SELECT
USING (public.get_user_role(auth.uid()) = 'authority');

-- RLS Policies for societies
CREATE POLICY "Anyone can view societies"
ON public.societies FOR SELECT
USING (true);

CREATE POLICY "Authorities can manage societies"
ON public.societies FOR ALL
USING (public.get_user_role(auth.uid()) = 'authority');

-- RLS Policies for households
CREATE POLICY "Residents can view their own household"
ON public.households FOR SELECT
USING (resident_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Residents can update their own household"
ON public.households FOR UPDATE
USING (resident_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Authorities can view all households"
ON public.households FOR SELECT
USING (public.get_user_role(auth.uid()) = 'authority');

CREATE POLICY "Authorities can manage households"
ON public.households FOR ALL
USING (public.get_user_role(auth.uid()) = 'authority');

-- RLS Policies for smart bins
CREATE POLICY "Anyone can view smart bins"
ON public.smart_bins FOR SELECT
USING (true);

CREATE POLICY "Authorities can manage smart bins"
ON public.smart_bins FOR ALL
USING (public.get_user_role(auth.uid()) = 'authority');

-- RLS Policies for waste disposal records
CREATE POLICY "Residents can view their own records"
ON public.waste_disposal_records FOR SELECT
USING (household_id IN (
    SELECT id FROM public.households WHERE resident_id = (
        SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
));

CREATE POLICY "Authorities can view all records"
ON public.waste_disposal_records FOR SELECT
USING (public.get_user_role(auth.uid()) = 'authority');

CREATE POLICY "System can insert waste records"
ON public.waste_disposal_records FOR INSERT
WITH CHECK (true);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'resident')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_societies_updated_at
    BEFORE UPDATE ON public.societies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_households_updated_at
    BEFORE UPDATE ON public.households
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_smart_bins_updated_at
    BEFORE UPDATE ON public.smart_bins
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();