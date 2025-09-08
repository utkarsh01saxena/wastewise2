import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Leaf, Recycle, Shield, Users, Zap, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      // Redirect authenticated users to their appropriate dashboard
      if (profile.role === 'resident') {
        navigate('/resident');
      } else if (profile.role === 'authority') {
        navigate('/authority');
      }
    }
  }, [user, profile, navigate]);

  const handleSignOut = async () => {
    await signOut();
  };
  const features = [
    {
      icon: Recycle,
      title: "Smart Waste Classification",
      description: "AI-powered waste classification with real-time compliance detection"
    },
    {
      icon: Zap,
      title: "IoT Integration",
      description: "Connected smart bins with automated waste classification and real-time feedback"
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Gamified system with points, achievements, and leaderboards"
    },
    {
      icon: Building2,
      title: "Authority Dashboard",
      description: "Comprehensive monitoring and reporting for city officials"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">WasteWise</span>
          </div>
          <div className="flex gap-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground flex items-center">
                  Welcome, {profile?.full_name || user.email}
                </span>
                <Button variant="outline" onClick={handleSignOut} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="gap-2">
                    <Users className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <Badge className="bg-eco-gradient text-primary-foreground mb-4">
              Smart City Initiative
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold bg-eco-gradient bg-clip-text text-transparent mb-6">
              WasteWise
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Revolutionizing urban waste management through AI-powered smart bins with 
              automated waste classification and real-time feedback and compliance reporting
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {user ? (
              // Show dashboard buttons for authenticated users
              <>
                <Link to="/resident">
                  <Button size="lg" className="bg-eco-gradient hover:shadow-glow transition-all duration-300 min-w-48">
                    <Users className="w-5 h-5 mr-2" />
                    Resident Dashboard
                  </Button>
                </Link>
                <Link to="/authority">
                  <Button size="lg" variant="outline" className="min-w-48 border-primary hover:bg-primary/10">
                    <Shield className="w-5 h-5 mr-2" />
                    Authority Portal
                  </Button>
                </Link>
              </>
            ) : (
              // Show auth buttons for non-authenticated users
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-eco-gradient hover:shadow-glow transition-all duration-300 min-w-48">
                    <Users className="w-5 h-5 mr-2" />
                    Get Started
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="min-w-48 border-primary hover:bg-primary/10">
                    <Shield className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">92%</div>
              <div className="text-muted-foreground">Average Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">2.4T</div>
              <div className="text-muted-foreground">Waste Processed Daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">1,200+</div>
              <div className="text-muted-foreground">Active Households</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Smart Waste Management Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive ecosystem for sustainable waste classification and monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-eco-gradient rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-r from-secondary/50 to-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How WasteWise Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three-tier architecture ensuring seamless waste management
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="shadow-card bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-nature-gradient rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
                <CardTitle>Smart Bin Perception</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Physical smart bins with cameras, sensors, and AI-powered classification 
                  automatically classify waste into dry and wet waste categories.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-nature-gradient rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">2</span>
                </div>
                <CardTitle>Cloud Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time data processing through IoT Hub, updating compliance scores, 
                  reward points, and generating insights for authorities.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-nature-gradient rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">3</span>
                </div>
                <CardTitle>User Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Personalized interfaces for residents to track progress and gamified 
                  rewards, plus comprehensive monitoring tools for city authorities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">WasteWise</span>
          </div>
          <p className="text-muted-foreground">
            Contributing to Swachh Bharat Mission Urban 2.0 through smart technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
