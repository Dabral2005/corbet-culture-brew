import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8 gap-2">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-4xl font-bold mb-8 text-primary">Terms of Use</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Corbett Culture Brew website, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Corbett Culture Brew's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Reservations</h2>
            <p>Table reservations are subject to availability and confirmation. We reserve the right to cancel or modify reservations as needed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
