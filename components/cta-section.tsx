import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link" // use react-router-dom's Link if using CRA

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg md:text-xl opacity-90 text-pretty mb-8 leading-relaxed">
            Join hundreds of companies that trust Elevare Tech to deliver innovative solutions. 
            Let's discuss how we can elevate your technology infrastructure.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
