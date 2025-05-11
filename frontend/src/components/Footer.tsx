"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, AlertCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom pt-12 pb-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Section - First column, full height */}
          <div className="space-y-6 lg:row-span-2">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-36">
                <Image
                  src="https://ext.same-assets.com/690263052/3307663837.svg"
                  alt="Sasthya Seba"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-200 leading-relaxed">
              We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-secondary">Contact Us</h4>
              <Link href="tel:09611530530" className=" text-lg font-semibold hover:text-secondary transition-colors flex items-center gap-2">
                <span className="bg-secondary/20 p-1 rounded">09611 530 530</span>
              </Link>
              <Link href="tel:01405600700" className=" text-lg font-semibold hover:text-secondary transition-colors flex items-center gap-2">
                <span className="bg-secondary/20 p-1 rounded">01405 600 700</span>
              </Link>
            </div>
            
            {/* Social Media Icons */}
            <div>
              <h4 className="font-medium text-secondary mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                <Link href="https://www.facebook.com/SasthyaSebaLtd" className="bg-white/10 hover:bg-secondary p-2.5 rounded-full transition-all hover:scale-110" aria-label="Facebook">
                  <Facebook size={18} />
                </Link>
                <Link href="https://www.linkedin.com/company/sasthya-seba-limited/" className="bg-white/10 hover:bg-secondary p-2.5 rounded-full transition-all hover:scale-110" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </Link>
                <Link href="https://www.youtube.com/channel/UCqiXeyO6RKDc3z-LSpD0HTg" className="bg-white/10 hover:bg-secondary p-2.5 rounded-full transition-all hover:scale-110" aria-label="YouTube">
                  <Youtube size={18} />
                </Link>
                <Link href="https://twitter.com/SasthyaSeba" className="bg-white/10 hover:bg-secondary p-2.5 rounded-full transition-all hover:scale-110" aria-label="Twitter">
                  <Twitter size={18} />
                </Link>
                <Link href="https://www.instagram.com/sasthyasebaltd/" className="bg-white/10 hover:bg-secondary p-2.5 rounded-full transition-all hover:scale-110" aria-label="Instagram">
                  <Instagram size={18} />
                </Link>

              </div>
            </div>
          </div>

          {/* Top Row: 3 link sections */}
          {/* Sasthya Seba Ltd Section */}
          <div className="md:pl-6 lg:col-start-2">
            <h3 className="text-lg text-white font-semibold mb-5 flex items-center border-b border-secondary pb-2">
              <Image
                src="https://ext.same-assets.com/690263052/1684320437.svg"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              See a Doctor Ltd.
            </h3>
            <ul className="space-y-3 grid grid-cols-1">
              {["About Us", "Contact", "Services", "Blog", "Diseases and Conditions", "Privacy Policy", "Terms & Conditions"].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`} 
                    className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Patients Section */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-5 flex items-center border-b border-secondary pb-2">
              <Image
                src="https://ext.same-assets.com/690263052/2230474228.svg"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              For Patients
            </h3>
            <ul className="space-y-3 grid grid-cols-1">
              <li>
                <Link href="/faq" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ's
                </Link>
              </li>
              <li>
                <Link href="/search?type=doctor" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Find Doctors
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/patient-no-show-policy" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Patient No-Show Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-and-refund-policy" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Doctors/Organisations Section */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-5 flex items-center border-b border-secondary pb-2">
              <Image
                src="https://ext.same-assets.com/690263052/697087813.svg"
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              For Doctors/Organisations
            </h3>
            <ul className="space-y-3 grid grid-cols-1">
              <li>
                <Link href="/doctor/login" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Login as Doctor
                </Link>
              </li>
              <li>
                <Link href="/doctor/register" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Work with Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/patient-no-show-policy" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Patient No-Show Policy
                </Link>
              </li>
              <li>
                <Link href="/account-delete-request" className="text-sm hover:text-secondary transition-all hover:translate-x-1 inline-flex items-center group">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Account Deletion
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Section - Spanning columns 2-4 in second row */}
          <div className="lg:col-span-3 lg:col-start-2  rounded-lg lg:mt-0">
            <div className="max-w-2xl mx-auto text-center">
              <p className="mb-4 text-gray-200">Stay updated with our latest health tips and services</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full py-3 px-10 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder-gray-300"
                  />
                </div>
                <button className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 sm:mb-0">
            Copyright © {new Date().getFullYear()} See a Doctor Limited. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="text-xs text-gray-300 hover:text-secondary">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-xs text-gray-300 hover:text-secondary">Terms</Link>
            <Link href="/sitemap" className="text-xs text-gray-300 hover:text-secondary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
