export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_veg: boolean;
  is_spicy: boolean;
}

export const menuData: MenuItem[] = [
  // MOMOS & BAOS
  { id: "mb1", name: "Veg Momos (Steamed)", price: 175, description: "", category: "Momos & Baos", is_veg: true, image_url: "", is_spicy: false },
  { id: "mb2", name: "Veg Momos (Fried)", price: 195, description: "", category: "Momos & Baos", is_veg: true, image_url: "", is_spicy: false },
  { id: "mb3", name: "Chicken Momos (Steamed)", price: 225, description: "", category: "Momos & Baos", is_veg: false, image_url: "", is_spicy: false },
  { id: "mb4", name: "Chicken Momos (Fried)", price: 245, description: "", category: "Momos & Baos", is_veg: false, image_url: "", is_spicy: false },
  { id: "mb5", name: "Special Jhol Momos", price: 255, description: "", category: "Momos & Baos", is_veg: true, image_url: "", is_spicy: true },
  { id: "mb6", name: "Cottage Cheese Bao", price: 365, description: "", category: "Momos & Baos", is_veg: true, image_url: "", is_spicy: false },
  { id: "mb7", name: "Fried Chicken Bao", price: 485, description: "", category: "Momos & Baos", is_veg: false, image_url: "", is_spicy: false },
  { id: "mb8", name: "Butter Chicken Bao", price: 495, description: "", category: "Momos & Baos", is_veg: false, image_url: "", is_spicy: false },

  // CHINESE & THAI STARTERS
  { id: "cts1", name: "Crispy Honey Chilli Potato", price: 275, description: "", category: "Chinese & Thai Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "cts2", name: "Veg Spring Roll", price: 235, description: "", category: "Chinese & Thai Starters", is_veg: true, image_url: "", is_spicy: false },
  { id: "cts3", name: "Chicken Spring Roll", price: 355, description: "", category: "Chinese & Thai Starters", is_veg: false, image_url: "", is_spicy: false },
  { id: "cts4", name: "Manchurian in Schezwan Sauce", price: 295, description: "", category: "Chinese & Thai Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "cts5", name: "Chilli Mushroom", price: 335, description: "", category: "Chinese & Thai Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "cts6", name: "Chilli Paneer", price: 385, description: "", category: "Chinese & Thai Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "cts7", name: "Dragon Chicken", price: 515, description: "", category: "Chinese & Thai Starters", is_veg: false, image_url: "", is_spicy: true },
  { id: "cts8", name: "Jack Daniels Chicken Wings", price: 495, description: "", category: "Chinese & Thai Starters", is_veg: false, image_url: "", is_spicy: false },
  { id: "cts9", name: "Wok Tossed Chilli Chicken", price: 515, description: "", category: "Chinese & Thai Starters", is_veg: false, image_url: "", is_spicy: true },
  { id: "cts10", name: "Chilli Basil Fish", price: 545, description: "", category: "Chinese & Thai Starters", is_veg: false, image_url: "", is_spicy: true },
  { id: "cts11", name: "Chilli Prawns", price: 555, description: "", category: "Chinese & Thai Starters", is_veg: false, image_url: "", is_spicy: true },

  // CHATAR PATAR (VEG)
  { id: "cpv1", name: "Dahi Ke Sholay", price: 295, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv2", name: "Pahadi Kebab", price: 285, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv3", name: "Badami Malai Broccoli", price: 375, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv4", name: "Peshwari Naan Paneer Tikka", price: 355, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv5", name: "Achari Paneer Tikka", price: 345, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "cpv6", name: "Tandoori Soya Chaap", price: 275, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv7", name: "Peshwari Soya Chaap", price: 285, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv8", name: "Tandoori Aloo", price: 225, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv9", name: "Khas Khas Stuffed Pahadi Kebab", price: 325, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv10", name: "Maharaja Veg Platter", price: 475, description: "", category: "Chatar Patar (Veg)", is_veg: true, image_url: "", is_spicy: false },

  // CHATAR PATAR (NON-VEG)
  { id: "cpn1", name: "Tandoori Kukkad (Half)", price: 415, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn2", name: "Tandoori Kukkad (Full)", price: 615, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn3", name: "Afghani Kukkad (Half)", price: 425, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn4", name: "Afghani Kukkad (Full)", price: 635, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn5", name: "Murgh Tikka", price: 415, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn6", name: "Murgh Malai Tikka", price: 425, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn7", name: "Pahadi Murgh Kebab", price: 475, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn8", name: "Amritsari Fish Tikka", price: 495, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn9", name: "Tandoori Prawns", price: 655, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn10", name: "Mutton Boti Masala Platter", price: 675, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn11", name: "Maharaja Non-Veg Platter", price: 695, description: "", category: "Chatar Patar (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },

  // EUROPEAN SAVORIES
  { id: "es1", name: "Cheese Cigar Rolls", price: 385, description: "", category: "European Savories", is_veg: true, image_url: "", is_spicy: false },
  { id: "es2", name: "Falafel Hummus Pita Pockets", price: 375, description: "", category: "European Savories", is_veg: true, image_url: "", is_spicy: false },
  { id: "es3", name: "Cottage Cheese Strips", price: 385, description: "", category: "European Savories", is_veg: true, image_url: "", is_spicy: false },
  { id: "es4", name: "Baked Cheese Nachos", price: 275, description: "", category: "European Savories", is_veg: true, image_url: "", is_spicy: false },
  { id: "es5", name: "Fish Fingers", price: 515, description: "", category: "European Savories", is_veg: false, image_url: "", is_spicy: false },

  // SOUPS
  { id: "sp1", name: "Classic Tomato Basil", price: 185, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp2", name: "Tomato Soup with Croutons", price: 195, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp3", name: "Veg Authentic Manchow", price: 195, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp4", name: "Chicken Authentic Manchow", price: 235, description: "", category: "Soups", is_veg: false, image_url: "", is_spicy: false },
  { id: "sp5", name: "Sweet Corn", price: 195, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp6", name: "Minestrone", price: 245, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp7", name: "Veg Lemon Coriander", price: 195, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp8", name: "Chicken Lemon Coriander", price: 245, description: "", category: "Soups", is_veg: false, image_url: "", is_spicy: false },
  { id: "sp9", name: "Veg Hot & Sour", price: 185, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: true },
  { id: "sp10", name: "Chicken Hot & Sour", price: 235, description: "", category: "Soups", is_veg: false, image_url: "", is_spicy: true },
  { id: "sp11", name: "Satta Chia Bala Romanian", price: 235, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "sp12", name: "Italian Egg Drop Soup", price: 215, description: "", category: "Soups", is_veg: false, image_url: "", is_spicy: false },

  // SALADS
  { id: "sl1", name: "Veg Classic Caesar Salad", price: 325, description: "", category: "Salads", is_veg: true, image_url: "", is_spicy: false },
  { id: "sl2", name: "Chicken Classic Caesar Salad", price: 415, description: "", category: "Salads", is_veg: false, image_url: "", is_spicy: false },
  { id: "sl3", name: "Veg Greek Salad", price: 345, description: "", category: "Salads", is_veg: true, image_url: "", is_spicy: false },
  { id: "sl4", name: "Chicken Greek Salad", price: 455, description: "", category: "Salads", is_veg: false, image_url: "", is_spicy: false },
  { id: "sl5", name: "Jumbo Green Indian Salad", price: 145, description: "", category: "Salads", is_veg: true, image_url: "", is_spicy: false },
  { id: "sl6", name: "Kimchi Salad", price: 215, description: "", category: "Salads", is_veg: true, image_url: "", is_spicy: true },

  // PIZZERIA
  { id: "pz1", name: "Classic Margherita", price: 485, description: "", category: "Pizzeria", is_veg: true, image_url: "", is_spicy: false },
  { id: "pz2", name: "Veggie Paradise", price: 495, description: "", category: "Pizzeria", is_veg: true, image_url: "", is_spicy: false },
  { id: "pz3", name: "Paneer Tikka Pizza", price: 525, description: "", category: "Pizzeria", is_veg: true, image_url: "", is_spicy: false },
  { id: "pz4", name: "Chicken Tikka Pizza", price: 585, description: "", category: "Pizzeria", is_veg: false, image_url: "", is_spicy: false },
  { id: "pz5", name: "Chicken Pepperoni", price: 585, description: "", category: "Pizzeria", is_veg: false, image_url: "", is_spicy: false },
  { id: "pz6", name: "Special Pizza (Veg)", price: 515, description: "", category: "Pizzeria", is_veg: true, image_url: "", is_spicy: false },
  { id: "pz7", name: "Special Pizza (Chicken)", price: 595, description: "", category: "Pizzeria", is_veg: false, image_url: "", is_spicy: false },

  // BURGERS & SANDWICHES
  { id: "bs1", name: "Vegetable Sandwich", price: 195, description: "", category: "Burgers & Sandwiches", is_veg: true, image_url: "", is_spicy: false },
  { id: "bs2", name: "Vegetable Club Sandwich", price: 235, description: "", category: "Burgers & Sandwiches", is_veg: true, image_url: "", is_spicy: false },
  { id: "bs3", name: "Paneer Tikka Sandwich", price: 255, description: "", category: "Burgers & Sandwiches", is_veg: true, image_url: "", is_spicy: false },
  { id: "bs4", name: "Chicken Tikka Sandwich", price: 285, description: "", category: "Burgers & Sandwiches", is_veg: false, image_url: "", is_spicy: false },
  { id: "bs5", name: "Veg Burger", price: 195, description: "", category: "Burgers & Sandwiches", is_veg: true, image_url: "", is_spicy: false },
  { id: "bs6", name: "Chicken Burger", price: 255, description: "", category: "Burgers & Sandwiches", is_veg: false, image_url: "", is_spicy: false },

  // PASTA LA VISTA
  { id: "plv1", name: "Veg Penne Pasta", price: 285, description: "", category: "Pasta", is_veg: true, image_url: "", is_spicy: false },
  { id: "plv2", name: "Chicken Penne Pasta", price: 385, description: "", category: "Pasta", is_veg: false, image_url: "", is_spicy: false },
  { id: "plv3", name: "Veg Pasta Alla Rosa", price: 275, description: "", category: "Pasta", is_veg: true, image_url: "", is_spicy: false },
  { id: "plv4", name: "Chicken Pasta Alla Rosa", price: 375, description: "", category: "Pasta", is_veg: false, image_url: "", is_spicy: false },
  { id: "plv5", name: "Veg Spaghetti Aglio e Olio", price: 295, description: "", category: "Pasta", is_veg: true, image_url: "", is_spicy: false },
  { id: "plv6", name: "Chicken Spaghetti Aglio e Olio", price: 395, description: "", category: "Pasta", is_veg: false, image_url: "", is_spicy: false },

  // NOODLES
  { id: "nd1", name: "Veg Hakka Noodles", price: 195, description: "", category: "Noodles", is_veg: true, image_url: "", is_spicy: false },
  { id: "nd2", name: "Chicken Hakka Noodles", price: 265, description: "", category: "Noodles", is_veg: false, image_url: "", is_spicy: false },
  { id: "nd3", name: "Veg Chilli Garlic Noodles", price: 225, description: "", category: "Noodles", is_veg: true, image_url: "", is_spicy: true },
  { id: "nd4", name: "Chicken Chilli Garlic Noodles", price: 315, description: "", category: "Noodles", is_veg: false, image_url: "", is_spicy: true },
  { id: "nd5", name: "Veg Schezwan Noodles", price: 215, description: "", category: "Noodles", is_veg: true, image_url: "", is_spicy: true },
  { id: "nd6", name: "Chicken Schezwan Noodles", price: 275, description: "", category: "Noodles", is_veg: false, image_url: "", is_spicy: true },

  // CHINESE & THAI MAINS
  { id: "ctm1", name: "Exotic Vegetables in Sauce", price: 395, description: "", category: "Chinese & Thai Mains", is_veg: true, image_url: "", is_spicy: false },
  { id: "ctm2", name: "Classic Chilli Paneer Gravy", price: 335, description: "", category: "Chinese & Thai Mains", is_veg: true, image_url: "", is_spicy: true },
  { id: "ctm3", name: "Veg Fried Rice", price: 215, description: "", category: "Chinese & Thai Mains", is_veg: true, image_url: "", is_spicy: false },
  { id: "ctm4", name: "Chicken Fried Rice", price: 345, description: "", category: "Chinese & Thai Mains", is_veg: false, image_url: "", is_spicy: false },
  { id: "ctm5", name: "Veg Chilli Garlic Fried Rice", price: 225, description: "", category: "Chinese & Thai Mains", is_veg: true, image_url: "", is_spicy: true },
  { id: "ctm6", name: "Chicken Chilli Garlic Fried Rice", price: 355, description: "", category: "Chinese & Thai Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "ctm7", name: "Veg Thai Green Curry + Rice", price: 375, description: "", category: "Chinese & Thai Mains", is_veg: true, image_url: "", is_spicy: false },
  { id: "ctm8", name: "Chicken Thai Green Curry + Rice", price: 495, description: "", category: "Chinese & Thai Mains", is_veg: false, image_url: "", is_spicy: false },
  { id: "ctm9", name: "Veg Thai Red Curry + Rice", price: 370, description: "", category: "Chinese & Thai Mains", is_veg: true, image_url: "", is_spicy: true },
  { id: "ctm10", name: "Chicken Thai Red Curry + Rice", price: 495, description: "", category: "Chinese & Thai Mains", is_veg: false, image_url: "", is_spicy: true },

  // INDIAN MAIN COURSE (VEG)
  { id: "imcv1", name: "Dal Tadka", price: 295, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv2", name: "Dal Maharani Makhani", price: 335, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv3", name: "Dal Bukhara Makhani Masala", price: 345, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv4", name: "Veg Jalfrezi", price: 335, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv5", name: "Veg Kolhapuri", price: 345, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "imcv6", name: "Veg Diwani Handi", price: 375, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv7", name: "Stuffed Punjabi Dum Aloo", price: 335, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv8", name: "Paneer Dhaniya Adraki", price: 395, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv9", name: "Mushroom Do Pyaza", price: 375, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv10", name: "Hara Bhara Malai Kofta", price: 395, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imcv11", name: "Shaan-E-Shahi Paneer", price: 385, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },

  // MORE VEG MAINS
  { id: "mvm1", name: "Kadhai Paneer", price: 385, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "mvm2", name: "Punjabi Paneer Butter Masala", price: 395, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "mvm3", name: "Tawa Chaap Masala", price: 345, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "mvm4", name: "Pahadi Dal Double Tadka Platter", price: 425, description: "", category: "Indian Main Course (Veg)", is_veg: true, image_url: "", is_spicy: false },

  // INDIAN MAIN COURSE (NON-VEG)
  { id: "imcn1", name: "Chicken Curry (Half)", price: 285, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn2", name: "Chicken Curry (Full)", price: 425, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn3", name: "Smoked Butter Chicken (Half)", price: 285, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "imcn4", name: "Smoked Butter Chicken (Full)", price: 495, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "imcn5", name: "Kadhai Chicken (Half)", price: 285, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn6", name: "Kadhai Chicken (Full)", price: 485, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn7", name: "Murgh Tikka Masala (Half)", price: 285, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn8", name: "Murgh Tikka Masala (Full)", price: 495, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn9", name: "Murgh Kali Mirch (Half)", price: 315, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn10", name: "Murgh Kali Mirch (Full)", price: 515, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn11", name: "Murgh Matka (Half)", price: 325, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "imcn12", name: "Murgh Matka (Full)", price: 525, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "imcn13", name: "Murgh Kadhai Peshawari (Half)", price: 515, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn14", name: "Murgh Kadhai Peshawari (Full)", price: 715, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imcn15", name: "Special Chicken (Half)", price: 555, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "imcn16", name: "Special Chicken (Full)", price: 755, description: "", category: "Indian Main Course (Non-Veg)", is_veg: false, image_url: "", is_spicy: false },

  // SPECIAL MAINS
  { id: "sm1", name: "Pahadi Mutton Rogan Josh (Half)", price: 675, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "sm2", name: "Pahadi Mutton Rogan Josh (Full)", price: 1095, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "sm3", name: "Mutton Kadhai Peshawari (Half)", price: 655, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "sm4", name: "Mutton Kadhai Peshawari (Full)", price: 1055, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "sm5", name: "Goan Fish Curry", price: 615, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "sm6", name: "Pahadi Chicken Masala Platter", price: 625, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "sm7", name: "Pahadi Mutton Rogan Josh Platter", price: 715, description: "", category: "Special Mains", is_veg: false, image_url: "", is_spicy: true },

  // CONTINENTAL MAINS
  { id: "cm1", name: "Peri Peri Grilled Chicken", price: 555, description: "", category: "Continental Mains", is_veg: false, image_url: "", is_spicy: true },
  { id: "cm2", name: "Stuffed De Pollo Chicken", price: 575, description: "", category: "Continental Mains", is_veg: false, image_url: "", is_spicy: false },
  { id: "cm3", name: "Grilled Fish Lemon Butter", price: 585, description: "", category: "Continental Mains", is_veg: false, image_url: "", is_spicy: false },
  { id: "cm4", name: "Cocktail Prawns", price: 615, description: "", category: "Continental Mains", is_veg: false, image_url: "", is_spicy: false },

  // SOUTH INDIAN - DOSA
  { id: "sid1", name: "Plain Dosa", price: 150, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid2", name: "Paper Dosa", price: 160, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid3", name: "Masala Dosa", price: 190, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid4", name: "Butter Masala Dosa", price: 210, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid5", name: "Ghee Roast Masala Dosa", price: 230, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid6", name: "Onion Masala Dosa", price: 190, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid7", name: "Paneer Masala Dosa", price: 270, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid8", name: "Cheese Masala Dosa", price: 280, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid9", name: "Mysore Masala Dosa", price: 210, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: true },
  { id: "sid10", name: "Rawa Plain Dosa", price: 190, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid11", name: "Rawa Masala Dosa", price: 230, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid12", name: "Onion Rawa Masala Dosa", price: 240, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid13", name: "Paneer Rawa Masala Dosa", price: 260, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },
  { id: "sid14", name: "Special Dosa", price: 270, description: "", category: "South Indian", is_veg: true, image_url: "", is_spicy: false },

  // FUSION DOSA & UTTAPAM
  { id: "fd1", name: "Spring Roll Cheese Dosa", price: 300, description: "", category: "Fusion Dosa", is_veg: true, image_url: "", is_spicy: false },
  { id: "fd2", name: "Mexican Cheese Dosa", price: 300, description: "", category: "Fusion Dosa", is_veg: true, image_url: "", is_spicy: true },
  { id: "fd3", name: "Schezwan Cheese Dosa", price: 330, description: "", category: "Fusion Dosa", is_veg: true, image_url: "", is_spicy: true },
  { id: "fd4", name: "Chilli Paneer Dosa", price: 360, description: "", category: "Fusion Dosa", is_veg: true, image_url: "", is_spicy: true },
  { id: "fd5", name: "Kadhai Chicken Dosa", price: 420, description: "", category: "Fusion Dosa", is_veg: false, image_url: "", is_spicy: true },
  { id: "fd6", name: "Chilli Chicken Dosa", price: 410, description: "", category: "Fusion Dosa", is_veg: false, image_url: "", is_spicy: true },
  { id: "fd7", name: "Egg Masala Dosa", price: 300, description: "", category: "Fusion Dosa", is_veg: false, image_url: "", is_spicy: false },

  // SOUTH INDIAN - UTTAPAM
  { id: "siu1", name: "Plain Uttapam", price: 150, description: "", category: "Uttapam", is_veg: true, image_url: "", is_spicy: false },
  { id: "siu2", name: "Onion Uttapam", price: 160, description: "", category: "Uttapam", is_veg: true, image_url: "", is_spicy: false },
  { id: "siu3", name: "Tomato Uttapam", price: 160, description: "", category: "Uttapam", is_veg: true, image_url: "", is_spicy: false },
  { id: "siu4", name: "Mix Uttapam", price: 180, description: "", category: "Uttapam", is_veg: true, image_url: "", is_spicy: false },
  { id: "siu5", name: "Special Uttapam", price: 210, description: "", category: "Uttapam", is_veg: true, image_url: "", is_spicy: false },

  // RICE & BIRYANI
  { id: "rb1", name: "Plain Rice", price: 155, description: "", category: "Rice & Biryani", is_veg: true, image_url: "", is_spicy: false },
  { id: "rb2", name: "Jeera Rice", price: 165, description: "", category: "Rice & Biryani", is_veg: true, image_url: "", is_spicy: false },
  { id: "rb3", name: "Subz Biryani", price: 295, description: "", category: "Rice & Biryani", is_veg: true, image_url: "", is_spicy: true },
  { id: "rb4", name: "Murgh Biryani", price: 525, description: "", category: "Rice & Biryani", is_veg: false, image_url: "", is_spicy: true },

  // BREADS
  { id: "b1", name: "Tandoori Roti", price: 25, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b2", name: "Missi Roti", price: 45, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b3", name: "Naan", price: 45, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b4", name: "Parantha", price: 95, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b5", name: "Laccha Parantha", price: 45, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },

  // RAITA
  { id: "r1", name: "Mint Raita", price: 125, description: "", category: "Raita", is_veg: true, image_url: "", is_spicy: false },
  { id: "r2", name: "Boondi Raita", price: 135, description: "", category: "Raita", is_veg: true, image_url: "", is_spicy: false },
  { id: "r3", name: "Mix Raita", price: 145, description: "", category: "Raita", is_veg: true, image_url: "", is_spicy: false },

  // SIDES
  { id: "sd1", name: "French Fries", price: 175, description: "", category: "Sides", is_veg: true, image_url: "", is_spicy: false },
  { id: "sd2", name: "Masala Papad", price: 175, description: "", category: "Sides", is_veg: true, image_url: "", is_spicy: false },
  { id: "sd3", name: "Peri Peri Fries", price: 195, description: "", category: "Sides", is_veg: true, image_url: "", is_spicy: true },
  { id: "sd4", name: "Garlic Bread", price: 215, description: "", category: "Sides", is_veg: true, image_url: "", is_spicy: false },

  // EXTRAS
  { id: "ex1", name: "Assorted Veg Extra", price: 195, description: "", category: "Extras", is_veg: true, image_url: "", is_spicy: false },
  { id: "ex2", name: "Cheese Extra", price: 100, description: "", category: "Extras", is_veg: true, image_url: "", is_spicy: false },
  { id: "ex3", name: "Chicken Extra", price: 215, description: "", category: "Extras", is_veg: false, image_url: "", is_spicy: false },
  { id: "ex4", name: "Prawns Extra", price: 245, description: "", category: "Extras", is_veg: false, image_url: "", is_spicy: false },
  { id: "ex5", name: "Pepperoni Extra", price: 215, description: "", category: "Extras", is_veg: false, image_url: "", is_spicy: false },
  { id: "ex6", name: "Nacho Chips Extra", price: 115, description: "", category: "Extras", is_veg: true, image_url: "", is_spicy: false },

  // DESSERTS
  { id: "ds1", name: "Gulab Jamun", price: 95, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "ds2", name: "Rawa Kesari", price: 145, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "ds3", name: "Brownie with Hot Chocolate", price: 225, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "ds4", name: "Cheesecake", price: 245, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "ds5", name: "Cocoa Tiramisu", price: 225, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "ds6", name: "Fried Ice Cream", price: 145, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },

  // BEVERAGES
  { id: "bv1", name: "Masala Chai", price: 65, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv2", name: "Ginger Lemon Honey Tea", price: 125, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv3", name: "Herbal Green Tea", price: 135, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv4", name: "Lemon Ice Tea", price: 155, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv5", name: "Peach Ice Tea", price: 155, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv6", name: "Fresh Lime Soda/Water", price: 115, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv7", name: "Cold Drink", price: 50, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
  { id: "bv8", name: "Mineral Water", price: 30, description: "", category: "Beverages", is_veg: true, image_url: "", is_spicy: false },
];
