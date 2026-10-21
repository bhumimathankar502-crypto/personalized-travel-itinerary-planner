"""
Comprehensive Indian Travel Knowledge Base
Contains authentic destinations, attractions, dining experiences, transit modes,
and realistic cost estimations in Indian Rupees (INR).
"""

from typing import Dict, Any, List

CURATED_DESTINATIONS: List[Dict[str, Any]] = [
    {
        "id": "indore",
        "name": "Indore",
        "state": "Madhya Pradesh",
        "tagline": "India's Cleanest City & Street Food Paradise",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "tags": ["Food & Culinary", "Heritage", "Cleanest City", "Markets"],
        "image_url": "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2800.0,
        "popular_attractions": ["Sarafa Night Food Market", "Rajwada Palace", "Chappan Dukan", "Lal Bagh Palace", "Khajrana Ganesh Temple"],
        "famous_foods": ["Indori Poha-Jalebi", "Sev Tamatar", "Bhutte Ka Kees", "Garadu", "Dahi Vada at Joshi"],
        "transit_tip": "Clean city buses (iBus BRTS), e-rickshaws, and auto rickshaws with metered/fixed fares.",
        "stay_options": {
            "Budget": {"name": "Zostel Indore or Central Station Stays", "cost": 1200, "type": "Backpacker Hostel"},
            "Moderate": {"name": "Lemon Tree Hotel or WOW Hotel", "cost": 3400, "type": "3-Star Boutique Hotel"},
            "Luxury": {"name": "Sayaji Hotel Indore or Radisson Blu", "cost": 7500, "type": "5-Star Luxury"}
        }
    },
    {
        "id": "ujjain",
        "name": "Ujjain",
        "state": "Madhya Pradesh",
        "tagline": "City of Mahakal & Ancient Spiritual Vibrations",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 2,
        "tags": ["Spiritual & Pilgrimage", "Heritage", "Temples", "Shipra River"],
        "image_url": "https://images.unsplash.com/photo-1621644805417-64016f4e1f76?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2200.0,
        "popular_attractions": ["Mahakaleshwar Jyotirlinga (Bhasma Aarti)", "Mahakal Lok Corridor", "Ram Ghat Shipra Aarti", "Kal Bhairav Temple", "Vedh Shala (Observatory)"],
        "famous_foods": ["Dal Bafla", "Kachori & Sabzi", "Malpua", "Bhang Thandai"],
        "transit_tip": "Shared auto rickshaws, e-rickshaws, and walking within temple complexes.",
        "stay_options": {
            "Budget": {"name": "Mahakal Dharamshala or Yatri Niwas", "cost": 800, "type": "Pilgrim Guest House"},
            "Moderate": {"name": "Anjushree Hotel or Imperial Hotel", "cost": 2800, "type": "Comfort Hotel"},
            "Luxury": {"name": "Rudraksh Club & Resort", "cost": 6500, "type": "Heritage Luxury Resort"}
        }
    },
    {
        "id": "bhopal",
        "name": "Bhopal",
        "state": "Madhya Pradesh",
        "tagline": "City of Lakes & Ancient Rock Art Gateways",
        "best_time_to_visit": "July to March",
        "ideal_duration_days": 3,
        "tags": ["Lakes", "Heritage", "Rock Shelters", "Tribal Culture"],
        "image_url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2500.0,
        "popular_attractions": ["Upper Lake (Bhojtal) & VIP Road", "Bhimbetka Caves (UNESCO)", "Sanchi Stupa Gateway", "Taj-ul-Masajid", "Tribal Museum"],
        "famous_foods": ["Bhopali Gosht Korma / Paneer Rezala", "Poha Jalebi", "Bhopali Paan", "Sulemani Chai"],
        "transit_tip": "BCLL City buses, Ola/Uber cabs, and auto rickshaws.",
        "stay_options": {
            "Budget": {"name": "Lake View Backpacker Hostel", "cost": 1000, "type": "Hostel"},
            "Moderate": {"name": "Noor-Us-Sabah Palace or Hotel Lake View Ashok", "cost": 3600, "type": "Heritage Hotel"},
            "Luxury": {"name": "Jehan Numa Palace Hotel", "cost": 8500, "type": "Heritage Luxury"}
        }
    },
    {
        "id": "gwalior",
        "name": "Gwalior",
        "state": "Madhya Pradesh",
        "tagline": "The Pearl in the Necklace of Forts of India",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 2,
        "tags": ["Heritage", "Forts", "Classical Music", "Palaces"],
        "image_url": "https://images.unsplash.com/photo-1609137144822-261556a31c50?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2300.0,
        "popular_attractions": ["Gwalior Fort (Man Mandir Palace)", "Jai Vilas Palace & Museum", "Teli Ka Mandir & Saas Bahu Temple", "Tomb of Tansen", "Sun Temple"],
        "famous_foods": ["Bedai with Aloo Sabzi", "Gajak & Morena Rewri", "Petha", "Kachori"],
        "transit_tip": "Auto rickshaws and private taxis are ideal for fort hills and palaces.",
        "stay_options": {
            "Budget": {"name": "Hotel Gwalior Regency or Guest House", "cost": 1100, "type": "Budget Hotel"},
            "Moderate": {"name": "Neemrana's Deo Bagh or Clarks INN", "cost": 3200, "type": "Heritage Haveli"},
            "Luxury": {"name": "Taj Usha Kiran Palace", "cost": 9500, "type": "Royal Palace"}
        }
    },
    {
        "id": "jaipur",
        "name": "Jaipur",
        "state": "Rajasthan",
        "tagline": "The Pink City of Royal Forts & Vibrant Bazaars",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "tags": ["Royal Heritage", "Architecture", "Shopping", "Food"],
        "image_url": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3500.0,
        "popular_attractions": ["Amber Fort & Light Show", "Hawa Mahal", "City Palace & Jantar Mantar", "Nahargarh Fort Sunset View", "Johari & Bapu Bazaar"],
        "famous_foods": ["Dal Baati Churma", "Pyaaz Kachori at Rawat", "Laal Maas / Gatte ki Sabzi", "Ghewar at LMB"],
        "transit_tip": "Jaipur Metro for city center; e-rickshaws and cabs for fort climbs.",
        "stay_options": {
            "Budget": {"name": "Moustache Hostel Jaipur or Zostel", "cost": 1100, "type": "Hostel"},
            "Moderate": {"name": "Alsisar Haveli or Umaid Bhawan Heritage", "cost": 3800, "type": "Heritage Haveli"},
            "Luxury": {"name": "Rambagh Palace or Jai Mahal Palace", "cost": 16000, "type": "Luxury Heritage Palace"}
        }
    },
    {
        "id": "udaipur",
        "name": "Udaipur",
        "state": "Rajasthan",
        "tagline": "The City of Lakes and Romantic Sunset Palaces",
        "best_time_to_visit": "September to March",
        "ideal_duration_days": 3,
        "tags": ["Romance", "Lakes", "Royal Palaces", "Art"],
        "image_url": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3600.0,
        "popular_attractions": ["City Palace & Crystal Gallery", "Lake Pichola Sunset Boat Ride", "Jag Mandir Island", "Saheliyon Ki Bari", "Bagore Ki Haveli Dharohar Dance"],
        "famous_foods": ["Rajasthani Thali at Natraj", "Mirchi Vada", "Ghewar", "Kachori at Shastri Circle"],
        "transit_tip": "Walking along the old city ghats; autorickshaws for outer lake points.",
        "stay_options": {
            "Budget": {"name": "Zostel Udaipur or Banjara Hostel", "cost": 1200, "type": "Lake-view Hostel"},
            "Moderate": {"name": "Amet Haveli or Jagat Niwas Palace", "cost": 4500, "type": "Heritage Haveli"},
            "Luxury": {"name": "Taj Lake Palace or The Oberoi Udaivilas", "cost": 22000, "type": "5-Star Ultra Luxury"}
        }
    },
    {
        "id": "jodhpur",
        "name": "Jodhpur",
        "state": "Rajasthan",
        "tagline": "The Sun City & The Blue City of Mehrangarh",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 2,
        "tags": ["Blue City", "Forts", "Desert Culture", "Textiles"],
        "image_url": "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3000.0,
        "popular_attractions": ["Mehrangarh Fort & Flying Fox Zip", "Jaswant Thada", "Blue City Walking Tour (Navchokiya)", "Clock Tower & Sardar Market", "Umaid Bhawan Palace"],
        "famous_foods": ["Mawa Kachori at Jodhpur Sweets", "Mirchi Bada at Shahi Samosa", "Ker Sangri", "Makhaniya Lassi"],
        "transit_tip": "Tuk-tuks are best for navigating the narrow medieval lanes.",
        "stay_options": {
            "Budget": {"name": "The Blue House or Zostel Jodhpur", "cost": 1000, "type": "Boutique Hostel"},
            "Moderate": {"name": "Pal Haveli or Haveli Inn Pal", "cost": 3200, "type": "Heritage Stay"},
            "Luxury": {"name": "Taj Hari Mahal or Umaid Bhawan Palace", "cost": 14000, "type": "Palace Suite"}
        }
    },
    {
        "id": "jaisalmer",
        "name": "Jaisalmer",
        "state": "Rajasthan",
        "tagline": "The Golden City & The Living Fort of Thar",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "tags": ["Thar Desert", "Living Fort", "Camel Safari", "Dunes"],
        "image_url": "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3200.0,
        "popular_attractions": ["Jaisalmer Living Fort (Sonar Qila)", "Sam Sand Dunes Sunset Camel Safari", "Patwon Ki Haveli", "Gadisar Lake Boating", "Desert Cultural Centre"],
        "famous_foods": ["Gatte ki Sabzi", "Dal Baati Churma", "Kadhi Pakora", "Ghotua Ladoo"],
        "transit_tip": "Walking inside the fort; jeep transfers for Sam / Kuldhara desert dunes.",
        "stay_options": {
            "Budget": {"name": "Hotel Tokyo Palace or Mystic Jaisalmer", "cost": 1200, "type": "Fort View Stay"},
            "Moderate": {"name": "Sam Sand Dunes Swiss Tents Camp", "cost": 3500, "type": "Desert Camp with Folk Dance"},
            "Luxury": {"name": "Suryagarh Jaisalmer", "cost": 15000, "type": "Luxury Fortress Resort"}
        }
    },
    {
        "id": "delhi",
        "name": "Delhi",
        "state": "Delhi NCR",
        "tagline": "The Soul of India - Mughals, Monuments, and Metro",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "tags": ["Heritage", "Capital", "Street Food", "Shopping"],
        "image_url": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3800.0,
        "popular_attractions": ["Qutub Minar & Mehrauli Complex", "Humayun's Tomb", "Red Fort & Chandni Chowk Rikshaw Ride", "India Gate & Kartavya Path", "Lotus Temple"],
        "famous_foods": ["Chole Bhature at Sita Ram", "Paranthe Wali Gali", "Butter Chicken at Moti Mahal", "Dilli Chaat"],
        "transit_tip": "Delhi Metro (world class, air-conditioned, fast), Uber/Ola cabs, auto-rickshaws.",
        "stay_options": {
            "Budget": {"name": "Hosteller Delhi or Zostel South Delhi", "cost": 1200, "type": "Youth Hostel"},
            "Moderate": {"name": "Bloomrooms Janpath or Connaught Place", "cost": 3900, "type": "Modern Central Hotel"},
            "Luxury": {"name": "The Imperial New Delhi or Taj Mahal Hotel", "cost": 14500, "type": "5-Star Heritage"}
        }
    },
    {
        "id": "agra",
        "name": "Agra",
        "state": "Uttar Pradesh",
        "tagline": "The City of the Taj Mahal & Mughal Splendour",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 2,
        "tags": ["Wonder of the World", "Mughal Architecture", "UNESCO"],
        "image_url": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3200.0,
        "popular_attractions": ["Taj Mahal at Sunrise", "Agra Fort", "Fatehpur Sikri Royal Complex", "Mehtab Bagh Sunset Taj View", "Itmad-ud-Daulah (Baby Taj)"],
        "famous_foods": ["Agra Petha at Panchhi Petha", "Bedmi Poori & Jalebi", "Mughlai Biryani", "Dalmoth"],
        "transit_tip": "Battery e-rickshaws inside eco-zone around Taj; Ola/Uber cabs for Fatehpur Sikri.",
        "stay_options": {
            "Budget": {"name": "Zostel Agra or Joey's Hostel Taj View", "cost": 1100, "type": "Hostel"},
            "Moderate": {"name": "Tajview - IHCL SeleQtions or ITC Mughal", "cost": 4200, "type": "Taj View Hotel"},
            "Luxury": {"name": "The Oberoi Amarvilas (Direct Taj View)", "cost": 30000, "type": "Luxury Ultra Palace"}
        }
    },
    {
        "id": "varanasi",
        "name": "Varanasi",
        "state": "Uttar Pradesh",
        "tagline": "The Spiritual Heartbeat of India on the Holy Ganga",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "tags": ["Ganga Aarti", "Spiritual", "Ancient City", "Ghats"],
        "image_url": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2600.0,
        "popular_attractions": ["Dashashwamedh Ghat Evening Ganga Aarti", "Subah-e-Banaras Sunrise Boat Ride", "Kashi Vishwanath Temple Corridor", "Sarnath Buddha Deer Park", "Assi Ghat & Manikarnika Ghat"],
        "famous_foods": ["Banarasi Kachori Sabzi", "Tamatar Chaat at Kashi Chaat Bhandar", "Malaiyo (Winter Special)", "Banarasi Paan", "Blue Lassi"],
        "transit_tip": "Boats along the Ganges; walking through alleys (galis); e-rickshaws outside ghat zones.",
        "stay_options": {
            "Budget": {"name": "Moustache Varanasi or Zostel Varanasi", "cost": 1000, "type": "Ghat-side Hostel"},
            "Moderate": {"name": "BrijRama Palace Heritage or Scindhia Guest House", "cost": 4200, "type": "Heritage Riverside"},
            "Luxury": {"name": "Taj Ganges Varanasi", "cost": 11000, "type": "5-Star Luxury"}
        }
    },
    {
        "id": "mumbai",
        "name": "Mumbai",
        "state": "Maharashtra",
        "tagline": "The City of Dreams & Coastal Arabian Sea Spirit",
        "best_time_to_visit": "November to February",
        "ideal_duration_days": 3,
        "tags": ["Metropolis", "Coastline", "Bollywood", "Colonial Heritage"],
        "image_url": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 4500.0,
        "popular_attractions": ["Gateway of India & Colaba Causeway", "Marine Drive (Queen's Necklace) Sunset", "Chhatrapati Shivaji Maharaj Terminus (UNESCO)", "Elephanta Caves Boat Excursion", "Bandra Bandstand & Worli Sea Link"],
        "famous_foods": ["Vada Pav at Ashok / Kirti College", "Pav Bhaji at Sardar / Cannon", "Bombay Sandwich", "Irani Chai & Bun Maska at Kyani & Co"],
        "transit_tip": "Mumbai Local Trains, Mumbai Metro, iconic black-and-yellow Premier Padmini/Wagon-R taxis.",
        "stay_options": {
            "Budget": {"name": "Backpacker Panda Colaba or Zostel Mumbai", "cost": 1500, "type": "Hostel"},
            "Moderate": {"name": "Residency Hotel Fort or Hotel Suba Palace", "cost": 4800, "type": "City Heritage Hotel"},
            "Luxury": {"name": "The Taj Mahal Palace Colaba", "cost": 22000, "type": "Historic 5-Star"}
        }
    },
    {
        "id": "pune",
        "name": "Pune",
        "state": "Maharashtra",
        "tagline": "The Cultural Capital of Maharashtra & Maratha Heritage",
        "best_time_to_visit": "July to February",
        "ideal_duration_days": 2,
        "tags": ["Culture", "Maratha History", "Forts", "Cafes"],
        "image_url": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3000.0,
        "popular_attractions": ["Shaniwar Wada Palace Fort", "Sinhagad Fort Trek", "Aga Khan Palace", "Dagdusheth Halwai Ganpati Temple", "Koregaon Park Cafe Culture"],
        "famous_foods": ["Misal Pav at Kata Kirr", "Bakharwadi at Chitale Bandhu", "Mastani Drink at Sujata", "Pithla Bhakri at Sinhagad"],
        "transit_tip": "Pune Metro, PMPML buses, auto rickshaws, and ride-hailing cabs.",
        "stay_options": {
            "Budget": {"name": "Backpackers Hostel Koregaon Park", "cost": 1000, "type": "Hostel"},
            "Moderate": {"name": "The Pride Hotel or St Laurn Hotel", "cost": 3400, "type": "Comfort Hotel"},
            "Luxury": {"name": "JW Marriott Hotel Pune", "cost": 10500, "type": "5-Star Luxury"}
        }
    },
    {
        "id": "nagpur",
        "name": "Nagpur",
        "state": "Maharashtra",
        "tagline": "The Orange City & Tiger Capital of India",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 2,
        "tags": ["Tiger Capital", "Zero Mile", "Orange Groves", "Cuisine"],
        "image_url": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2600.0,
        "popular_attractions": ["Deekshabhoomi Sacred Stupa", "Futala Lake Fountain & Promenade", "Zero Mile Stone Marker", "Pench Tiger Reserve Gateway", "Sitabuldi Fort"],
        "famous_foods": ["Saoji Spicy Curry (Mutton / Paneer)", "Tarri Poha at Keshav", "Nagpur Oranges & Orange Barfi", "Samosa Chaat"],
        "transit_tip": "Nagpur Metro (Maha Metro) and auto rickshaws.",
        "stay_options": {
            "Budget": {"name": "Hotel Orient Grand or Railway Retiring Rooms", "cost": 1100, "type": "Budget Hotel"},
            "Moderate": {"name": "The Pride Hotel Nagpur or Hotel Centre Point", "cost": 3200, "type": "Business Comfort"},
            "Luxury": {"name": "Radisson Blu Hotel Nagpur", "cost": 7500, "type": "5-Star Luxury"}
        }
    },
    {
        "id": "goa",
        "name": "Goa",
        "state": "Goa",
        "tagline": "Sun, Sand, Portuguese Heritage & Susegad Vibes",
        "best_time_to_visit": "October to April",
        "ideal_duration_days": 4,
        "tags": ["Beaches", "Portuguese Heritage", "Nightlife", "Water Sports"],
        "image_url": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 4000.0,
        "popular_attractions": ["Basilica of Bom Jesus & Old Goa", "Aguada Fort & Lighthouse", "Palolem & Agonda South Goa Beaches", "Anjuna & Vagator Sunsets", "Dudhsagar Waterfalls Trek"],
        "famous_foods": ["Goan Fish Curry & Rice", "Bebinca Dessert", "Poi with Chorizo / Mushroom Xacuti", "Feni Cocktail"],
        "transit_tip": "Renting a self-drive scooter (₹350-500/day) is the most popular way to explore Goa.",
        "stay_options": {
            "Budget": {"name": "Zostel Goa or Jungle Hostel Vagator", "cost": 1200, "type": "Beach Hostel"},
            "Moderate": {"name": "Heritage Portuguese Villa in Fontainhas", "cost": 4200, "type": "Heritage Homestay"},
            "Luxury": {"name": "Taj Exotica Resort & Spa South Goa", "cost": 18000, "type": "5-Star Beach Resort"}
        }
    },
    {
        "id": "manali",
        "name": "Manali",
        "state": "Himachal Pradesh",
        "tagline": "Snow Peaks, Beas River & Himalayan Mountain Bliss",
        "best_time_to_visit": "March to June & December to February (Snow)",
        "ideal_duration_days": 4,
        "tags": ["Mountains", "Snow", "Adventure Sports", "Pine Valleys"],
        "image_url": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3400.0,
        "popular_attractions": ["Solang Valley Paragliding & Skiing", "Atal Tunnel & Sissu Lahaul Day Trip", "Hadimba Devi Ancient Wooden Temple", "Old Manali Cafes & Apple Orchards", "Jogini Waterfall Trek"],
        "famous_foods": ["Siddu with Ghee", "Himalayan Trout Fish", "Tudkiya Bhath", "Tibetan Momos & Thukpa"],
        "transit_tip": "Local 4x4 cabs for Rohtang/Sissu; walking and rented motorcycles for Old Manali.",
        "stay_options": {
            "Budget": {"name": "Zostel Old Manali or The Hosteller", "cost": 1100, "type": "Mountain Hostel"},
            "Moderate": {"name": "Apple Country Resort or Snow Valley Resorts", "cost": 3800, "type": "Pine Valley Resort"},
            "Luxury": {"name": "The Himalayan Castle Luxury Resort", "cost": 12000, "type": "Castle Resort"}
        }
    },
    {
        "id": "shimla",
        "name": "Shimla",
        "state": "Himachal Pradesh",
        "tagline": "The Queen of Hills & British Colonial Summer Capital",
        "best_time_to_visit": "March to June & December to January",
        "ideal_duration_days": 3,
        "tags": ["Hill Station", "Toy Train", "Colonial Architecture", "Pines"],
        "image_url": "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3300.0,
        "popular_attractions": ["Kalka-Shimla UNESCO Toy Train Ride", "The Ridge & Christ Church", "Jakhoo Temple & Giant Hanuman Statue", "Mall Road Walking Promenade", "Viceregal Lodge (Indian Institute of Advanced Study)"],
        "famous_foods": ["Chha Gosht / Madra", "Thukpa", "Himachali Dham", "Fresh Baked Goods at Trishool"],
        "transit_tip": "Mall Road is pedestrian-only; local taxis and ropeways for outer hills.",
        "stay_options": {
            "Budget": {"name": "Zostel Homes Shimla or Hillside Homestay", "cost": 1200, "type": "Homestay"},
            "Moderate": {"name": "The Clarkes Hotel (Heritage)", "cost": 4200, "type": "Colonial Heritage Hotel"},
            "Luxury": {"name": "The Oberoi Cecil Shimla or Wildflower Hall", "cost": 19000, "type": "Luxury Heritage Estate"}
        }
    },
    {
        "id": "rishikesh",
        "name": "Rishikesh",
        "state": "Uttarakhand",
        "tagline": "Yoga Capital of the World & Ganga River Adventure",
        "best_time_to_visit": "September to May",
        "ideal_duration_days": 3,
        "tags": ["Yoga & Wellness", "River Rafting", "Ganga Aarti", "Spirituality"],
        "image_url": "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2600.0,
        "popular_attractions": ["White Water Rafting (Shivpuri to Lakshman Jhula)", "Triveni Ghat Evening Maha Aarti", "Beatles Ashram (Chaurasi Kutia)", "Neer Garh Waterfall Trek", "Parmarth Niketan Yoga Session"],
        "famous_foods": ["Ayurvedic Thali", "Aloo Poori at Chotiwala", "Oats Banana Pancakes at Little Buddha Cafe", "Kullad Chai"],
        "transit_tip": "Walking across Ram Jhula and Janki Jhula suspension bridges; shared autos (Vikram).",
        "stay_options": {
            "Budget": {"name": "Zostel Rishikesh Tapovan or Live Free Hostel", "cost": 900, "type": "Riverside Hostel"},
            "Moderate": {"name": "Aloha on the Ganges or Divine Resort", "cost": 3800, "type": "River View Resort"},
            "Luxury": {"name": "Ananda in the Himalayas or Taj Rishikesh", "cost": 28000, "type": "World Luxury Wellness Resort"}
        }
    },
    {
        "id": "srinagar",
        "name": "Srinagar",
        "state": "Jammu & Kashmir",
        "tagline": "Paradise on Earth - Dal Lake, Shikaras & Mughal Gardens",
        "best_time_to_visit": "April to October & December to February (Snow)",
        "ideal_duration_days": 4,
        "tags": ["Paradise", "Dal Lake Houseboats", "Shikara", "Mughal Gardens"],
        "image_url": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 4200.0,
        "popular_attractions": ["Dal Lake Shikara Ride & Floating Flower Market", "Historic Cedar Houseboat Stay", "Nishat & Shalimar Mughal Gardens", "Pari Mahal Sunset View", "Day Trip to Gulmarg Gondola / Pahalgam Valley"],
        "famous_foods": ["Kashmiri Wazwan (Rogan Josh / Gushtaba / Dum Aloo)", "Kahwa Tea with Saffron & Almonds", "Modur Pulao", "Nadru Yakhni"],
        "transit_tip": "Shikaras on the lake; authorized tourist taxis for Gulmarg/Pahalgam circuits.",
        "stay_options": {
            "Budget": {"name": "Zostel Srinagar or Heritage Homestay", "cost": 1300, "type": "Homestay"},
            "Moderate": {"name": "Traditional Hand-Carved Cedar Houseboat on Nigeen Lake", "cost": 4500, "type": "Houseboat Stay"},
            "Luxury": {"name": "The Lalit Grand Palace Srinagar", "cost": 17000, "type": "Royal Palace on Dal Lake"}
        }
    },
    {
        "id": "bengaluru",
        "name": "Bengaluru",
        "state": "Karnataka",
        "tagline": "Garden City, Craft Microbreweries & Tech Innovation",
        "best_time_to_visit": "Year-round pleasant climate",
        "ideal_duration_days": 2,
        "tags": ["Garden City", "Microbreweries", "South Indian Breakfast", "Palaces"],
        "image_url": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3800.0,
        "popular_attractions": ["Lalbagh Botanical Gardens & Glass House", "Bangalore Palace", "Cubbon Park Walk & Visvesvaraya Museum", "Indiranagar Craft Microbreweries", "Tipu Sultan's Summer Palace"],
        "famous_foods": ["Benne Masala Dosa at Vidyarthi Bhavan or CTR", "Filter Coffee at Brahmin's Coffee Bar", "Bisi Bele Bath", "Craft Brews at Toit"],
        "transit_tip": "Namma Metro (Purple and Green lines) avoid traffic; Ola/Uber/Rapido auto.",
        "stay_options": {
            "Budget": {"name": "Zostel Bangalore Indiranagar", "cost": 1100, "type": "Hostel"},
            "Moderate": {"name": "The Chancery Pavilion or Bloomrooms", "cost": 3600, "type": "Central Business Hotel"},
            "Luxury": {"name": "The Leela Palace Bengaluru", "cost": 16000, "type": "Grand Royal Palace Hotel"}
        }
    },
    {
        "id": "hyderabad",
        "name": "Hyderabad",
        "state": "Telangana",
        "tagline": "The City of Pearls, Nizami Splendour & Royal Biryani",
        "best_time_to_visit": "October to March",
        "ideal_duration_days": 3,
        "tags": ["Nizami Heritage", "Biryani", "Charminar", "Pearls"],
        "image_url": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3200.0,
        "popular_attractions": ["Charminar & Laad Bazaar Pearl Shopping", "Golconda Fort & Sound-and-Light Show", "Chowmahalla Palace", "Hussain Sagar Lake & Buddha Statue Boat Cruise", "Ramoji Film City"],
        "famous_foods": ["Hyderabadi Dum Biryani at Bawarchi / Paradise", "Haleem at Pista House", "Irani Chai with Osmania Biscuits at Nimrah", "Double Ka Meetha"],
        "transit_tip": "Hyderabad Metro, TSRTC buses, and auto-rickshaws.",
        "stay_options": {
            "Budget": {"name": "Shepherd Stories Hostel Jubilee Hills", "cost": 1000, "type": "Hostel"},
            "Moderate": {"name": "Mercure Hyderabad KCP or Golkonda Hotel", "cost": 3500, "type": "Comfort Hotel"},
            "Luxury": {"name": "Taj Falaknuma Palace (Nizam's Royal Palace)", "cost": 32000, "type": "Historic Nizam Palace"}
        }
    },
    {
        "id": "chennai",
        "name": "Chennai",
        "state": "Tamil Nadu",
        "tagline": "Gateway to South India - Carnatic Music, Shore Temples & Marina",
        "best_time_to_visit": "November to February",
        "ideal_duration_days": 2,
        "tags": ["Carnatic Music", "Beaches", "Dravidian Temples", "Silk"],
        "image_url": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3000.0,
        "popular_attractions": ["Kapaleeshwarar Temple (Mylapore)", "Marina Beach (World's 2nd longest natural beach)", "San Thome Basilica", "Government Museum & National Art Gallery", "Mahabalipuram UNESCO Shore Temples Day Trip"],
        "famous_foods": ["Ghee Roast Dosa at Murugan Idli Shop", "South Indian Filter Kaapi", "Chettinad Chicken / Paneer", "Sundal on Marina Beach"],
        "transit_tip": "Chennai Metro, MRTS local suburban trains, and ride apps.",
        "stay_options": {
            "Budget": {"name": "Red Lollipop Hostel or Zostel Chennai", "cost": 950, "type": "Hostel"},
            "Moderate": {"name": "The Residency Towers or Quality Inn Sabari", "cost": 3200, "type": "City Hotel"},
            "Luxury": {"name": "ITC Grand Chola or Taj Coromandel", "cost": 13000, "type": "Palace Luxury"}
        }
    },
    {
        "id": "kochi",
        "name": "Kochi",
        "state": "Kerala",
        "tagline": "Queen of the Arabian Sea - Chinese Fishing Nets & Spice Ports",
        "best_time_to_visit": "September to March",
        "ideal_duration_days": 3,
        "tags": ["Spice Trade", "Backwaters", "Colonial History", "Kathakali"],
        "image_url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 3100.0,
        "popular_attractions": ["Fort Kochi Chinese Fishing Nets at Sunset", "Mattancherry Dutch Palace & Jewish Synagogue", "Kathakali Evening Dance Center", "St. Francis Church", "Kerala Backwater Day Cruise"],
        "famous_foods": ["Kerala Sadya on Banana Leaf", "Appam with Ishtu (Stew)", "Karimeen Pollichathu (Pearl Spot Fish)", "Banana Fritters (Pazham Pori)"],
        "transit_tip": "Kochi Water Metro (modern electric boats connecting islands!), Kochi Metro, and tuk-tuks.",
        "stay_options": {
            "Budget": {"name": "Zostel Kochi or Santa Maria Hostel Fort Kochi", "cost": 1000, "type": "Heritage Hostel"},
            "Moderate": {"name": "Old Harbour Hotel or Brunton Boatyard", "cost": 4200, "type": "Colonial Waterfront Stay"},
            "Luxury": {"name": "Grand Hyatt Kochi Bolgatty", "cost": 11500, "type": "Waterfront Luxury Resort"}
        }
    },
    {
        "id": "kolkata",
        "name": "Kolkata",
        "state": "West Bengal",
        "tagline": "City of Joy - Colonial Splendour, Literature & Sweet Treats",
        "best_time_to_visit": "October to March (Durga Puja festive peak)",
        "ideal_duration_days": 3,
        "tags": ["Culture & Joy", "Colonial Architecture", "Literature", "Sweets"],
        "image_url": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2700.0,
        "popular_attractions": ["Victoria Memorial & Maidan Walk", "Howrah Bridge & Flower Market at Sunrise", "Dakshineswar Kali Temple & Belur Math", "Indian Museum (Oldest in Asia)", "College Street Boi Para & Coffee House"],
        "famous_foods": ["Kolkata Kathi Rolls at Nizam's", "Kolkata Biryani with Aloo", "Rosogolla & Sandesh at KC Das", "Puchka at Vivekananda Park"],
        "transit_tip": "Historic Trams, Kolkata Metro (including underwater Hooghly line!), Yellow Ambassador Taxis, and Hooghly Ferries.",
        "stay_options": {
            "Budget": {"name": "Backpackers Park Kolkata or Homestay", "cost": 950, "type": "City Hostel"},
            "Moderate": {"name": "The Peerless Inn or The Elgin Fairlawn", "cost": 3300, "type": "Colonial Heritage Hotel"},
            "Luxury": {"name": "The Oberoi Grand Kolkata or ITC Sonar", "cost": 11000, "type": "Colonial Grand 5-Star"}
        }
    },
    {
        "id": "darjeeling",
        "name": "Darjeeling",
        "state": "West Bengal",
        "tagline": "Champagne of Teas & Majestic Kanchenjunga Sunrises",
        "best_time_to_visit": "March to May & October to December",
        "ideal_duration_days": 3,
        "tags": ["Himalayas", "Tea Gardens", "UNESCO Toy Train", "Sunrises"],
        "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2900.0,
        "popular_attractions": ["Tiger Hill 04:00 AM Sunrise over Mt. Kanchenjunga", "Darjeeling Himalayan Toy Train Joyride", "Happy Valley Tea Estate Tour", "Himalayan Mountaineering Institute & Zoo", "Peace Pagoda & Batasia Loop"],
        "famous_foods": ["Darjeeling First Flush Black Tea", "Steamed Tingmo & Tibetan Shyaphale", "Momos with Churpi Chutney", "Thukpa"],
        "transit_tip": "Shared 4WD Sumos for mountain roads; walking through Chowrasta Mall.",
        "stay_options": {
            "Budget": {"name": "Hideout Travel Cafe & Hostel", "cost": 1000, "type": "Mountain Hostel"},
            "Moderate": {"name": "The Elgin Darjeeling or Windamere Hotel", "cost": 4500, "type": "Colonial British Heritage"},
            "Luxury": {"name": "Glenburn Tea Estate Luxury", "cost": 24000, "type": "Boutique Tea Planter Bungalow"}
        }
    },
    {
        "id": "guwahati",
        "name": "Guwahati",
        "state": "Assam",
        "tagline": "Gateway to the Northeast & The Mighty Brahmaputra",
        "best_time_to_visit": "October to April",
        "ideal_duration_days": 2,
        "tags": ["Northeast Gateway", "Brahmaputra River", "Spiritual", "Wildlife"],
        "image_url": "https://images.unsplash.com/photo-1608999383953-d61f5d9c1ace?auto=format&fit=crop&w=800&q=80",
        "average_daily_budget_inr": 2600.0,
        "popular_attractions": ["Kamakhya Shakti Peeth Temple (Nilachal Hill)", "Brahmaputra River Sunset Dinner Cruise", "Umananda Island (Smallest Inhabited River Island)", "Assam State Museum & Srimanta Sankaradeva Kalakshetra", "Pobitora Wildlife Sanctuary (One-Horned Rhinos)"],
        "famous_foods": ["Assamese Thali (Khar, Masor Tenga fish curry)", "Pitha Rice Cake", "Smoked Pork / Duck Curry with Bamboo Shoot", "Assam CTC Golden Tea"],
        "transit_tip": "Guwahati ropeway over Brahmaputra, city buses, and app-based cabs.",
        "stay_options": {
            "Budget": {"name": "Hostel Guwahati or Brahmaputra Guest House", "cost": 900, "type": "Hostel"},
            "Moderate": {"name": "Hotel Dynasty or Kiranshree Grand", "cost": 3100, "type": "River City Hotel"},
            "Luxury": {"name": "Radisson Blu Hotel Guwahati or Vivanta", "cost": 8500, "type": "5-Star Luxury"}
        }
    }
]

def find_curated_destination(query: str) -> Dict[str, Any] | None:
    """Find matching curated destination by name or alias"""
    q = query.strip().lower()
    for d in CURATED_DESTINATIONS:
        if (d["name"].lower() in q) or (q in d["name"].lower()) or (d["id"] in q):
            return d
    return None
