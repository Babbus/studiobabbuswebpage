import type { Project } from "@/types/content";

const projectData: Project[] = [
  {
    slug: "pocket-warriors-ost",
    title: "Pocket Warriors Original Soundtrack",
    year: 2021,
    category: "Music",
    roles: ["Composer", "Producer"],
    tools: ["Pro Tools", "Ableton Live"],
    summary: "Official soundtrack featuring loopable tracks tailored to gameplay pacing.",
    media: [
      { type: "audio", url: "https://embed.music.apple.com/tr/album/pocket-warriors-original-soundtrack/1570914706" },
    ],
    links: [
      { label: "Studio Portfolio", url: "https://flyingss.com/portfolio/pocket-warriors/" },
      { label: "Apple Music", url: "https://music.apple.com/tr/album/pocket-warriors-original-soundtrack/1570914706" },
    ],
    tags: ["OST", "Nintendo"],
  },
  {
    slug: "after-relief",
    title: "After Relief — Single",
    year: 2021,
    category: "Music",
    roles: ["Composer", "Producer"],
    tools: ["Ableton Live"],
    summary: "A follow-up to Relief, this single carries forward the ambient-electronic aesthetic with more layered atmospheres.",
    media: [
      { type: "audio", url: "https://embed.music.apple.com/tr/album/after-relief-single/1566484863" },
    ],
    links: [{ label: "Apple Music", url: "https://music.apple.com/tr/album/after-relief-single/1566484863" }],
    tags: ["Electronic", "Ambient"],
  },
  {
    slug: "relief",
    title: "Relief — Single",
    year: 2021,
    category: "Music",
    roles: ["Composer", "Producer"],
    tools: ["Ableton Live"],
    summary: "Relief marked my first independent release, establishing the foundation of my electronic style.",
    media: [
      { type: "audio", url: "https://embed.music.apple.com/tr/album/relief-single/1566478822" },
    ],
    links: [{ label: "Apple Music", url: "https://music.apple.com/tr/album/relief-single/1566478822" }],
    tags: ["Electronic", "Debut"],
  },
  {
    slug: "angel-eyes-vr",
    title: "Angel Eyes VR Graphic Novel",
    year: 2022,
    category: "Game",
    roles: ["Sound Designer", "Dolby Atmos Mix"],
    tools: ["Pro Tools", "FMOD", "Dolby Atmos"],
    summary: "Angel Eyes was an experimental VR graphic novel designed for Oculus, where audio played a central role in narrative immersion. I created the sound effects and contributed to the mixing process, which was finalized in Dolby Atmos.",
    media: [
      { type: "video", url: "https://youtu.be/H7CT8DZ5VQc?si=I-h6iv3RJ66A0Z2j" },
    ],
    links: [
      { label: "SideQuest VR", url: "https://sidequestvr.com/app/18377/angel-eyes-vr-graphic-novel" },
      { label: "YouTube", url: "https://youtu.be/H7CT8DZ5VQc?si=I-h6iv3RJ66A0Z2j" }
    ],
    tags: ["VR", "Oculus", "Narrative"],
  },
  {
    slug: "blissful-oblivion-ep",
    title: "Blissful Oblivion — EP",
    year: 2022,
    category: "Music",
    roles: ["Composer", "Producer", "Mixing", "Mastering"],
    tools: ["Ableton Live", "Pro Tools", "Serum"],
    summary: "Hybrid electronic textures moving between ambient and melodic electronica.",
    media: [
      { type: "audio", url: "https://embed.music.apple.com/tr/album/blissful-oblivion-ep/1641449867" },
    ],
    links: [{ label: "Apple Music", url: "https://music.apple.com/us/album/blissful-oblivion-ep/1623661670" }],
    tags: ["Electronic", "Ambient"],
  },
  {
    slug: "liquid-love",
    title: "Liquid Love — Single",
    year: 2022,
    category: "Music",
    roles: ["Composer", "Producer"],
    tools: ["Ableton Live", "Serum"],
    summary: "A smooth, electronic-driven track blending mellow synth tones with dynamic production.",
    media: [
      { type: "audio", url: "https://embed.music.apple.com/tr/album/liquid-love-single/1638189346" },
    ],
    links: [{ label: "Apple Music", url: "https://music.apple.com/tr/album/liquid-love-single/1638189346" }],
    tags: ["Electronic", "Single"],
  },
  {
    slug: "binance-weeknd-metaverse",
    title: "Binance x The Weeknd Metaverse Project",
    year: 2023,
    category: "Game",
    roles: ["Sound Designer"],
    tools: ["FMOD", "Pro Tools"],
    summary: "Collaborating on Binance's Metaverse project tied to The Weeknd, I designed sound effects for the puzzle cube mechanic and immersive metaverse environments.",
    links: [
      { label: "Experience", url: "https://enterthedimension.com/" }
    ],
    tags: ["Metaverse", "Interactive", "Puzzle"],
  },
  {
    slug: "fitbit-commercials",
    title: "FITBIT Commercials (Europe)",
    year: 2023,
    category: "Ads",
    roles: ["Sound Designer", "Mixer"],
    tools: ["Pro Tools"],
    summary: "I designed and mixed audio for five FITBIT commercials aired across Europe, including the 'Sarah,' 'Brigitte,' and 'Ellie' spots in March, and the 'Rochelle' and 'Tamara' spots in November.",
    links: [
      { label: "YouTube Playlist", url: "https://youtube.com/playlist?list=PLRRr0VygojS-ZSd5oqTYnjXOtx1ojQW8v" }
    ],
    tags: ["Commercial", "Europe", "Brand"],
  },
  {
    slug: "european-inventor-award",
    title: "European Inventor Award 2023 — 'A Letter to My Younger Self'",
    year: 2023,
    category: "Film/TV",
    roles: ["Sound Designer"],
    tools: ["Pro Tools"],
    summary: "For the European Inventor Award 2023, I designed the sound for the short film 'A Letter to My Younger Self,' featuring Carmen Hijosa.",
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=9b7qn_Qk1E4" }
    ],
    tags: ["Documentary", "Award", "EPO"],
  },
  {
    slug: "nadir-ben",
    title: "Nadir Ben (Short Film)",
    year: 2023,
    category: "Film/TV",
    roles: ["Sound Designer", "Mixer"],
    tools: ["Pro Tools"],
    summary: "For the short film Nadir Ben, I designed and mixed the full soundscape, aligning with the director's vision for emotional intensity and atmosphere.",
    links: [
      { label: "Vimeo", url: "https://vimeo.com/1000030011" }
    ],
    tags: ["Short Film", "Narrative"],
  },
  {
    slug: "emanet",
    title: "Emanet (Short Film)",
    year: 2023,
    category: "Film/TV",
    roles: ["Sound Designer"],
    tools: ["Pro Tools"],
    summary: "In Emanet, I contributed as the sound designer, focusing on atmospheres and effects that supported the film's tone.",
    links: [
      { label: "Vimeo", url: "https://vimeo.com/1055673222" }
    ],
    tags: ["Short Film", "Atmosphere"],
  },
  {
    slug: "animation-86Px2izo8_E",
    title: "Animation Project — Sound Design",
    year: 2024,
    category: "Animation",
    roles: ["Sound Designer", "Audio Post-Production"],
    tools: ["Pro Tools", "FMOD"],
    summary: "Sound design and audio post-production for animated content.",
    media: [
      { type: "video", url: "https://youtu.be/86Px2izo8_E" },
    ],
    links: [
      { label: "YouTube", url: "https://youtu.be/86Px2izo8_E" }
    ],
    tags: ["Animation", "Sound Design"],
  },
  {
    slug: "animation-3AZrQTtDC7M",
    title: "Animation Project — Audio Mix",
    year: 2024,
    category: "Animation",
    roles: ["Sound Designer", "Mixer"],
    tools: ["Pro Tools", "Ableton Live"],
    summary: "Audio mixing and sound design for animated production.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch?v=3AZrQTtDC7M" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=3AZrQTtDC7M" }
    ],
    tags: ["Animation", "Mixing"],
  },
  {
    slug: "animation-w4U_qm6tnTc",
    title: "Animation Project — SFX Design",
    year: 2024,
    category: "Animation",
    roles: ["SFX Designer", "Audio Editor"],
    tools: ["Pro Tools", "Sound Libraries"],
    summary: "Custom SFX design and audio editing for animation.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch/w4U_qm6tnTc" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch/w4U_qm6tnTc" }
    ],
    tags: ["Animation", "SFX"],
  },
  {
    slug: "animation-T2LYTiK5Y1s",
    title: "Animation Project — Audio Production",
    year: 2024,
    category: "Animation",
    roles: ["Audio Producer", "Sound Designer"],
    tools: ["Pro Tools", "Unity"],
    summary: "Complete audio production pipeline for animated content.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch/T2LYTiK5Y1s" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch/T2LYTiK5Y1s" }
    ],
    tags: ["Animation", "Audio Production"],
  },
  {
    slug: "animation-n0IU0vaE420",
    title: "Animation Project — Sound Design & Mix",
    year: 2024,
    category: "Animation",
    roles: ["Sound Designer", "Mixer"],
    tools: ["Pro Tools", "FMOD"],
    summary: "Sound design and final mixing for animated project.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch/n0IU0vaE420" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch/n0IU0vaE420" }
    ],
    tags: ["Animation", "Sound Design", "Mixing"],
  },
  {
    slug: "game-4fUYrXJlSYg",
    title: "Game Project — Interactive Audio",
    year: 2024,
    category: "Game",
    roles: ["Game Audio Designer", "FMOD Implementation"],
    tools: ["FMOD", "Unity", "Pro Tools"],
    summary: "Interactive audio system design and implementation for game project.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch/4fUYrXJlSYg" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch/4fUYrXJlSYg" }
    ],
    tags: ["Game Audio", "FMOD", "Unity"],
  },
  {
    slug: "game-3pIigYXWyW0",
    title: "Game Project — Dynamic Sound System",
    year: 2024,
    category: "Game",
    roles: ["Audio Programmer", "Sound Designer"],
    tools: ["Unity", "FMOD", "C#"],
    summary: "Dynamic sound system programming and audio design for gameplay.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch/3pIigYXWyW0" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch/3pIigYXWyW0" }
    ],
    tags: ["Game Audio", "Programming", "Dynamic Audio"],
  },
  {
    slug: "game-ZnBy8I4laOw",
    title: "Game Project — Audio Integration",
    year: 2024,
    category: "Game",
    roles: ["Audio Integrator", "Game Sound Designer"],
    tools: ["Unity", "FMOD", "Pro Tools"],
    summary: "Complete audio integration and sound design for game development.",
    media: [
      { type: "video", url: "https://www.youtube.com/watch/ZnBy8I4laOw" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch/ZnBy8I4laOw" }
    ],
    tags: ["Game Audio", "Integration", "Unity"],
  },
  {
    slug: "fix-fixer",
    title: "Fix Fixer",
    year: 2024,
    category: "Game",
    roles: ["Audio Lead", "Sound Design", "Music Integration", "FMOD/Unity implementation"],
    tools: ["FMOD", "Unity", "Pro Tools"],
    summary: "Fix Fixer is a roguelike action RPG with physics-based destruction mechanics. As Audio Lead, I was responsible for the full audio pipeline: designing sound effects, integrating adaptive music, and implementing interactive systems in Unity through FMOD.",
    links: [
      { label: "Steam", url: "https://store.steampowered.com/app/2442910/Fix_Fixer/" }
    ],
    tags: ["Roguelike", "Action RPG", "Steam"],
  },
  {
    slug: "be-a-car-roblox",
    title: "Be a Car (Roblox)",
    year: 2024,
    category: "Game",
    roles: ["Sound Designer", "Audio Implementation"],
    tools: ["Roblox Studio", "Pro Tools"],
    summary: "Sound design and audio implementation for Roblox gaming experience.",
    links: [
      { label: "Roblox", url: "https://www.roblox.com/tr/games/107326628277908/Be-a-Car" },
      { label: "YouTube", url: "https://youtu.be/0KtFopfvopU" }
    ],
    tags: ["Roblox", "Gaming Platform"],
  },
  {
    slug: "world-io-roblox",
    title: "World.io (Roblox)",
    year: 2024,
    category: "Game",
    roles: ["Sound Designer", "Audio Implementation"],
    tools: ["Roblox Studio", "Pro Tools"],
    summary: "Audio design and implementation for World.io Roblox experience.",
    links: [
      { label: "Roblox", url: "https://www.roblox.com/tr/games/86089763581353/World-io" },
      { label: "YouTube", url: "https://youtu.be/DfsHYF7PqJM" }
    ],
    tags: ["Roblox", "Gaming Platform"],
  },
  {
    slug: "game-cq0iS40ujWM",
    title: "Roblox Brainrot Roller SFX",
    year: 2025,
    category: "Game",
    roles: ["Sound Designer"],
    tools: ["FMOD", "Unity", "Pro Tools"],
    summary: "Gameplay SFX and mix.",
    media: [
      { type: "video", url: "https://youtu.be/cq0iS40ujWM" },
    ],
    links: [
      { label: "YouTube", url: "https://youtu.be/cq0iS40ujWM" }
    ],
    tags: ["Gameplay", "SFX"],
  },
  {
    slug: "beat-your-brainrot-sfx-showcase",
    title: "Beat Your Brainrot SFX showcase",
    year: 2025,
    category: "Game",
    roles: ["Sound Designer"],
    tools: ["FMOD", "Unity", "Pro Tools"],
    summary: "Beat Your Brainrot SFX showcase",
    media: [
      { type: "video", url: "https://www.youtube.com/watch?v=a-VOzpEwtVQ" },
    ],
    links: [
      { label: "YouTube", url: "https://www.youtube.com/watch?v=a-VOzpEwtVQ" }
    ],
    tags: ["SFX", "Showcase"],
  },
];

export const projects: Project[] = [...projectData].reverse(); 