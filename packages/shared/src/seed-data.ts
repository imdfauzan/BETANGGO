import { Destination, Offer, TravelEdge, Disruption } from './index.js';

export const SEED_DESTINATIONS: Destination[] = [
  // ================= PALANGKA RAYA =================
  {
    id: 'dest-pky-01',
    slug: 'tn-sebangau-kereng',
    kind: 'attraction',
    region: 'palangka-raya',
    name: { id: 'Taman Nasional Sebangau (Dermaga Kereng Bangkirai)', en: 'Sebangau National Park (Kereng Bangkirai Pier)' },
    aliases: ['Sebangau', 'Kereng Bangkirai', 'Air Hitam'],
    summary: {
      id: 'Pintu masuk ke ekosistem gambut dan air hitam Sebangau dengan susur perahu tradisional.',
      en: 'The gateway to the peat swamp ecosystem and blackwater Sebangau via traditional boat tours.'
    },
    description: {
      id: 'Dermaga Kereng Bangkirai berjarak 15 menit dari pusat Palangka Raya. Terkenal dengan fenomena air hitam alami akibat pelepasan tanin daun gambut dan perahu hias Dayak.',
      en: 'Located 15 minutes from central Palangka Raya, famed for its natural black water peat phenomenon and Dayak decorative boats.'
    },
    tags: ['nature', 'river', 'wildlife', 'family'],
    geom: { lat: -2.3167, lng: 113.8833 },
    address: { id: 'Kereng Bangkirai, Sabangau, Palangka Raya', en: 'Kereng Bangkirai, Sabangau, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '07:00', close: '17:30', days: 'Senin - Minggu' },
    min_dwell_min: 90,
    max_dwell_min: 240,
    curated_rank: 1,
    price_estimate_idr: 35000,
    facilities: ['Dermaga', 'Warung Kuliner', 'Pemandu Lokal', 'Musholla', 'Parkir'],
    how_to_reach: { id: '15 km (25 menit) berkendara roda dua atau empat dari Bundaran Besar.', en: '15 km (25 mins) drive by car/motorbike from Bundaran Besar.' },
    hero_color: '#1F5A3F',
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-pky-02',
    slug: 'tugu-soekarno-pky',
    kind: 'attraction',
    region: 'palangka-raya',
    name: { id: 'Tugu Peletakan Batu Pertama Soekarno', en: 'President Soekarno First Stone Memorial' },
    aliases: ['Tugu Soekarno', 'Tugu Palangka Raya'],
    summary: {
      id: 'Titik nol bersejarah tempat Presiden Soekarno meresmikan pembangunan Palangka Raya tahun 1957.',
      en: 'Historical landmark where President Soekarno initiated the construction of Palangka Raya in 1957.'
    },
    description: {
      id: 'Berada persis di tepi Sungai Kahayan, tugu ini melambangkan cita-cita Bung Karno mendesain Palangka Raya sebagai calon ibu kota masa depan Indonesia dengan arsitektur penuh simbol kenegaraan.',
      en: 'Perched on the banks of the Kahayan River, this monument commemorates Soekarno vision of Palangka Raya as a planned national capital.'
    },
    tags: ['culture', 'history', 'city'],
    geom: { lat: -2.2081, lng: 113.9168 },
    address: { id: 'Jl. S. Parman, Palangka, Jekan Raya, Palangka Raya', en: 'Jl. S. Parman, Palangka, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '06:00', close: '21:00', days: 'Setiap Hari' },
    min_dwell_min: 45,
    max_dwell_min: 90,
    curated_rank: 3,
    price_estimate_idr: 5000,
    facilities: ['Taman Kota', 'Plaza Pejalan Kaki', 'Spot Foto Kahayan'],
    how_to_reach: { id: '5 menit jalan kaki dari pusat pertokoan atau Bundaran Besar.', en: '5 minutes walk from Bundaran Besar town center.' },
    hero_color: '#2F7A56',
    image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-pky-03',
    slug: 'museum-balanga',
    kind: 'attraction',
    region: 'palangka-raya',
    name: { id: 'Museum Balanga Kalimantan Tengah', en: 'Balanga Provincial Museum' },
    aliases: ['Balanga Museum', 'Museum Dayak'],
    summary: {
      id: 'Museum etnografi terlengkap memamerkan benda adat, artefak ritual Tiwah, dan senjata pusaka Dayak.',
      en: 'Comprehensive ethnographic museum exhibiting Dayak sacred artifacts, Tiwah ritual gear, and regalia.'
    },
    description: {
      id: 'Menyajikan siklus hidup suku Dayak dari kelahiran (Manyaki Pinang), inisiasi, pernikahan, hingga upacara kematian sakral Tiwah. Terdapat pula koleksi guci balanga kuno bernilai magis.',
      en: 'Showcases the life stages of Dayak culture including sacred Tiwah ceremonies and antique Chinese porcelain jars (Balanga).'
    },
    tags: ['culture', 'history', 'museum'],
    geom: { lat: -2.1895, lng: 113.8967 },
    address: { id: 'Jl. Tjilik Riwut Km. 2,5, Palangka Raya', en: 'Jl. Tjilik Riwut Km 2.5, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '08:00', close: '15:00', days: 'Senin - Sabtu' },
    min_dwell_min: 60,
    max_dwell_min: 150,
    curated_rank: 2,
    price_estimate_idr: 10000,
    facilities: ['Pemandu Edukasi', 'Auditorium', 'Toko Cinderamata Dayak'],
    how_to_reach: { id: '10 menit berkendara ke arah utara dari Bundaran Besar.', en: '10 mins drive north along Tjilik Riwut avenue.' },
    hero_color: '#E2B53A',
    image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-pky-04',
    slug: 'jembatan-kahayan-waterfront',
    kind: 'attraction',
    region: 'palangka-raya',
    name: { id: 'Jembatan Kahayan & Taman Pasuk Kameloh', en: 'Kahayan Bridge & Pasuk Kameloh Park' },
    aliases: ['Pasuk Kameloh', 'Sungai Kahayan'],
    summary: {
      id: 'Ikon modern Palangka Raya dengan pemandangan lalu lintas klotok sungai saat senja.',
      en: 'The signature steel-arch bridge spanning the Kahayan River with a riverside pedestrian park.'
    },
    description: {
      id: 'Pusat interaksi warga saat sore hari, menghadap jembatan merah megah sepanjang 640 meter. Sering menjadi lokasi festival budaya Isen Mulang.',
      en: 'A bustling riverside gathering spot with sunset river vistas and Dayak decorative motifs.'
    },
    tags: ['culture', 'river', 'city', 'relax'],
    geom: { lat: -2.2033, lng: 113.9214 },
    address: { id: 'Tepi Sungai Kahayan, Pahandut, Palangka Raya', en: 'Kahayan Riverfront, Pahandut, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '06:00', close: '22:00', days: 'Setiap Hari' },
    min_dwell_min: 45,
    max_dwell_min: 120,
    curated_rank: 4,
    price_estimate_idr: 0,
    facilities: ['Gazebo', 'Spot Foto', 'Dermaga Klotok Wisata'],
    how_to_reach: { id: 'Hanya 5 menit dari Bundaran Besar ke arah Pahandut.', en: '5 minutes drive east from the city center.' },
    hero_color: '#4E7F43',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-pky-stay-01',
    slug: 'hotel-rimba-kahayan',
    kind: 'lodging',
    region: 'palangka-raya',
    name: { id: 'Hotel Rimba Kahayan (DEMO)', en: 'Rimba Kahayan Boutique Hotel (DEMO)' },
    aliases: ['Rimba Kahayan Hotel'],
    summary: {
      id: 'Hotel bernuansa kayu ulin Dayak dan pemandangan hutan kota berfasilitas ramah lingkungan.',
      en: 'Boutique stay constructed with Dayak ironwood themes overlooking the urban forest canopy.'
    },
    description: {
      id: 'Penginapan tier menengah dengan interior anyaman rotan, sarapan kuliner lokal khas Kalteng, dan koneksi internet stabil untuk wisatawan.',
      en: 'Mid-tier stay featuring artisanal rattan furnishings, local breakfast specials, and dependable Wi-Fi.'
    },
    tags: ['stay', 'relax', 'culture'],
    lodging_tier: 'mid',
    geom: { lat: -2.215, lng: 113.905 },
    address: { id: 'Jl. RTA Milono Km. 1, Palangka Raya', en: 'Jl. RTA Milono Km 1, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '00:00', close: '23:59', days: '24 Jam' },
    min_dwell_min: 600,
    max_dwell_min: 1440,
    curated_rank: 5,
    price_estimate_idr: 475000,
    facilities: ['Kamar AC', 'Restoran Lokal', 'Wi-Fi Cepat', 'Resepsionis 24 Jam'],
    how_to_reach: { id: '12 menit dari Bandara Tjilik Riwut (PKY).', en: '12 mins from Tjilik Riwut Airport (PKY).' },
    hero_color: '#1F5A3F',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-pky-stay-02',
    slug: 'homestay-betang-asri',
    kind: 'lodging',
    region: 'palangka-raya',
    name: { id: 'Homestay Betang Asri (DEMO)', en: 'Betang Asri Cultural Homestay (DEMO)' },
    aliases: ['Betang Asri Homestay'],
    summary: {
      id: 'Penginapan hemat ramah kantong berkonsep rumah panggung ramah keluarga.',
      en: 'Budget-friendly homestay experience in a wooden stilt residence run by a Dayak host family.'
    },
    description: {
      id: 'Cocok bagi backpacker dan traveler mandiri yang ingin merasakan keramahan keluarga Dayak lokal di pusat kota Palangka Raya.',
      en: 'Ideal for independent travelers seeking authentic Dayak hospitality and budget comfort.'
    },
    tags: ['stay', 'budget', 'culture'],
    lodging_tier: 'budget',
    geom: { lat: -2.209, lng: 113.912 },
    address: { id: 'Jl. Rajawali No. 42, Palangka Raya', en: 'Jl. Rajawali No. 42, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '06:00', close: '23:00', days: 'Setiap Hari' },
    min_dwell_min: 600,
    max_dwell_min: 1440,
    curated_rank: 6,
    price_estimate_idr: 280000,
    facilities: ['Kipas/AC', 'Dapur Bersama', 'Kopi Pagi', 'Sewa Sepeda Motor'],
    how_to_reach: { id: '8 menit dari Terminal Bus WA Gara.', en: '8 mins from WA Gara Intercity Bus Station.' },
    hero_color: '#4E7F43',
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-pky-food-01',
    slug: 'resto-kampung-lauk',
    kind: 'restaurant',
    region: 'palangka-raya',
    name: { id: 'Rumah Makan Kampung Lauk Kahayan', en: 'Kampung Lauk Riverside Cuisine' },
    aliases: ['Kampung Lauk', 'Kuliner Dayak Kahayan'],
    summary: {
      id: 'Sentra kuliner tepi sungai menyajikan ikan bakar Patin, Baung, dan Juhu Umbut Rotan.',
      en: 'Renowned riverside restaurant serving charcoal-grilled river catfish and young rattan sprout soup.'
    },
    description: {
      id: 'Restoran terapung dengan pondok-pondok kayu di atas Sungai Kahayan. Menu wajib: Juhu Singkah Uwei (sayur umbut rotan muda), Ikan Lais Bakar, dan sambal Kandas Sarai.',
      en: 'A scenic stilt restaurant over the river. Signature dishes: Dayak young rattan shoot broth, grilled Lais fish, and lemongrass chili dip.'
    },
    tags: ['culinary', 'food', 'river'],
    dietary: ['halal'],
    geom: { lat: -2.198, lng: 113.928 },
    address: { id: 'Jl. Trans Kalimantan, Jembatan Kahayan Seberang', en: 'Across Kahayan Bridge, Palangka Raya' },
    opening_hours: { tz: 'Asia/Jakarta', open: '10:00', close: '21:30', days: 'Setiap Hari' },
    min_dwell_min: 60,
    max_dwell_min: 120,
    curated_rank: 7,
    price_estimate_idr: 65000,
    facilities: ['Pondok Lesehan', 'Musholla', 'Parkir Luas', 'Halal Terverifikasi'],
    how_to_reach: { id: 'Melewati Jembatan Kahayan ke sisi timur arah Pulang Pisau.', en: 'Cross the Kahayan Bridge eastwards.' },
    hero_color: '#E2B53A',
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },

  // ================= KOTAWARINGIN BARAT (KOBAR & TANJUNG PUTING) =================
  {
    id: 'dest-kbr-01',
    slug: 'tn-tanjung-puting-camp-leakey',
    kind: 'attraction',
    region: 'kobar',
    name: { id: 'Taman Nasional Tanjung Puting (Camp Leakey & Sekonyer)', en: 'Tanjung Puting National Park (Camp Leakey & Sekonyer River)' },
    aliases: ['Tanjung Puting', 'Camp Leakey', 'Sekonyer'],
    summary: {
      id: 'Pusat konservasi orangutan liar terbesar di dunia dijelajahi menggunakan kapal klotok kayu bertingkat.',
      en: 'World-famous wild orangutan sanctuary explored via multi-day traditional wooden klotok houseboats.'
    },
    description: {
      id: 'Didirikan oleh Dr. Birute Galdikas tahun 1971. Wisatawan menyusuri Sungai Sekonyer yang berkelok di tengah hutan hujan tropis sambil mengamati bekantan, burung rangkong, dan orangutan saat sesi pemberian makan harian.',
      en: 'Established by Dr. Birute Galdikas in 1971. Glide along the Sekonyer River under canopies of proboscis monkeys and hornbills to witness orangutans in their natural habitat.'
    },
    tags: ['nature', 'wildlife', 'river', 'adventure'],
    geom: { lat: -2.7667, lng: 111.9333 },
    address: { id: 'Kecamatan Kumai, Kotawaringin Barat', en: 'Kumai, Kotawaringin Barat Regency' },
    opening_hours: { tz: 'Asia/Jakarta', open: '06:00', close: '17:00', days: 'Setiap Hari' },
    min_dwell_min: 360,
    max_dwell_min: 2880,
    curated_rank: 1,
    price_estimate_idr: 150000,
    facilities: ['Dermaga Klotok', 'Ranger Station', 'Pos Medis Taman Nasional'],
    how_to_reach: { id: 'Terbang ke Pangkalan Bun (PKN), lalu 20 menit berkendara ke Pelabuhan Kumai untuk menaiki kapal klotok.', en: 'Fly to Pangkalan Bun (PKN), then 20 mins drive to Kumai Port to board your klotok.' },
    hero_color: '#0F2E21',
    image_url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-kbr-02',
    slug: 'istana-kuning-pangkalan-bun',
    kind: 'attraction',
    region: 'kobar',
    name: { id: 'Istana Kuning Kesultanan Kotawaringin', en: 'Istana Kuning Royal Palace' },
    aliases: ['Istana Kuning', 'Kesultanan Kutaringin'],
    summary: {
      id: 'Istana kayu ulin peninggalan satu-satunya kesultanan Melayu di Kalimantan Tengah.',
      en: 'The historic ironwood royal palace of the only Malay Sultanate in Central Kalimantan.'
    },
    description: {
      id: 'Dibangun pada abad ke-19 oleh Sultan Imanuddin. Dinamai Istana Kuning karena warna kuning melambangkan kehormatan kerajaan. Menyimpan meriam kuno, lukisan para raja, dan singgasana berukir Dayak-Melayu.',
      en: 'Constructed in the 19th century using solid ironwood timber, containing antique royal cannons and historical regalia.'
    },
    tags: ['culture', 'history'],
    geom: { lat: -2.684, lng: 111.625 },
    address: { id: 'Jl. Pangeran Antasari, Pangkalan Bun, Kobar', en: 'Jl. Pangeran Antasari, Pangkalan Bun' },
    opening_hours: { tz: 'Asia/Jakarta', open: '08:00', close: '16:00', days: 'Selasa - Minggu' },
    min_dwell_min: 45,
    max_dwell_min: 90,
    curated_rank: 3,
    price_estimate_idr: 10000,
    facilities: ['Pemandu Sejarah', 'Pelataran Istana', 'Cinderamata'],
    how_to_reach: { id: '10 menit dari Bandara Iskandar Pangkalan Bun.', en: '10 mins drive from Iskandar Airport Pangkalan Bun.' },
    hero_color: '#E2B53A',
    image_url: 'https://images.unsplash.com/photo-1548625361-195972855146?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },
  {
    id: 'dest-kbr-stay-01',
    slug: 'rimba-ecolodge-sekonyer',
    kind: 'lodging',
    region: 'kobar',
    name: { id: 'Rimba Ecolodge Sekonyer (DEMO)', en: 'Rimba Ecolodge Tanjung Puting (DEMO)' },
    aliases: ['Rimba Ecolodge'],
    summary: {
      id: 'Penginapan ekologis di tepi Sungai Sekonyer yang hanya dapat diakses dengan perahu.',
      en: 'Secluded rainforest ecolodge perched on the Sekonyer River accessible exclusively by riverboat.'
    },
    description: {
      id: 'Lodge konservasi dengan jembatan kanopi kayu, bertenaga surya parsial, dan kesempatan mendengarkan suara sahut-sahutan satwa hutan di pagi hari.',
      en: 'Conservation lodge with elevated wooden walkways, solar amenities, and pristine wildlife sounds.'
    },
    tags: ['stay', 'nature', 'wildlife', 'relax'],
    lodging_tier: 'upper',
    geom: { lat: -2.75, lng: 111.91 },
    address: { id: 'Tepi Sungai Sekonyer, TN Tanjung Puting, Kumai', en: 'Sekonyer Riverfront, Tanjung Puting' },
    opening_hours: { tz: 'Asia/Jakarta', open: '00:00', close: '23:59', days: '24 Jam' },
    min_dwell_min: 720,
    max_dwell_min: 2880,
    curated_rank: 2,
    price_estimate_idr: 1250000,
    facilities: ['Bungalow Kayu Bersih', 'Makan Penuh (Full Board)', 'Kelambu Anti-Nyamuk', 'Dermaga Pribadi'],
    how_to_reach: { id: '1,5 jam perjalanan kapal klotok dari Pelabuhan Kumai.', en: '1.5 hours scenic klotok cruise from Kumai Port.' },
    hero_color: '#1F5A3F',
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },

  // ================= GUNUNG MAS =================
  {
    id: 'dest-gms-01',
    slug: 'rumah-betang-tumbang-anoi',
    kind: 'attraction',
    region: 'gunung-mas',
    name: { id: 'Rumah Betang Adat Tumbang Anoi', en: 'Historical Betang House of Tumbang Anoi' },
    aliases: ['Betang Tumbang Anoi', 'Huma Betang Anoi'],
    summary: {
      id: 'Situs bersejarah Rapat Damai Tumbang Anoi 1894 yang menyatukan seluruh suku Dayak se-Borneo.',
      en: 'The monumental stilt longhouse where the historic 1894 Pan-Borneo Dayak Peace Accord was ratified.'
    },
    description: {
      id: 'Rumah panggung kayu ulin raksasa bertiang belasan meter. Di sinilah pertemuan akbar seluruh tetua Dayak Kalimantan memutuskan penghentian tradisi perang antarsuku dan mengokohkan falsafah hidup Huma Betang.',
      en: 'A colossal Dayak ironwood longhouse on towering pillars. The site where tribal chiefs convened to end intertribal headhunting warfare.'
    },
    tags: ['culture', 'history', 'adventure'],
    geom: { lat: -0.92, lng: 113.38 },
    address: { id: 'Desa Tumbang Anoi, Damang Batu, Gunung Mas', en: 'Tumbang Anoi, Damang Batu, Gunung Mas' },
    opening_hours: { tz: 'Asia/Jakarta', open: '08:00', close: '17:00', days: 'Setiap Hari' },
    min_dwell_min: 120,
    max_dwell_min: 360,
    curated_rank: 1,
    price_estimate_idr: 25000,
    facilities: ['Pemandu Tokoh Adat', 'Ruang Tamu Betang', 'Spot Foto Arsitektur'],
    how_to_reach: { id: '4–5 jam berkendara mobil gardan ganda dari Palangka Raya melewati Kuala Kurun.', en: '4–5 hours scenic 4WD overland expedition from Palangka Raya via Kuala Kurun.' },
    hero_color: '#E2B53A',
    image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  },

  // ================= KOTAWARINGIN TIMUR (SAMPIT) =================
  {
    id: 'dest-ktm-01',
    slug: 'pantai-ujung-pandaran',
    kind: 'attraction',
    region: 'kotim',
    name: { id: 'Pantai Ujung Pandaran', en: 'Ujung Pandaran Coastal Beach' },
    aliases: ['Ujung Pandaran', 'Pantai Sampit'],
    summary: {
      id: 'Hamparan pasir putih menghadap Laut Jawa dengan panorama matahari terbit dan terbenam.',
      en: 'Extensive white sandy beach facing the Java Sea, noted for both sunrise and sunset panoramas.'
    },
    description: {
      id: 'Terletak di pesisir selatan Kotim. Terkenal dengan pondok wisata di atas pasir, tradisi Simah Laut tahunan masyarakat nelayan, serta hutan bakau alami di sekitarnya.',
      en: 'A coastal retreat on the southern tip of Kotim, renowned for coastal cottages, coastal ceremonies, and mangrove estuaries.'
    },
    tags: ['nature', 'beach', 'relax'],
    geom: { lat: -3.05, lng: 113.01 },
    address: { id: 'Kecamatan Teluk Sampit, Kotawaringin Timur', en: 'Teluk Sampit, Kotawaringin Timur' },
    opening_hours: { tz: 'Asia/Jakarta', open: '06:00', close: '18:00', days: 'Setiap Hari' },
    min_dwell_min: 120,
    max_dwell_min: 360,
    curated_rank: 2,
    price_estimate_idr: 15000,
    facilities: ['Pondok Pesisir', 'Warung Kelapa Muda & Seafood', 'Parkir'],
    how_to_reach: { id: '2 jam berkendara ke arah selatan dari pusat kota Sampit.', en: '2 hours drive south from downtown Sampit.' },
    hero_color: '#9CC48C',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    is_demo: true
  }
];

export const SEED_OFFERS: Offer[] = [
  {
    id: 'off-klotok-01',
    destination_id: 'dest-kbr-01',
    partner_name: 'Sekonyer Klotok Eco Tour (DEMO)',
    kind: 'klotok_charter',
    name: { id: 'Paket Sewa Klotok 3 Hari 2 Malam (All-In)', en: 'Klotok Charter 3D2N Expedition (All-In)' },
    unit: 'per_group',
    price_idr: 3800000,
    capacity_pax: 4,
    min_duration_days: 3,
    instant_confirm: false,
    payment_methods: ['qris', 'card']
  },
  {
    id: 'off-sebangau-boat',
    destination_id: 'dest-pky-01',
    partner_name: 'Koperasi Dermaga Kereng Bangkirai (DEMO)',
    kind: 'ticket',
    name: { id: 'Sewa Perahu Tradisional Susur Air Hitam Sebangau (1 Jam)', en: 'Blackwater River Canoe Safari (1 Hour)' },
    unit: 'per_group',
    price_idr: 250000,
    capacity_pax: 5,
    instant_confirm: true,
    payment_methods: ['qris', 'card']
  },
  {
    id: 'off-hotel-rimba-room',
    destination_id: 'dest-pky-stay-01',
    partner_name: 'Hotel Rimba Kahayan (DEMO)',
    kind: 'room',
    name: { id: 'Kamar Superior Ulin (Termasuk Sarapan)', en: 'Superior Ironwood Room (Breakfast Included)' },
    unit: 'per_night',
    price_idr: 475000,
    capacity_pax: 2,
    instant_confirm: true,
    payment_methods: ['qris', 'card']
  },
  {
    id: 'off-homestay-room',
    destination_id: 'dest-pky-stay-02',
    partner_name: 'Homestay Betang Asri (DEMO)',
    kind: 'room',
    name: { id: 'Kamar Standar Kayu Bersama', en: 'Standard Wooden Room' },
    unit: 'per_night',
    price_idr: 280000,
    capacity_pax: 2,
    instant_confirm: true,
    payment_methods: ['qris', 'card']
  },
  {
    id: 'off-ecolodge-room',
    destination_id: 'dest-kbr-stay-01',
    partner_name: 'Rimba Ecolodge Sekonyer (DEMO)',
    kind: 'room',
    name: { id: 'Bungalow Rimba Sungai (Full Board)', en: 'Rainforest River Bungalow (Full Board)' },
    unit: 'per_night',
    price_idr: 1250000,
    capacity_pax: 2,
    instant_confirm: false,
    payment_methods: ['qris', 'card']
  },
  {
    id: 'off-driver-pky',
    destination_id: 'dest-pky-01',
    partner_name: 'Dayak Wheels Transport (DEMO)',
    kind: 'car_rental',
    name: { id: 'Sewa Mobil + Driver Kalteng (Harian)', en: 'Daily Car Rental with Local Driver' },
    unit: 'per_day',
    price_idr: 650000,
    capacity_pax: 5,
    instant_confirm: true,
    payment_methods: ['qris', 'card']
  }
];

export const SEED_EDGES: TravelEdge[] = [
  { from: 'dest-pky-stay-01', to: 'dest-pky-01', mode: 'car', minutes: 25, cost_idr: 45000, per: 'per_group' },
  { from: 'dest-pky-01', to: 'dest-pky-food-01', mode: 'car', minutes: 20, cost_idr: 40000, per: 'per_group' },
  { from: 'dest-pky-food-01', to: 'dest-pky-02', mode: 'walk', minutes: 10, cost_idr: 0, per: 'per_person' },
  { from: 'dest-pky-02', to: 'dest-pky-04', mode: 'walk', minutes: 8, cost_idr: 0, per: 'per_person' },
  { from: 'dest-pky-04', to: 'dest-pky-03', mode: 'car', minutes: 12, cost_idr: 25000, per: 'per_group' },
  { from: 'dest-pky-03', to: 'dest-pky-stay-01', mode: 'car', minutes: 15, cost_idr: 30000, per: 'per_group' },
  { from: 'palangka-raya', to: 'kobar', mode: 'flight', minutes: 55, cost_idr: 850000, per: 'per_person' },
  { from: 'palangka-raya', to: 'gunung-mas', mode: 'car', minutes: 270, cost_idr: 450000, per: 'per_group' },
  { from: 'dest-kbr-01', to: 'dest-kbr-stay-01', mode: 'boat', minutes: 45, cost_idr: 0, per: 'per_group' }
];

export const SEED_DISRUPTIONS: Disruption[] = [
  {
    id: 'disrupt-01',
    region: 'palangka-raya',
    title: {
      id: 'Banjir Musiman di Dermaga Kereng Bangkirai',
      en: 'Seasonal High Water at Kereng Bangkirai Pier'
    },
    description: {
      id: 'Air sungai meluap sementara setinggi 30 cm di pelataran dermaga susur perahu Sebangau.',
      en: 'Temporary river surge of 30 cm inundating the dock approach at Sebangau boat pier.'
    },
    severity: 'moderate',
    affected_destination_ids: ['dest-pky-01'],
    active_until: '2026-11-09T18:00:00+07:00',
    alternative_suggestion: {
      id: 'Ganti dengan kunjungan Danau Tahai atau Nyaru Menteng Orangutan Center yang aman.',
      en: 'Substitute with Tahai Lake or Nyaru Menteng Orangutan Sanctuary which remains accessible.'
    }
  }
];

export const EMERGENCY_CONTACTS = [
  {
    id: 'emg-01',
    name: 'RSUD dr. Doris Sylvanus Palangka Raya',
    category: 'medical',
    phone: '(0536) 3224695',
    address: 'Jl. Tambun Bungai No. 4, Palangka Raya',
    notes: 'Unit Gawat Darurat (UGD) 24 Jam - Rujukan Utama Kalteng'
  },
  {
    id: 'emg-02',
    name: 'Basarnas Kalimantan Tengah (Pencarian & Pertolongan)',
    category: 'sar',
    phone: '115 / (0536) 3222115',
    address: 'Jl. Tjilik Riwut Km. 5, Palangka Raya',
    notes: 'Evakuasi darurat perairan, sungai, dan kawasan hutan'
  },
  {
    id: 'emg-03',
    name: 'Polda Kalimantan Tengah (Sentra Pelayanan)',
    category: 'police',
    phone: '110 / (0536) 3221110',
    address: 'Jl. Tjilik Riwut Km. 1, Palangka Raya',
    notes: 'Layanan keamanan & kepolisian turis 24 Jam'
  },
  {
    id: 'emg-04',
    name: 'RSUD Sultan Imanuddin Pangkalan Bun',
    category: 'medical',
    phone: '(0532) 21404',
    address: 'Jl. Sutan Syahrir No. 17, Pangkalan Bun',
    notes: 'UGD 24 Jam untuk wilayah Kobar & Tanjung Puting'
  }
];

