import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award, Leaf, LogOut, MapPin, Recycle, TrendingUp, Trophy, Users, Gift, Star, CreditCard, Zap, Lightbulb, Truck } from "lucide-react";
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">Disposal History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Points & Rewards</TabsTrigger>
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

          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="shadow-card border-warning/20 bg-warning/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-warning">
                    <Star className="w-4 h-4" />
                    Available Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">2,450</div>
                  <p className="text-xs text-muted-foreground mt-1">ready to redeem</p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-success/20 bg-success/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-success">
                    <Gift className="w-4 h-4" />
                    Rewards Redeemed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">7</div>
                  <p className="text-xs text-muted-foreground mt-1">this month</p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-accent/20 bg-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-accent">
                    <CreditCard className="w-4 h-4" />
                    Total Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">₹1,250</div>
                  <p className="text-xs text-muted-foreground mt-1">through rewards</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Available Rewards
                </CardTitle>
                <p className="text-sm text-muted-foreground">Redeem your points for exciting rewards and discounts</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Metro Card Recharge</h3>
                          <p className="text-xs text-muted-foreground">₹200 balance</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-warning">500 points</Badge>
                        <Button size="sm" variant="outline">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Electricity Bill Discount</h3>
                          <p className="text-xs text-muted-foreground">10% off next bill</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-warning">750 points</Badge>
                        <Button size="sm" variant="outline">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Gas Bill Discount</h3>
                          <p className="text-xs text-muted-foreground">15% off cylinder</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-warning">600 points</Badge>
                        <Button size="sm" variant="outline">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Gift className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Shopping Voucher</h3>
                          <p className="text-xs text-muted-foreground">₹500 e-commerce</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-warning">1000 points</Badge>
                        <Button size="sm" variant="outline">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Grocery Delivery</h3>
                          <p className="text-xs text-muted-foreground">Free delivery coupon</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-warning">300 points</Badge>
                        <Button size="sm" variant="outline">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Cashback Reward</h3>
                          <p className="text-xs text-muted-foreground">₹300 wallet credit</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-warning">800 points</Badge>
                        <Button size="sm" variant="outline">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Redemptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Metro Card Recharge</div>
                        <div className="text-xs text-muted-foreground">₹200 - 2 days ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success">Completed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Electricity Bill Discount</div>
                        <div className="text-xs text-muted-foreground">10% off - 1 week ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success">Applied</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Shopping Voucher</div>
                        <div className="text-xs text-muted-foreground">₹500 - 2 weeks ago</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success">Used</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
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