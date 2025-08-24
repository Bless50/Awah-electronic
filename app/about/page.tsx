import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Truck, Headphones, Award, MapPin } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Authentic Products",
    description: "100% genuine electronics from authorized dealers with full manufacturer warranties",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery across Africa with real-time tracking",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service to help with any questions or concerns",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Rigorous quality checks ensure every product meets our high standards",
  },
]

const stats = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "10,000+", label: "Products Sold" },
  { number: "15+", label: "Countries Served" },
  { number: "99.5%", label: "Customer Satisfaction" },
]

const team = [
  {
    name: "Samuel Awah",
    role: "Founder & CEO",
    image: "/african-business-executive.png",
    bio: "15+ years experience in electronics retail and e-commerce across Africa",
  },
  {
    name: "Grace Mbeki",
    role: "Head of Operations",
    image: "/african-business-woman.png",
    bio: "Expert in supply chain management and customer experience optimization",
  },
  {
    name: "David Okonkwo",
    role: "Technical Director",
    image: "/african-tech-professional.png",
    bio: "Technology specialist with deep knowledge of consumer electronics",
  },
]

export default async function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-electronics-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/90 text-black">Est. 2019</Badge>
            <h1 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6">About Awah Electronics</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Your trusted partner for premium electronics across Africa. We're committed to bringing the latest
              technology to your doorstep with unmatched quality and service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans font-bold text-3xl mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2019 by Samuel Awah, Awah Electronics began as a small electronics store in Douala,
                  Cameroon. Our founder's vision was simple: make premium electronics accessible to everyone across
                  Africa.
                </p>
                <p>
                  What started as a local business has grown into one of Africa's most trusted e-commerce platforms for
                  electronics. We've built our reputation on three core principles: authenticity, reliability, and
                  exceptional customer service.
                </p>
                <p>
                  Today, we serve customers across 15+ African countries, offering everything from the latest
                  smartphones to professional photography equipment. Our commitment to quality and customer satisfaction
                  remains unchanged.
                </p>
              </div>
            </div>
            <div className="relative">
              <img src="/modern-laptops.png" alt="Awah Electronics Product Range" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-sans font-bold text-3xl md:text-4xl text-primary mb-2">{stat.number}</div>
                <p className="text-base text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl mb-4">Why Choose Awah Electronics?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just an electronics retailer. We're your technology partner, committed to your success and
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Awah Electronics, working tirelessly to serve you better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-lg p-6 text-center border border-border">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-3xl font-bold text-primary mb-2">{member.role}</p>
                <p className="text-base text-muted-foreground mb-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-sans font-bold text-3xl mb-4">Visit Our Store</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to experience the future of electronics? Join thousands of satisfied customers. Visit our store in Douala, or shop online for convenient delivery
              across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Contact Us</Button>
              <Button size="lg" variant="outline">
                Find Store Location
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
