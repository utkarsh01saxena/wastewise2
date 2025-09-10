import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, BarChart3, Building2, CheckCircle, LogOut, Shield, TrendingDown, TrendingUp, Users, Zap, Wifi, WifiOff, Camera, Lightbulb, Cpu, Truck, Battery } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AuthorityDashboard = () => {
  const { signOut, profile } = useAuth();
  const totalHouseholds = 1247;
  const activeUsers = 1089;
  const avgCompliance = 87;
  const wasteProcessed = 2.4; // tons

  const complianceData = [
    { society: "Green Valley Apartments", households: 120, compliance: 94, trend: "up" },
    { society: "Sunrise Residency", households: 85, compliance: 91, trend: "up" },
    { society: "Palm Grove", households: 95, compliance: 89, trend: "stable" },
    { society: "City Heights", households: 150, compliance: 78, trend: "down" },
    { society: "Metro Plaza", households: 75, compliance: 72, trend: "down" },
  ];

  const alerts = [
    { type: "Low Compliance", message: "Metro Plaza below 75% compliance threshold", severity: "high" },
    { type: "Bin Maintenance", message: "Smart bin #247 requires attention", severity: "medium" },
    { type: "High Activity", message: "Green Valley shows 15% increase in proper segregation", severity: "low" },
  ];

  const weeklyStats = [
    { day: "Mon", correct: 89, incorrect: 11 },
    { day: "Tue", correct: 92, incorrect: 8 },
    { day: "Wed", correct: 87, incorrect: 13 },
    { day: "Thu", correct: 91, incorrect: 9 },
    { day: "Fri", correct: 85, incorrect: 15 },
    { day: "Sat", correct: 88, incorrect: 12 },
    { day: "Sun", correct: 86, incorrect: 14 },
  ];

  const smartBins = [
    {
      id: "BIN-001",
      location: "Green Valley Apartments - Block A",
      isOnline: true,
      occupancy: 75,
      lastPing: "2 mins ago",
      components: {
        camera: { status: "operational", lastCheck: "5 mins ago" },
        lightSensor: { status: "operational", lastCheck: "3 mins ago" },
        conveyorBelt: { status: "maintenance_required", lastCheck: "1 hour ago" },
        microcontroller: { status: "operational", lastCheck: "2 mins ago" },
        battery: { level: 85, status: "good" }
      }
    },
    {
      id: "BIN-002", 
      location: "Sunrise Residency - Main Gate",
      isOnline: true,
      occupancy: 45,
      lastPing: "1 min ago",
      components: {
        camera: { status: "operational", lastCheck: "2 mins ago" },
        lightSensor: { status: "operational", lastCheck: "4 mins ago" },
        conveyorBelt: { status: "operational", lastCheck: "10 mins ago" },
        microcontroller: { status: "operational", lastCheck: "1 min ago" },
        battery: { level: 92, status: "excellent" }
      }
    },
    {
      id: "BIN-003",
      location: "Palm Grove - Central Garden",
      isOnline: false,
      occupancy: 0,
      lastPing: "15 mins ago",
      components: {
        camera: { status: "offline", lastCheck: "15 mins ago" },
        lightSensor: { status: "offline", lastCheck: "15 mins ago" },
        conveyorBelt: { status: "offline", lastCheck: "15 mins ago" },
        microcontroller: { status: "offline", lastCheck: "15 mins ago" },
        battery: { level: 12, status: "critical" }
      }
    },
    {
      id: "BIN-004",
      location: "City Heights - Tower B",
      isOnline: true,
      occupancy: 90,
      lastPing: "30 secs ago",
      components: {
        camera: { status: "operational", lastCheck: "1 min ago" },
        lightSensor: { status: "error", lastCheck: "25 mins ago" },
        conveyorBelt: { status: "operational", lastCheck: "5 mins ago" },
        microcontroller: { status: "operational", lastCheck: "30 secs ago" },
        battery: { level: 78, status: "good" }
      }
    },
    {
      id: "BIN-005",
      location: "Metro Plaza - Food Court",
      isOnline: true,
      occupancy: 60,
      lastPing: "45 secs ago",
      components: {
        camera: { status: "operational", lastCheck: "2 mins ago" },
        lightSensor: { status: "operational", lastCheck: "1 min ago" },
        conveyorBelt: { status: "operational", lastCheck: "3 mins ago" },
        microcontroller: { status: "operational", lastCheck: "45 secs ago" },
        battery: { level: 67, status: "fair" }
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-success";
      case "maintenance_required": return "text-warning";
      case "error": return "text-destructive";
      case "offline": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4" />;
      case "maintenance_required": return <AlertCircle className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      case "offline": return <WifiOff className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return "text-success";
    if (level > 30) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Authority Dashboard
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-eco-gradient bg-clip-text text-transparent mb-2">
              WasteWise Authority Portal
            </h1>
            <p className="text-muted-foreground">Monitor city-wide waste segregation compliance</p>
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card border-primary/20 bg-eco-gradient text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Total Households
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalHouseholds.toLocaleString()}</div>
              <p className="text-xs text-primary-foreground/80 mt-1">registered users</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-success">
                <Users className="w-4 h-4" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((activeUsers / totalHouseholds) * 100)}% participation rate
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-accent">
                <BarChart3 className="w-4 h-4" />
                Avg Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{avgCompliance}%</div>
              <Progress value={avgCompliance} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-warning">
                <Zap className="w-4 h-4" />
                Waste Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{wasteProcessed}</div>
              <p className="text-xs text-muted-foreground mt-1">tons this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-destructive' : 
                    alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.message}</div>
                  </div>
                </div>
                <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'default'}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="societies">Society Performance</TabsTrigger>
            <TabsTrigger value="smartbins">Smart Bins</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Segregation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="text-sm font-medium">{stat.day}</div>
                        <div className="flex items-center gap-4 flex-1 max-w-sm">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-success">Correct: {stat.correct}%</span>
                              <span className="text-destructive">Incorrect: {stat.incorrect}%</span>
                            </div>
                            <Progress value={stat.correct} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                      <div className="font-medium text-sm">Generate Report</div>
                      <div className="text-xs text-muted-foreground">Weekly compliance summary</div>
                    </button>
                    <button className="p-4 text-left bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors">
                      <div className="font-medium text-sm">Send Alerts</div>
                      <div className="text-xs text-muted-foreground">Notify low-compliance users</div>
                    </button>
                    <button className="p-4 text-left bg-success/10 hover:bg-success/20 rounded-lg transition-colors">
                      <div className="font-medium text-sm">Reward Top Performers</div>
                      <div className="text-xs text-muted-foreground">Acknowledge achievements</div>
                    </button>
                    <button className="p-4 text-left bg-warning/10 hover:bg-warning/20 rounded-lg transition-colors">
                      <div className="font-medium text-sm">Schedule Maintenance</div>
                      <div className="text-xs text-muted-foreground">Smart bin service</div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="societies" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Society-wise Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceData.map((society, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-medium">{society.society}</div>
                        <Badge variant="outline">{society.households} households</Badge>
                        {society.trend === "up" && <TrendingUp className="w-4 h-4 text-success" />}
                        {society.trend === "down" && <TrendingDown className="w-4 h-4 text-destructive" />}
                        {society.trend === "stable" && <CheckCircle className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-xs">
                          <Progress value={society.compliance} className="h-2" />
                        </div>
                        <div className="text-sm font-medium">{society.compliance}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="smartbins" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-success">
                    <Wifi className="w-4 h-4" />
                    Online Bins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">
                    {smartBins.filter(bin => bin.isOnline).length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    of {smartBins.length} total bins
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-warning">
                    <AlertCircle className="w-4 h-4" />
                    Maintenance Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">
                    {smartBins.filter(bin => 
                      Object.values(bin.components).some(component => 
                        typeof component === 'object' && 
                        'status' in component && 
                        (component.status === 'maintenance_required' || component.status === 'error')
                      )
                    ).length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">bins need attention</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2 text-accent">
                    <BarChart3 className="w-4 h-4" />
                    Avg Occupancy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">
                    {Math.round(smartBins.reduce((sum, bin) => sum + bin.occupancy, 0) / smartBins.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">across all bins</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  Smart Bin Diagnostics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {smartBins.map((bin, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${bin.isOnline ? 'bg-success' : 'bg-destructive'}`} />
                        <div>
                          <div className="font-medium">{bin.id}</div>
                          <div className="text-sm text-muted-foreground">{bin.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Occupancy: {bin.occupancy}%</div>
                          <div className="text-xs text-muted-foreground">Last ping: {bin.lastPing}</div>
                        </div>
                        <div className="w-20">
                          <Progress value={bin.occupancy} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <Camera className={`w-4 h-4 ${getStatusColor(bin.components.camera.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">Camera</div>
                          <div className={`text-xs capitalize ${getStatusColor(bin.components.camera.status)}`}>
                            {bin.components.camera.status.replace('_', ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{bin.components.camera.lastCheck}</div>
                        </div>
                        {getStatusIcon(bin.components.camera.status)}
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <Lightbulb className={`w-4 h-4 ${getStatusColor(bin.components.lightSensor.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">Light Sensor</div>
                          <div className={`text-xs capitalize ${getStatusColor(bin.components.lightSensor.status)}`}>
                            {bin.components.lightSensor.status.replace('_', ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{bin.components.lightSensor.lastCheck}</div>
                        </div>
                        {getStatusIcon(bin.components.lightSensor.status)}
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <Truck className={`w-4 h-4 ${getStatusColor(bin.components.conveyorBelt.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">Conveyor</div>
                          <div className={`text-xs capitalize ${getStatusColor(bin.components.conveyorBelt.status)}`}>
                            {bin.components.conveyorBelt.status.replace('_', ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{bin.components.conveyorBelt.lastCheck}</div>
                        </div>
                        {getStatusIcon(bin.components.conveyorBelt.status)}
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <Cpu className={`w-4 h-4 ${getStatusColor(bin.components.microcontroller.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">Controller</div>
                          <div className={`text-xs capitalize ${getStatusColor(bin.components.microcontroller.status)}`}>
                            {bin.components.microcontroller.status.replace('_', ' ')}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{bin.components.microcontroller.lastCheck}</div>
                        </div>
                        {getStatusIcon(bin.components.microcontroller.status)}
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                        <Battery className={`w-4 h-4 ${getBatteryColor(bin.components.battery.level)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">Battery</div>
                          <div className={`text-xs ${getBatteryColor(bin.components.battery.level)}`}>
                            {bin.components.battery.level}% ({bin.components.battery.status})
                          </div>
                          <div className="text-xs text-muted-foreground">Power level</div>
                        </div>
                        <div className={getBatteryColor(bin.components.battery.level)}>
                          {bin.components.battery.level > 70 ? <CheckCircle className="w-4 h-4" /> : 
                           bin.components.battery.level > 30 ? <AlertCircle className="w-4 h-4" /> : 
                           <AlertCircle className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Waste Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dry Waste</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wet Waste</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mixed/Incorrect</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-2">
                      <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Detailed analytics charts</p>
                      <p className="text-sm text-muted-foreground">Performance trends and insights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthorityDashboard;