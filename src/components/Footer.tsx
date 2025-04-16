import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, AlertCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-32">
                {/* Replace with actual logo or use a placeholder */}
                <Image
                  src="https://ext.same-assets.com/690263052/3307663837.svg"
                  alt="Sasthya Seba"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm">
              We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/SasthyaSebaLtd" className="text-white hover:text-secondary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.linkedin.com/company/sasthya-seba-limited/" className="text-white hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://www.youtube.com/channel/UCqiXeyO6RKDc3z-LSpD0HTg" className="text-white hover:text-secondary transition-colors">
                <Youtube size={20} />
              </Link>
              <Link href="https://twitter.com/SasthyaSeba" className="text-white hover:text-secondary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.instagram.com/sasthyasebaltd/" className="text-white hover:text-secondary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://status.sasthyaseba.com" className="text-white hover:text-secondary transition-colors">
                <AlertCircle size={20} />
              </Link>
            </div>
            <div className="space-y-2">
              <Link href="tel:09611530530" className="block text-lg font-semibold hover:text-secondary transition-colors">
                09611 530 530
              </Link>
              <Link href="tel:01405600700" className="block text-lg font-semibold hover:text-secondary transition-colors">
                01405 600 700
              </Link>
            </div>
          </div>

          {/* Sasthya Seba Ltd Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Image
                src="https://ext.same-assets.com/690263052/1684320437.svg"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              Sasthya Seba Ltd.
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-sm hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/diseases-and-conditions" className="text-sm hover:text-secondary transition-colors">
                  Diseases and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* For Patients Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Image
                src="https://ext.same-assets.com/690263052/2230474228.svg"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              For Patients
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm hover:text-secondary transition-colors">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link href="/search?type=doctor" className="text-sm hover:text-secondary transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/ambulance" className="text-sm hover:text-secondary transition-colors">
                  Find Ambulances
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/patient-no-show-policy" className="text-sm hover:text-secondary transition-colors">
                  Patient No-Show Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-and-refund-policy" className="text-sm hover:text-secondary transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Doctors/Organisations Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Image
                src="https://ext.same-assets.com/690263052/697087813.svg"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              For Doctors/Organisations
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://doctor.sasthyaseba.com/login" className="text-sm hover:text-secondary transition-colors">
                  Login as Doctor
                </Link>
              </li>
              <li>
                <Link href="https://hospital.sasthyaseba.com/register" className="text-sm hover:text-secondary transition-colors">
                  Work with Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/patient-no-show-policy" className="text-sm hover:text-secondary transition-colors">
                  Patient No-Show Policy
                </Link>
              </li>
              <li>
                <Link href="/account-delete-request" className="text-sm hover:text-secondary transition-colors">
                  Account Deletion
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-gray-700">
          <p className="text-sm text-center">
            Copyright © {new Date().getFullYear()} Sasthya Seba Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
