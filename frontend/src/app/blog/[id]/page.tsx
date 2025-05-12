'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

// This would typically come from an API or database
const blogData = [
  {
    id: "physiotherapy-benefits",
    title: "The Benefits of Regular Physiotherapy",
    description: "Physiotherapy is not just for injury recovery. Recent studies have shown that regular physiotherapy sessions can prevent chronic pain conditions, improve mobility in older adults, and enhance athletic performance. This article explores the long-term benefits of incorporating physiotherapy into your wellness routine.",
    image: "https://img.freepik.com/free-photo/physiotherapist-giving-shoulder-exercise-female-patient_107420-65326.jpg",
    author: "Dr. Sabbir Tanvir",
    specialty: "Physical Medicine & Rehabilitation",
    date: "May 5, 2025",
    readTime: "6 min read",
    content: `
      <h2>Introduction to Modern Physiotherapy</h2>
      <p>Physiotherapy, also known as physical therapy, has evolved significantly over the past few decades. What was once considered primarily a rehabilitation tool for injuries has now become an integral component of preventive healthcare and performance optimization. As medical research advances, we continue to discover new ways in which regular physiotherapy sessions can benefit individuals across all age groups and activity levels.</p>
      
      <h2>Preventing Chronic Pain Conditions</h2>
      <p>One of the most significant benefits of regular physiotherapy is its ability to prevent chronic pain conditions before they develop. Through targeted exercises and manual therapy techniques, physiotherapists can address muscle imbalances, poor posture, and movement patterns that often lead to conditions like lower back pain, neck pain, and repetitive strain injuries.</p>
      <p>A recent study published in the Journal of Orthopaedic & Sports Physical Therapy found that preventive physiotherapy interventions reduced the incidence of workplace-related musculoskeletal disorders by up to 60% among office workers. These impressive results highlight the value of proactive physiotherapy care, particularly for individuals who spend long hours in sedentary positions.</p>
      
      <h2>Enhancing Mobility in Aging Populations</h2>
      <p>As we age, maintaining mobility becomes increasingly challenging due to natural changes in muscle mass, bone density, and joint health. Regular physiotherapy sessions can significantly slow this decline through targeted exercises that improve strength, balance, and flexibility.</p>
      <p>For older adults, the benefits extend beyond physical function to include enhanced independence and quality of life. A longitudinal study following seniors who participated in weekly physiotherapy sessions showed that they were 40% less likely to experience falls and 35% more likely to maintain independent living compared to their peers who did not receive such interventions.</p>
      
      <h2>Optimizing Athletic Performance</h2>
      <p>Athletes at all levels are increasingly turning to physiotherapy not just for injury recovery but as an integral part of their training regimen. Sports physiotherapists employ specialized techniques to improve biomechanics, enhance muscle recruitment patterns, and optimize movement efficiency—all of which contribute to better performance and reduced injury risk.</p>
      <p>Many professional sports teams now employ full-time physiotherapists who work closely with strength coaches to develop personalized programs for each athlete. These integrated approaches have been shown to improve specific performance metrics such as sprint speed, jumping height, and throwing velocity by addressing the unique physical attributes and limitations of individual athletes.</p>
      
      <h2>Managing Chronic Conditions</h2>
      <p>For individuals living with chronic health conditions such as arthritis, diabetes, or heart disease, regular physiotherapy offers remarkable benefits. Tailored exercise programs can help manage symptoms, improve function, and enhance overall well-being despite these ongoing health challenges.</p>
      <p>In patients with osteoarthritis, for example, consistent physiotherapy has been shown to reduce pain levels by up to 40% while simultaneously improving joint function and delaying the need for surgical interventions such as joint replacements. Similarly, cardiac rehabilitation programs that include physiotherapy components have demonstrated significant reductions in mortality rates and hospital readmissions among heart disease patients.</p>
      
      <h2>Stress Reduction and Mental Health Benefits</h2>
      <p>The benefits of physiotherapy extend beyond physical health to include positive impacts on mental well-being. The combination of guided movement, hands-on therapy, and breathing techniques often employed in physiotherapy sessions can trigger the release of endorphins and reduce stress hormone levels in the body.</p>
      <p>Many patients report improvements in sleep quality, mood, and overall stress levels after beginning regular physiotherapy care. These mental health benefits create a positive feedback loop, as reduced stress levels often contribute to faster physical recovery and better adherence to therapeutic exercises.</p>
      
      <h2>Conclusion: Physiotherapy as Preventive Medicine</h2>
      <p>As our understanding of human movement and physiology continues to evolve, physiotherapy's role in healthcare is expanding from reactive treatment to proactive wellness care. The evidence increasingly supports integrating regular physiotherapy sessions into one's healthcare routine, regardless of age or activity level.</p>
      <p>By addressing minor issues before they develop into significant problems and optimizing how our bodies move through the world, physiotherapy offers a path to better mobility, reduced pain, and enhanced quality of life across the lifespan. Consider speaking with a qualified physiotherapist about how preventive care might benefit your specific health situation and goals.</p>
    `
  },
  {
    id: "home-diagnostics",
    title: "Advancements in Home Diagnostic Testing",
    description: "The healthcare industry has seen remarkable innovations in home diagnostic testing in recent years. From comprehensive blood panels to advanced genetic testing, patients now have access to laboratory-quality diagnostics without leaving their homes. This article discusses the accuracy, benefits, and limitations of modern home testing solutions.",
    image: "https://img.freepik.com/free-photo/nurse-taking-blood-sample-patient-analysis_23-2149131146.jpg",
    author: "Dr. Selim Reza",
    specialty: "Laboratory Medicine",
    date: "April 28, 2025",
    readTime: "8 min read",
    content: `
      <h2>The Evolution of Home Diagnostic Testing</h2>
      <p>Home diagnostic testing has undergone a remarkable transformation in recent decades. What began with simple pregnancy tests and basic glucose monitors has evolved into sophisticated testing platforms capable of analyzing dozens of biomarkers from the comfort of one's home. This evolution represents a significant paradigm shift in how we approach healthcare monitoring and disease detection.</p>
      
      <h2>Current Landscape of Home Testing Options</h2>
      <p>Today's market offers an impressive array of home diagnostic tests covering virtually every body system. Blood tests can now assess cholesterol levels, hormone balance, vitamin deficiencies, and even inflammatory markers with remarkable accuracy. Urinalysis kits detect everything from urinary tract infections to kidney function parameters, while stool tests evaluate gut microbiome composition and screen for colorectal cancer.</p>
      <p>Perhaps most revolutionary has been the emergence of genetic testing for home use. Consumers can now access information about their genetic predispositions to various diseases, carrier status for inherited conditions, and even pharmacogenomic data that helps predict medication responses—all from a simple saliva sample collected at home.</p>
      
      <h2>Benefits for Patients and Healthcare Systems</h2>
      <p>The proliferation of home diagnostic testing offers numerous advantages for both individual patients and broader healthcare systems. For patients, these tests provide unprecedented convenience, eliminating travel time, waiting rooms, and the need to schedule appointments during work hours. This accessibility is particularly valuable for individuals with mobility challenges, those living in rural areas, and immunocompromised patients for whom clinic visits carry additional risks.</p>
      <p>From a healthcare system perspective, home testing can significantly reduce the burden on clinical laboratories and healthcare facilities. When routine monitoring can be conducted at home, medical professionals can focus their attention on more complex cases and therapeutic interventions. Additionally, home testing often proves cost-effective, potentially reducing unnecessary office visits and associated expenses.</p>
      
      <h2>Accuracy and Reliability Considerations</h2>
      <p>While home diagnostic technology has improved dramatically, questions about accuracy and reliability remain important considerations. High-quality home tests now approach laboratory standards in many cases, but variations in sample collection technique, storage conditions, and user interpretation can all affect results.</p>
      <p>Modern platforms have addressed many of these challenges through simplified collection methods, clear instructions, and digital interfaces that minimize interpretation errors. Many tests now include automatic quality checks that flag potentially compromised samples and prevent inaccurate results from being reported. Nevertheless, healthcare professionals generally recommend confirming any significant findings with traditional laboratory testing, particularly when making important treatment decisions.</p>
      
      <h2>Regulatory Framework and Quality Assurance</h2>
      <p>The rapid expansion of the home testing market has prompted evolving regulatory responses from agencies like the FDA. Tests marketed for medical diagnosis (rather than general wellness) must undergo rigorous validation studies to demonstrate clinical accuracy and reliability. Consumers should look for tests that have received appropriate regulatory clearance and ideally have published validation studies in peer-reviewed journals.</p>
      <p>Beyond regulatory approval, many reputable testing companies participate in voluntary quality assurance programs. These might include regular proficiency testing, where test samples with known values are processed to verify accuracy, or partnerships with established clinical laboratories that provide oversight and expertise.</p>
      
      <h2>The Future of Home Diagnostics</h2>
      <p>Looking ahead, the home diagnostic testing landscape continues to evolve at a remarkable pace. Several exciting developments are on the horizon, including:</p>
      <ul>
        <li>Continuous monitoring devices that track biomarkers in real-time</li>
        <li>AI-powered analysis that provides increasingly sophisticated interpretation of test results</li>
        <li>Integration with telehealth platforms for seamless sharing of results with healthcare providers</li>
        <li>Expansion into areas previously considered impossible for home testing, such as pathogen identification and complex protein analysis</li>
      </ul>
      <p>These innovations promise to further blur the lines between clinical laboratory testing and home-based diagnostics, potentially revolutionizing how we approach preventive healthcare and chronic disease management.</p>
      
      <h2>Conclusion: A Balanced Approach</h2>
      <p>Home diagnostic testing represents a powerful tool in modern healthcare, offering unprecedented access to personal health data. When used appropriately—with an understanding of both its capabilities and limitations—these tests can empower individuals to take a more active role in managing their health.</p>
      <p>The optimal approach likely involves partnership between patients and healthcare providers, where home testing complements rather than replaces traditional clinical care. By combining the convenience and frequency of home monitoring with the expertise and comprehensive assessment of healthcare professionals, we can harness the full potential of these remarkable diagnostic innovations.</p>
    `
  },
  {
    id: "preventive-health-checkups",
    title: "Why Annual Health Checkups Are Crucial",
    description: "Preventive healthcare is the foundation of longevity and quality of life. Early detection of health issues through regular checkups can significantly improve treatment outcomes for conditions like diabetes, hypertension, and cancer. This comprehensive guide outlines which tests you should consider at different ages and why they matter.",
    image: "https://img.freepik.com/free-photo/doctor-checking-patient-health-medical-examination_23-2149761374.jpg",
    author: "Dr. Rummon Khan",
    specialty: "Internal Medicine",
    date: "May 10, 2025",
    readTime: "7 min read",
    content: `
      <h2>The Case for Preventive Healthcare</h2>
      <p>In a medical system often focused on treating illness rather than preventing it, annual health checkups represent a critical opportunity to detect potential health issues before they develop into serious conditions. The principle is straightforward yet powerful: identifying risk factors and early disease markers allows for intervention at stages when treatment is typically more effective, less invasive, and significantly less costly.</p>
      <p>Research consistently demonstrates the value of this approach. A landmark study published in the New England Journal of Medicine found that individuals who received regular comprehensive health assessments experienced 22% lower mortality rates over a 15-year follow-up period compared to those who sought medical care only when symptomatic.</p>
      
      <h2>Essential Screenings by Age Group</h2>
      <p><strong>In Your 20s and 30s:</strong> While many young adults feel invincible, establishing baseline health measurements during these decades provides invaluable reference points for future comparisons. Key screenings should include:</p>
      <ul>
        <li>Blood pressure measurement (every 2 years if normal, annually if elevated)</li>
        <li>Cholesterol panel (every 5 years if normal)</li>
        <li>Fasting blood glucose test (especially if overweight or family history of diabetes)</li>
        <li>Complete blood count to assess for anemia and general blood health</li>
        <li>Skin examination for unusual moles or lesions</li>
        <li>Depression screening</li>
        <li>For women: cervical cancer screening (Pap test every 3 years starting at age 21)</li>
      </ul>
      
      <p><strong>In Your 40s:</strong> As the risk for chronic diseases begins to increase, screening recommendations become more comprehensive:</p>
      <ul>
        <li>All previously mentioned tests, potentially with increased frequency</li>
        <li>Comprehensive metabolic panel to assess kidney and liver function</li>
        <li>Thyroid function tests</li>
        <li>Eye examination (baseline at age 40)</li>
        <li>For women: mammogram (recommendations vary, discuss with your doctor)</li>
        <li>For men: prostate health discussion with your physician</li>
      </ul>
      
      <p><strong>In Your 50s and Beyond:</strong> Preventive screening becomes increasingly important as age-related disease risks rise:</p>
      <ul>
        <li>All previously mentioned tests</li>
        <li>Colorectal cancer screening (colonoscopy typically begins at age 45-50)</li>
        <li>Bone density scan (particularly for women after menopause)</li>
        <li>Lung cancer screening for long-term smokers</li>
        <li>Comprehensive hearing assessment</li>
        <li>Abdominal aortic aneurysm screening (especially for men who have smoked)</li>
      </ul>
      
      <h2>Beyond Basic Screenings: The Complete Health Assessment</h2>
      <p>A truly comprehensive annual checkup extends beyond standard screening tests to include:</p>
      
      <p><strong>Detailed Medical History Review:</strong> Your physician should thoroughly review any changes in your personal or family medical history since your last visit. New diagnoses among close relatives can significantly alter your risk profile for certain conditions.</p>
      
      <p><strong>Medication Reconciliation:</strong> A comprehensive assessment of all medications, supplements, and over-the-counter products you take is essential to identify potential interactions or unnecessary treatments.</p>
      
      <p><strong>Lifestyle Assessment:</strong> Discussions about diet, physical activity, sleep patterns, stress management, and substance use provide crucial context for interpreting test results and developing personalized health plans.</p>
      
      <p><strong>Immunization Updates:</strong> Annual checkups offer an opportunity to ensure your vaccinations remain current, including seasonal flu shots, tetanus boosters, and age-appropriate vaccines like those for shingles or pneumonia.</p>
      
      <p><strong>Specialized Assessments Based on Risk Factors:</strong> Individuals with specific risk factors may benefit from additional screenings. For example, those with a family history of heart disease might undergo advanced lipid testing or coronary calcium scoring.</p>
      
      <h2>Personalized Risk Assessment: The Future of Preventive Care</h2>
      <p>Modern preventive medicine increasingly emphasizes personalized risk assessment rather than one-size-fits-all screening protocols. Advanced genetic testing, biomarker analysis, and sophisticated risk calculators now allow physicians to tailor screening recommendations to an individual's specific risk profile.</p>
      <p>This approach optimizes the benefit-to-risk ratio of screening by intensifying surveillance where it matters most while avoiding unnecessary testing that might lead to false positives, anxiety, or overtreatment.</p>
      
      <h2>Beyond Detection: Using Annual Checkups to Optimize Health</h2>
      <p>The most effective annual checkups serve not only to detect disease but also to optimize overall health and wellbeing. Forward-thinking physicians use these visits to collaborate with patients on developing personalized health maintenance strategies, addressing nutrition, physical activity, stress management, and sleep quality.</p>
      <p>This proactive approach transforms the annual checkup from a passive screening exercise into an active health planning session that empowers patients to make informed lifestyle choices throughout the year.</p>
      
      <h2>Conclusion: Investing in Your Future Health</h2>
      <p>Annual health checkups represent one of the most valuable investments you can make in your long-term health and quality of life. By detecting potential issues early, establishing baseline measurements, and creating personalized health strategies, these comprehensive assessments provide the foundation for truly preventive healthcare.</p>
      <p>Rather than viewing your annual checkup as simply another appointment to keep, consider it an essential component of your overall wellness strategy—an opportunity to partner with your healthcare provider in maintaining and optimizing your health for years to come.</p>
    `
  },
  {
    id: "health-insurance-guide",
    title: "Understanding Health Insurance Coverage",
    description: "Navigating the complex world of health insurance can be challenging for many patients. This article breaks down different types of health insurance plans, coverage options, and important considerations when selecting a policy. Learn about deductibles, co-pays, in-network providers, and how to maximize your benefits.",
    image: "https://img.freepik.com/free-photo/health-insurance-claim-form-concept_53876-133703.jpg",
    author: "Dr. Fatema Nasrin",
    specialty: "Healthcare Administration",
    date: "April 15, 2025", 
    readTime: "9 min read",
    content: `
      <h2>The Foundations of Health Insurance</h2>
      <p>Health insurance represents a critical financial safety net designed to protect individuals and families from the potentially devastating costs of medical care. At its core, health insurance operates on a principle of risk pooling—collecting premiums from many individuals to cover the substantial medical expenses incurred by some. This system allows for the unpredictable and often substantial costs of healthcare to be distributed across a larger population.</p>
      <p>While the basic concept is straightforward, the modern health insurance landscape has evolved into a complex ecosystem with various plan types, coverage levels, and terminology that can be overwhelming to navigate. Understanding these fundamental elements is essential for making informed decisions about your healthcare coverage.</p>
      
      <h2>Major Types of Health Insurance Plans</h2>
      <p>Health insurance plans generally fall into several major categories, each with distinct characteristics that affect how you receive care and manage costs:</p>
      
      <p><strong>Health Maintenance Organizations (HMOs):</strong> These plans typically require you to select a primary care physician (PCP) who coordinates all your healthcare and provides referrals to specialists when necessary. HMOs generally offer lower premiums and out-of-pocket costs but restrict coverage to a specific network of providers. Care received outside this network is usually not covered except in emergencies.</p>
      
      <p><strong>Preferred Provider Organizations (PPOs):</strong> PPO plans offer greater flexibility, allowing you to see specialists without referrals and receive care from out-of-network providers (albeit at higher cost-sharing levels). These plans typically have higher premiums than HMOs but provide more choice and fewer restrictions on accessing care.</p>
      
      <p><strong>Exclusive Provider Organizations (EPOs):</strong> These plans combine elements of both HMOs and PPOs. Like HMOs, they generally only cover care from in-network providers (except in emergencies). However, like PPOs, they often don't require referrals to see specialists. EPOs typically offer premiums that fall between those of HMOs and PPOs.</p>
      
      <p><strong>Point of Service (POS) Plans:</strong> POS plans represent another hybrid approach, requiring a PCP and referrals for specialists (like HMOs) while offering some coverage for out-of-network care (like PPOs), though at higher cost-sharing levels. These plans offer moderate flexibility with moderate premiums.</p>
      
      <p><strong>High-Deductible Health Plans (HDHPs):</strong> These plans feature lower premiums but significantly higher deductibles than traditional plans. HDHPs are often paired with tax-advantaged Health Savings Accounts (HSAs) that allow individuals to save money tax-free for medical expenses. These plans work well for generally healthy individuals who want protection against major medical events while managing routine healthcare costs directly.</p>
      
      <h2>Understanding Key Insurance Terms and Concepts</h2>
      <p>Navigating health insurance requires familiarity with several essential concepts that determine your financial responsibility for care:</p>
      
      <p><strong>Premium:</strong> The amount you pay (typically monthly) to maintain your insurance coverage, regardless of whether you use medical services.</p>
      
      <p><strong>Deductible:</strong> The amount you must pay out-of-pocket for covered services before your insurance begins to pay. For example, with a $2,000 deductible, you'll pay the first $2,000 of covered services yourself.</p>
      
      <p><strong>Copayment (Copay):</strong> A fixed amount you pay for a covered service (e.g., $25 for a doctor visit or $15 for a prescription). Copays typically apply after you've met your deductible, though some plans offer copays for certain services before the deductible is met.</p>
      
      <p><strong>Coinsurance:</strong> The percentage of costs you pay for covered services after meeting your deductible. For example, with 20% coinsurance, you pay 20% of the cost while your insurance covers the remaining 80%.</p>
      
      <p><strong>Out-of-Pocket Maximum:</strong> The most you'll have to pay for covered services in a plan year. After reaching this limit, your insurance pays 100% of the costs for covered benefits.</p>
      
      <p><strong>Network:</strong> The healthcare providers, facilities, and suppliers your health insurer has contracted with to provide services at negotiated rates. Using in-network providers typically results in lower costs than seeking care out-of-network.</p>
      
      <h2>Coverage Categories and Essential Benefits</h2>
      <p>Under current healthcare regulations, most comprehensive health insurance plans must cover certain categories of services, commonly referred to as essential health benefits:</p>
      
      <ul>
        <li>Ambulatory patient services (outpatient care)</li>
        <li>Emergency services</li>
        <li>Hospitalization</li>
        <li>Maternity and newborn care</li>
        <li>Mental health and substance use disorder services</li>
        <li>Prescription drugs</li>
        <li>Rehabilitative and habilitative services and devices</li>
        <li>Laboratory services</li>
        <li>Preventive and wellness services</li>
        <li>Pediatric services, including oral and vision care</li>
      </ul>
      
      <p>However, the specific services covered within these categories—and the extent of that coverage—can vary significantly between plans. For example, one plan might cover a wider range of prescription medications or offer more comprehensive mental health services than another.</p>
      
      <h2>Strategies for Selecting the Right Plan</h2>
      <p>Choosing the most appropriate health insurance plan requires careful consideration of several factors:</p>
      
      <p><strong>Assess Your Healthcare Needs:</strong> Consider your typical healthcare utilization patterns, any chronic conditions requiring ongoing management, medications you take regularly, and whether you anticipate any major medical events in the coming year (e.g., planned surgeries, pregnancy).</p>
      
      <p><strong>Evaluate Total Costs, Not Just Premiums:</strong> A plan with lower premiums but higher deductibles and copays might actually cost more overall depending on how frequently you use healthcare services. Calculate potential total annual costs based on your expected healthcare needs.</p>
      
      <p><strong>Check Provider Networks:</strong> If maintaining relationships with specific healthcare providers is important to you, verify that they participate in the plan's network before enrolling.</p>
      
      <p><strong>Review Drug Formularies:</strong> If you take prescription medications, check whether they're covered under the plan's formulary and what tier they fall into, as this will significantly impact your out-of-pocket costs.</p>
      
      <p><strong>Consider Health Savings Account Eligibility:</strong> If you're generally healthy and want to save for future medical expenses tax-free, an HDHP with an HSA might be advantageous.</p>
      
      <h2>Maximizing Your Benefits</h2>
      <p>Once you've selected a health insurance plan, several strategies can help you maximize its value:</p>
      
      <p><strong>Utilize Preventive Services:</strong> Most plans cover preventive care at 100% with no out-of-pocket cost. Taking advantage of these services—including annual physicals, vaccinations, and recommended screenings—can help identify health issues early when they're typically more treatable and less expensive to address.</p>
      
      <p><strong>Stay In-Network:</strong> Whenever possible, use in-network providers to minimize your out-of-pocket costs.</p>
      
      <p><strong>Review Explanation of Benefits (EOB) Statements:</strong> Check these documents carefully to ensure you're not being incorrectly billed for services that should be covered by your insurance.</p>
      
      <p><strong>Appeal Denied Claims When Appropriate:</strong> If your insurer denies coverage for a service you believe should be covered, you have the right to appeal that decision. Many initially denied claims are approved upon appeal.</p>
      
      <p><strong>Explore Telehealth Options:</strong> Many plans now offer telehealth services at reduced copays compared to in-person visits, providing a convenient and cost-effective option for many healthcare needs.</p>
      
      <h2>Conclusion: Becoming an Informed Healthcare Consumer</h2>
      <p>While the complexity of health insurance can be daunting, developing a foundational understanding of how these plans work empowers you to make informed decisions about your healthcare coverage and utilization. By carefully evaluating your options, selecting a plan that aligns with your specific needs, and strategically using your benefits, you can both protect your financial wellbeing and ensure access to necessary healthcare services.</p>
      <p>Remember that health insurance represents not just protection against catastrophic medical expenses but also an investment in your ongoing health and wellness through access to preventive care and early intervention services. Taking the time to understand and optimize your coverage can yield significant benefits for both your physical and financial health.</p>
    `
  }
];

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const post = blogData.find(post => post.id === id);
  
  if (!post) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Blog post not found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/')} variant="default">
          Return to home
        </Button>
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-1 text-gray-600 hover:text-primary"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Back to articles
        </Button>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative w-full h-80">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-4 items-center">
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar size={14} />
                <span className="text-sm">{post.date}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock size={14} />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-primary mb-6">{post.title}</h1>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-primary text-sm font-bold">{post.author.split(' ').map(name => name[0]).join('')}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">{post.specialty}</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">LinkedIn</Button>
                <Button variant="outline" size="sm">Copy Link</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
