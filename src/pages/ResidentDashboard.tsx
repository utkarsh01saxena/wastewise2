import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award, Leaf, LogOut, MapPin, Recycle, TrendingUp, Trophy, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ResidentDashboard = () => {
  const { signOut, profile } = useAuth();
  const complianceScore = 92;
  const totalPoints = 2847;
  const monthlyTarget = 3000;
  const currentStreak = 15;

  const recentDisposals = [
    { date: "2024-01-07", type: "Dry", status: "Correct", points: 10 },
    { date: "2024-01-07", type: "Wet", status: "Correct", points: 10 },
    { date: "2024-01-06", type: "Mixed", status: "Incorrect", points: -5 },
    { date: "2024-01-06", type: "Dry", status: "Correct", points: 10 },
    { date: "2024-01-05", type: "Wet", status: "Correct", points: 10 },
  ];

  const achievements = [
    { title: "Eco Warrior", description: "7 days perfect segregation", icon: Trophy, earned: true },
    { title: "Green Champion", description: "1000 points milestone", icon: Award, earned: true },
    { title: "Sustainability Star", description: "30 days streak", icon: Leaf, earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge className="bg-success text-success-foreground text-sm px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Resident Dashboard
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-eco-gradient bg-clip-text text-transparent mb-2">
              WasteWise Dashboard
            </h1>
            <p className="text-muted-foreground">Track your waste segregation journey</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {profile?.full_name}
            </span>
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card border-primary/20 bg-eco-gradient text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{complianceScore}%</div>
              <Progress value={complianceScore} className="mt-2 bg-primary-foreground/20" />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-gamification-gold">
                <Trophy className="w-4 h-4" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gamification-gold">{totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {monthlyTarget - totalPoints} points to monthly goal
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-success">
                <Recycle className="w-4 h-4" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{currentStreak}</div>
              <p className="text-xs text-muted-foreground mt-1">days of correct segregation</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-accent">
                <MapPin className="w-4 h-4" />
                Nearby Bins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">12</div>
              <p className="text-xs text-muted-foreground mt-1">community bins available</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Disposal History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="map">Community Map</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Waste Disposals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDisposals.map((disposal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">{disposal.date}</div>
                      <Badge 
                        variant={disposal.type === "Dry" ? "default" : disposal.type === "Wet" ? "secondary" : "destructive"}
                      >
                        {disposal.type} Waste
                      </Badge>
                      <Badge 
                        variant={disposal.status === "Correct" ? "default" : "destructive"}
                        className={disposal.status === "Correct" ? "bg-success text-success-foreground" : ""}
                      >
                        {disposal.status}
                      </Badge>
                    </div>
                    <div className={`font-semibold ${disposal.points > 0 ? 'text-success' : 'text-destructive'}`}>
                      {disposal.points > 0 ? '+' : ''}{disposal.points} pts
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`shadow-card ${achievement.earned ? 'bg-eco-gradient text-primary-foreground' : 'opacity-60'}`}>
                  <CardHeader className="text-center">
                    <achievement.icon className={`w-12 h-12 mx-auto ${achievement.earned ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className={`text-sm ${achievement.earned ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <Badge className="mt-2 bg-gamification-gold text-white">
                        Earned!
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Community Waste Bins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive map showing nearby smart bins</p>
                    <p className="text-sm text-muted-foreground">Real-time availability and status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResidentDashboard;