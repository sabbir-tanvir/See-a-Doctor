import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HealthServices() {
  const blogPosts = [
    {
      id: "physiotherapy-benefits",
      title: "The Benefits of Regular Physiotherapy",
      description: "Physiotherapy is not just for injury recovery. Recent studies have shown that regular physiotherapy sessions can prevent chronic pain conditions, improve mobility in older adults, and enhance athletic performance. This article explores the long-term benefits of incorporating physiotherapy into your wellness routine.",
      image: "https://img.freepik.com/free-photo/physiotherapist-giving-shoulder-exercise-female-patient_107420-65326.jpg",
      author: "Dr. Sabbir Tanvir",
      specialty: "Physical Medicine & Rehabilitation",
      date: "May 5, 2025",
      readTime: "6 min read"
    },
    {
      id: "home-diagnostics",
      title: "Advancements in Home Diagnostic Testing",
      description: "The healthcare industry has seen remarkable innovations in home diagnostic testing in recent years. From comprehensive blood panels to advanced genetic testing, patients now have access to laboratory-quality diagnostics without leaving their homes. This article discusses the accuracy, benefits, and limitations of modern home testing solutions.",
      image: "https://img.freepik.com/free-photo/nurse-taking-blood-sample-patient-analysis_23-2149131146.jpg",
      author: "Dr. Selim Reza",
      specialty: "Laboratory Medicine",
      date: "April 28, 2025",
      readTime: "8 min read"
    },
    {
      id: "preventive-health-checkups",
      title: "Why Annual Health Checkups Are Crucial",
      description: "Preventive healthcare is the foundation of longevity and quality of life. Early detection of health issues through regular checkups can significantly improve treatment outcomes for conditions like diabetes, hypertension, and cancer. This comprehensive guide outlines which tests you should consider at different ages and why they matter.",
      image: "https://img.freepik.com/free-photo/doctor-checking-patient-health-medical-examination_23-2149761374.jpg",
      author: "Dr. Rummon Khan",
      specialty: "Internal Medicine",
      date: "May 10, 2025",
      readTime: "7 min read"
    },
    {
      id: "health-insurance-guide",
      title: "Understanding Health Insurance Coverage",
      description: "Navigating the complex world of health insurance can be challenging for many patients. This article breaks down different types of health insurance plans, coverage options, and important considerations when selecting a policy. Learn about deductibles, co-pays, in-network providers, and how to maximize your benefits.",
      image: "https://img.freepik.com/free-photo/health-insurance-claim-form-concept_53876-133703.jpg",
      author: "Dr. Fatema Nasrin",
      specialty: "Healthcare Administration",
      date: "April 15, 2025", 
      readTime: "9 min read"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Doctor's Health Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert medical articles written by our network of specialized healthcare professionals to keep you informed on the latest health topics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row gap-6 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="md:w-1/3">
                <div className="relative h-48 w-full rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-secondary">{post.date}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <span className="text-primary text-xs font-bold">{post.author.split(' ').map(name => name[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.specialty}</p>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <Button
                    variant="outline"
                    className="border-secondary text-primary hover:bg-secondary hover:text-white transition-colors"
                  >
                    Read full article
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
