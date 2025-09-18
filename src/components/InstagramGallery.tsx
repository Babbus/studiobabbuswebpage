"use client";

import { useState } from "react";
import { instagramPosts, instagramProfile } from "@/content/instagram";
import Link from "next/link";

export default function InstagramGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight">Instagram Gallery</h3>
        <Link 
          href={instagramProfile.profileUrl} 
          target="_blank"
          className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-300 underline underline-offset-2"
        >
          View on Instagram
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {instagramPosts.map((post, index) => (
          <button
            key={post.id}
            onClick={() => setSelectedImage(index)}
            className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] hover:border-teal-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/10"
          >
            {/* Try to load actual image, fallback to placeholder */}
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to gradient placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div class="absolute inset-0 grid place-items-center">
                        <div class="text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                          ${index % 3 === 0 ? '🎵' : index % 3 === 1 ? '🎧' : '🎤'}
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
            
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs font-medium text-white/90 line-clamp-2">{post.caption}</p>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-teal-400/0 group-hover:bg-teal-400/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-fade-in" 
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="w-full max-w-lg bg-background/95 rounded-xl p-4 animate-scale-in border border-white/10" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-teal-900/40 via-teal-700/20 to-transparent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={instagramPosts[selectedImage].imageUrl}
                alt={instagramPosts[selectedImage].caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 opacity-30 grid place-items-center">
                        <div class="text-center space-y-4">
                          <div class="text-6xl">
                            ${selectedImage % 3 === 0 ? '🎵' : selectedImage % 3 === 1 ? '🎧' : '🎤'}
                          </div>
                          <p class="text-lg font-medium">Instagram Post</p>
                          <p class="text-sm opacity-70">Image placeholder</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
            <div className="mt-4 space-y-3">
              <p className="text-sm">{instagramPosts[selectedImage].caption}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-60">{instagramPosts[selectedImage].date}</span>
                <Link
                  href={instagramPosts[selectedImage].url}
                  target="_blank"
                  className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-300 underline underline-offset-2"
                >
                  View on Instagram
                </Link>
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 w-full rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="text-xs opacity-60 text-center">
        <p>Follow <Link href={instagramProfile.profileUrl} target="_blank" className="text-teal-400 hover:text-teal-300 transition-colors duration-300">@{instagramProfile.username}</Link> for more updates</p>
      </div>
    </div>
  );
} 