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
  // Soups
  { id: "s1", name: "Chicken Authentic Manchow", price: 235, description: "Soup tempered with Vegetables, Scallions, Noodles And Garlic", category: "Soups", is_veg: false, image_url: "", is_spicy: false },
  { id: "s2", name: "Chicken Hot & Sour", price: 235, description: "", category: "Soups", is_veg: false, image_url: "", is_spicy: true },
  { id: "s3", name: "Italian Egg Drop Soup", price: 235, description: "Soup With Chicken Stock, Egg, Grated Parmesan Cheese and Crushed Pepper", category: "Soups", is_veg: false, image_url: "", is_spicy: false },
  { id: "s4", name: "Kandali Shorba (Nettle Soup)", price: 215, description: "Local Delicacy Made with Fresh Nettle & Herbs", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "s5", name: "Khow Suey", price: 255, description: "Burmese Soup", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "s6", name: "Matar Ka Shorba", price: 215, description: "Creamy Soup Made With Fresh Peas, Herbs and Spices", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "s7", name: "Tomato Dhaniya Shorba", price: 195, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "s8", name: "Veg Authentic Manchow", price: 195, description: "Soup tempered with Vegetables, Scallions, Noodles And Garlic", category: "Soups", is_veg: true, image_url: "", is_spicy: false },
  { id: "s9", name: "Veg Hot & Sour", price: 195, description: "", category: "Soups", is_veg: true, image_url: "", is_spicy: true },

  // Salads
  { id: "sal1", name: "Chicken Classic Caesar Salad", price: 425, description: "Iceberg Lettuce, Oven-roasted Garlic Croutons, Stuffed Queen Olives, Parmesan Shavings, And Caesar Dressing", category: "Salads", is_veg: false, image_url: "", is_spicy: false },
  { id: "sal2", name: "The Jumbo Green Indian Salad", price: 155, description: "Onion, Cucumber, Tomatoes, Green Chilli & Slices of Lemon", category: "Salads", is_veg: true, image_url: "", is_spicy: false },
  { id: "sal3", name: "Veg Classic Caesar Salad", price: 325, description: "Iceberg Lettuce, Oven-roasted Garlic Croutons, Stuffed Queen Olives, Parmesan Shavings, And Caesar Dressing", category: "Salads", is_veg: true, image_url: "", is_spicy: false },

  // Sides
  { id: "side1", name: "Classic French Fries", price: 175, description: "", category: "Sides", is_veg: true, image_url: "", is_spicy: false },
  { id: "side2", name: "Punjabi Masala Papad", price: 175, description: "", category: "Sides", is_veg: true, image_url: "", is_spicy: false },

  // Chatar Patar (veg)
  { id: "cpv1", name: "Dahi Ke Sholey", price: 295, description: "Kebab Prepared with Hung Curd, Creamy on the Inside and Crunchy on the Outside", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv2", name: "Maharaja Tandoori Veg Platter", price: 525, description: "Achari Paneer Tikka, Pahadi Kebab, Tandoori Soya Chaap, Dahi Ke Sholey, Mushroom Galouti Served with a Baby Naan & tangy chutney", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv3", name: "Mushroom Galouti Kebab", price: 415, description: "Our Signature Dish Served with Ulte Tawa ki Roti", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv4", name: "Pahadi Kebab", price: 295, description: "Traditional Garhwali Kebab made with Spinach, Potatoes, and Mint Leaves", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv5", name: "Paneer 3 Swaad", price: 395, description: "Char-Grilled Paneer in 3 Different Flavors", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv6", name: "Paneer Tikka Achaari", price: 395, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "cpv7", name: "Paneer Tikka Classic", price: 395, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv8", name: "Paneer Tikka Peshawari", price: 395, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv9", name: "Tandoori Mushroom Stuffed", price: 415, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv10", name: "Tandoori Soya Chaap Achaari", price: 295, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "cpv11", name: "Tandoori Soya Chaap Classic", price: 295, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "cpv12", name: "Tandoori Soya Chaap Peshawari", price: 295, description: "", category: "Chatar Patar (veg)", is_veg: true, image_url: "", is_spicy: false },

  // Chatar Patar (non-veg)
  { id: "cpn1", name: "Afghani Kukkad", price: 445, description: "Char-Grilled Tender Chicken Marinated Overnight In a Rich and Creamy Marinade with a Blend of Mild Spices", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn2", name: "Amritsari Fish Tikka", price: 595, description: "Tender Sole fish Marinated Overnight in a Classic Tandoori Masala & Grilled", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn3", name: "Chicken Gilafi Seekh Kebab", price: 495, description: "Boneless Chicken Kebab Stuffed with Bell Peppers", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn4", name: "Maharaja Tandoori Non-Veg Platter", price: 725, description: "A combination of Murgh Malai Tikka, Chicken Tikka, Tandoori Kukkad, Afghani Kukkad Served with Baby Naan", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn5", name: "Murgh Malai Tikka", price: 465, description: "Boneless Chicken Marinated in Indian Spices and Curd, then Char-Grilled to Perfection", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn6", name: "Murgh Tikka", price: 445, description: "Boneless Chicken Marinated in Indian Spices and Curd, then Char-Grilled to Perfection", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn7", name: "Mutton Boti Masala Platter", price: 695, description: "Clay Oven-Roasted Tender Boneless Lamb Morsels Marinated with Brown Onion Garlic Ginger Yogurt & Spices", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn8", name: "Mutton Galouti Kebab", price: 695, description: "Minced Mutton with Grounded Spices, Served with Ulte Tawe ki Roti", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "cpn9", name: "Tandoori Kukkad", price: 425, description: "Juicy Chicken Marinated Overnight in Traditional Tandoori Marinade Char-Grilled to Perfection", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "cpn10", name: "Tandoori Prawns", price: 725, description: "Jumbo Prawns Roasted in Tandoori Marinade & Served with Classic Mint Chutney", category: "Chatar Patar (non-veg)", is_veg: false, image_url: "", is_spicy: false },

  // Starters
  { id: "st1", name: "Chilli Mushroom", price: 335, description: "Batter Fried Mushroom Tossed in Chinese Sauces", category: "Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "st2", name: "Chilli Prawns", price: 645, description: "Deep Fried Prawns with Onion and Bell Peppers Tossed in a Spicy Chilli Basil Sauce", category: "Starters", is_veg: false, image_url: "", is_spicy: true },
  { id: "st3", name: "Classic Chilli Paneer", price: 395, description: "All-Time Favorite Classic Recipe of Cottage Cheese with Onion, Garlic and Bell Peppers in Oriental Style", category: "Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "st4", name: "Crispy Honey Chilli Potato", price: 275, description: "Crispy Fried Potatoes Tossed in Sweet and Spicy Honey Chili Sauce", category: "Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "st5", name: "Manchurian In Schezwan Sauce", price: 315, description: "Vegetable Balls Tossed with Onion, Garlic and Bell Peppers in Oriental Style", category: "Starters", is_veg: true, image_url: "", is_spicy: true },
  { id: "st6", name: "Salt & Pepper Chicken", price: 535, description: "Fried Chicken Tossed with Bell Peppers in a Hot Dragon Sauce", category: "Starters", is_veg: false, image_url: "", is_spicy: true },
  { id: "st7", name: "Veg Scallions Spring Roll", price: 235, description: "Scallions and Vegetable Stuffed Spring Roll Served with Hot Chili Garlic Sauce", category: "Starters", is_veg: true, image_url: "", is_spicy: false },
  { id: "st8", name: "Wok Tossed Chilli Chicken", price: 535, description: "Boneless Chicken with Onion, Garlic and Bell Peppers in Oriental Style", category: "Starters", is_veg: false, image_url: "", is_spicy: true },
  { id: "st9", name: "Chinese Platter Chicken", price: 645, description: "", category: "Starters", is_veg: false, image_url: "", is_spicy: false },
  { id: "st10", name: "Chinese Platter Veg", price: 445, description: "", category: "Starters", is_veg: true, image_url: "", is_spicy: false },

  // Noodles
  { id: "n1", name: "Chicken Chilli Garlic Noodles", price: 265, description: "Spicy Stir-fried Noodles With Strong Punch of Garlic", category: "Noodles", is_veg: false, image_url: "", is_spicy: true },
  { id: "n2", name: "Chicken Hakka Noodles", price: 245, description: "Fresh Noodles, White Cabbage, Ginger, Carrot and Spring Onions", category: "Noodles", is_veg: false, image_url: "", is_spicy: false },
  { id: "n3", name: "Veg Chilli Garlic Noodles", price: 205, description: "Spicy Stir-fried Noodles With Strong Punch of Garlic", category: "Noodles", is_veg: true, image_url: "", is_spicy: true },
  { id: "n4", name: "Veg Hakka Noodles", price: 195, description: "Fresh Noodles, White Cabbage, Ginger, Carrot and Spring Onions", category: "Noodles", is_veg: true, image_url: "", is_spicy: false },

  // Dim Sum
  { id: "ds1", name: "Spinach Cheese Corn", price: 225, description: "", category: "Dim Sum", is_veg: true, image_url: "", is_spicy: false },
  { id: "ds2", name: "Veg Steamed", price: 195, description: "", category: "Dim Sum", is_veg: true, image_url: "", is_spicy: false },

  // Chinese Mains & Thai
  { id: "cmt1", name: "Chicken Fried Rice", price: 325, description: "", category: "Chinese Mains & Thai", is_veg: false, image_url: "", is_spicy: false },
  { id: "cmt2", name: "Chicken Thai Green Curry With Jasmine Rice", price: 545, description: "", category: "Chinese Mains & Thai", is_veg: false, image_url: "", is_spicy: false },
  { id: "cmt3", name: "Chicken Thai Red Curry With Jasmine Rice", price: 545, description: "", category: "Chinese Mains & Thai", is_veg: false, image_url: "", is_spicy: true },
  { id: "cmt4", name: "Classic Chilli Paneer Gravy", price: 425, description: "", category: "Chinese Mains & Thai", is_veg: true, image_url: "", is_spicy: true },
  { id: "cmt5", name: "Veg Fried Rice", price: 215, description: "", category: "Chinese Mains & Thai", is_veg: true, image_url: "", is_spicy: false },
  { id: "cmt6", name: "Veg Thai Green Curry With Jasmine Rice", price: 485, description: "", category: "Chinese Mains & Thai", is_veg: true, image_url: "", is_spicy: false },
  { id: "cmt7", name: "Veg Thai Red Curry With Jasmine Rice", price: 485, description: "", category: "Chinese Mains & Thai", is_veg: true, image_url: "", is_spicy: true },

  // International Delicacies
  { id: "id1", name: "Chicken Tikka Sandwich", price: 335, description: "Smoky Chicken Tikka with Mayonnaise Served with French Fries", category: "International Delicacies", is_veg: false, image_url: "", is_spicy: false },
  { id: "id2", name: "Grilled Vegetable Sandwich", price: 195, description: "Served with French Fries", category: "International Delicacies", is_veg: true, image_url: "", is_spicy: false },
  { id: "id3", name: "Paneer Tikka Sandwich", price: 285, description: "Paneer Tikka Filling Enclosed in Bread, Then Grilled and Served with French Fries", category: "International Delicacies", is_veg: true, image_url: "", is_spicy: false },
  { id: "id4", name: "Plain Vegetable Sandwich", price: 195, description: "Served with French Fries", category: "International Delicacies", is_veg: true, image_url: "", is_spicy: false },
  { id: "id5", name: "Veg Burger", price: 195, description: "Juicy Vegetable Pattie, Caramelized Onions & Cheese Served with French Fries", category: "International Delicacies", is_veg: true, image_url: "", is_spicy: false },
  { id: "id6", name: "Vegetable Club Sandwich", price: 225, description: "Layered with Lettuce, Cucumber, Tomatoes and Cheese Served with French Fries", category: "International Delicacies", is_veg: true, image_url: "", is_spicy: false },

  // Pasta
  { id: "p1", name: "Chicken Pasta Alla Rosa", price: 395, description: "Your Favorite Pasta al Dente to Perfection with Creamy Pink Sauce and Served with Garlic Bread", category: "Pasta", is_veg: false, image_url: "", is_spicy: false },
  { id: "p2", name: "Chicken Penne Arrabiata", price: 395, description: "Penne and Exotic Veggies, Garnished with Parsley and Served with Garlic Bread", category: "Pasta", is_veg: false, image_url: "", is_spicy: true },
  { id: "p3", name: "Chicken Penne White Sauce", price: 395, description: "Penne and Exotic Veggies, Garnished with Parsley and Served with Garlic Bread", category: "Pasta", is_veg: false, image_url: "", is_spicy: false },
  { id: "p4", name: "Chicken Spaghetti Aglio E Olio", price: 395, description: "Spaghetti Tossed with extra Virgin Oil, Garlic, Cherry Tomatoes, Dried Red Chilies, Olives, Herbs and Served with Garlic Bread", category: "Pasta", is_veg: false, image_url: "", is_spicy: true },
  { id: "p5", name: "Veg Pasta Alla Rosa", price: 295, description: "Your Favorite Pasta al Dente to Perfection with Creamy Pink Sauce and Served with Garlic Bread", category: "Pasta", is_veg: true, image_url: "", is_spicy: false },
  { id: "p6", name: "Veg Penne Arrabiata", price: 285, description: "Penne and Exotic Veggies, Garnished with Parsley and Served with Garlic Bread", category: "Pasta", is_veg: true, image_url: "", is_spicy: true },
  { id: "p7", name: "Veg Penne White Sauce", price: 295, description: "Penne and Exotic Veggies, Garnished with Parsley and Served with Garlic Bread", category: "Pasta", is_veg: true, image_url: "", is_spicy: false },
  { id: "p8", name: "Veg Spaghetti Aglio E Olio", price: 295, description: "Spaghetti Tossed with extra Virgin Oil, Garlic, Cherry Tomatoes, Dried Red Chilies, Olives, Herbs and Served with Garlic Bread", category: "Pasta", is_veg: true, image_url: "", is_spicy: true },

  // Pizza
  { id: "pz1", name: "Chicken Tikka Pizza", price: 585, description: "Chicken tikka cubes with Pomodoro sauce and mozzarella", category: "Pizza", is_veg: false, image_url: "", is_spicy: false },
  { id: "pz2", name: "Classic Margherita", price: 495, description: "Mozzarella Cheese, Tomato, and Basil", category: "Pizza", is_veg: true, image_url: "", is_spicy: false },
  { id: "pz3", name: "Paneer Tikka Pizza", price: 525, description: "Classic Paneer Tikka Cubes, Bell Peppers, Onion with Pomodoro and Mozzarella", category: "Pizza", is_veg: true, image_url: "", is_spicy: false },
  { id: "pz4", name: "Veggie Paradise", price: 525, description: "Loaded with Farm Fresh Vegetables and Mozzarella", category: "Pizza", is_veg: true, image_url: "", is_spicy: false },

  // From Korea
  { id: "k1", name: "Butter Chicken Bao", price: 525, description: "Fluffy Steamed Bao Buns Filled with Licious Butter Chicken Strips", category: "From Korea", is_veg: false, image_url: "", is_spicy: false },
  { id: "k2", name: "Cottage Cheese Bao", price: 415, description: "Fluffy Steamed Bao Buns Filled with Sauteed Cottage Cheese", category: "From Korea", is_veg: true, image_url: "", is_spicy: false },

  // Raita
  { id: "r1", name: "Boondi Raita", price: 135, description: "Chopped Coriander and Boondi with Freshly Beaten Curd", category: "Raita", is_veg: true, image_url: "", is_spicy: false },
  { id: "r2", name: "Mint Raita", price: 135, description: "Mint Leaves with Freshly Beaten Curd", category: "Raita", is_veg: true, image_url: "", is_spicy: false },
  { id: "r3", name: "Mix Raita", price: 145, description: "Onion, Tomato, Cucumber with Freshly Beaten Curd", category: "Raita", is_veg: true, image_url: "", is_spicy: false },

  // Across The Globe
  { id: "atg1", name: "Cheese Cigar Rolls", price: 385, description: "Cigar Rolls Dipped in a Tangy Sauce Served Tequila Shots", category: "Across The Globe", is_veg: true, image_url: "", is_spicy: false },
  { id: "atg2", name: "Falafel Hummus Pita Pocket", price: 375, description: "Crispy Falafel Stuffed in Toasted Pita with a Thick Layer of Hummus", category: "Across The Globe", is_veg: true, image_url: "", is_spicy: false },
  { id: "atg3", name: "Grilled Fish With Lemon Butter Sauce", price: 695, description: "Pan Grilled Fish with Herbs and Napped with Lemon Butter Sauce", category: "Across The Globe", is_veg: false, image_url: "", is_spicy: false },
  { id: "atg4", name: "Non Veg Sizzler", price: 625, description: "", category: "Across The Globe", is_veg: false, image_url: "", is_spicy: false },
  { id: "atg5", name: "Peri Peri Grilled Chicken", price: 575, description: "Boneless Chicken Breast Marinated in Peri Peri Sauce and Grilled to Perfection", category: "Across The Globe", is_veg: false, image_url: "", is_spicy: true },
  { id: "atg6", name: "Veg Sizzler", price: 425, description: "", category: "Across The Globe", is_veg: true, image_url: "", is_spicy: false },

  // Indian Main Course (veg)
  { id: "imv1", name: "Corn Methi Malai", price: 415, description: "Fresh Corn in a Rich Creamy Gravy", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imv2", name: "Dal Maharani Makhani", price: 345, description: "Traditional Rich Whole Black Lentils Simmered Overnight Over Charcoal and Butter", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imv3", name: "Dal Tadka", price: 295, description: "Lentils Tempered and Simmered with Garlic, Cumin Seed, and Whole Red Chilies", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "imv4", name: "Kadhai Paneer", price: 405, description: "Paneer Cooked with Fresh Groung Kadhai Masala, Onions, Tomatoes, and Bell Peppers", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "imv5", name: "Mushroom Do Pyaza", price: 395, description: "Flavoursome Button Mushrooms Cooked with Lightly Caramelized Onions, Tomatoes, and Ground Spices", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imv6", name: "Paneer Dhaniya Adraki", price: 415, description: "Cottage Cheese in a Semi-tomato White Gravy Rich in Coriander and Ginger", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imv7", name: "Punjabi Paneer Butter Masala", price: 395, description: "Cottage Cheese Cooked in a Sweet and Smooth Creamy Tomato Gravy Garnished with Fenugreek", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imv8", name: "Shaan-E Shahi Paneer", price: 415, description: "Cottage Cheese with Dry Fruits, Khoya & Cashew Nuts Cooked in A Rich and Creamy Curry", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },
  { id: "imv9", name: "Tawa Chaap Masala", price: 245, description: "Tender Chunks of Soya Chaap in an Aromatic Gravy with Whole Spices Cooked on a Tawa", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: true },
  { id: "imv10", name: "Veg Jalfrezi", price: 355, description: "All-Time Favourite mix of Vegetables", category: "Indian Main Course (veg)", is_veg: true, image_url: "", is_spicy: false },

  // Indian Main Course (non-veg)
  { id: "imn1", name: "Chicken Curry", price: 295, description: "Classic Home-Style Chicken Curry Chefs Special", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imn2", name: "Home Style Fish Curry", price: 695, description: "", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imn3", name: "Kadhai Chicken", price: 295, description: "Chicken Cooked with Fresh Ground Kadhai Masala, Onions, Tomatoes, and Bell Peppers", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imn4", name: "Murg Matka", price: 295, description: "Tender Chicken Pieces Marinated Overnight in Spices & Hung Curd, Cooked in Claypot", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: false },
  { id: "imn5", name: "Murgh Kali Mirch", price: 295, description: "Juicy and Succulent Chicken Pieces Cooked in an Aromatic Curry with Freshly Ground Black Pepper", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imn6", name: "Pahadi Mutton Rogan Josh", price: 755, description: "A Rich Stew Cooked in a Flavourful Velvety Aromatic Gravy", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: true },
  { id: "imn7", name: "Smoked Butter Chicken", price: 295, description: "Roasted Chicken Flavoured with Kasoori Methi Made in a Creamy Tomato Sauce", category: "Indian Main Course (non-veg)", is_veg: false, image_url: "", is_spicy: false },

  // Breads
  { id: "b1", name: "Aloo Parantha", price: 95, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b2", name: "Butter Naan", price: 55, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b3", name: "Butter Tandoori Roti", price: 35, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b4", name: "Gralic Naan", price: 65, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b5", name: "Laccha Parantha", price: 45, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b6", name: "Missi Roti", price: 45, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b7", name: "Mix Parantha", price: 135, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b8", name: "Paneer Parantha", price: 145, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b9", name: "Plain Naan", price: 45, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b10", name: "Plain Tandoori Roti", price: 25, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b11", name: "Pyaz Parantha", price: 95, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },
  { id: "b12", name: "Stuffed Naan", price: 120, description: "", category: "Breads", is_veg: true, image_url: "", is_spicy: false },

  // Desserts
  { id: "d1", name: "Gulab Jamun", price: 95, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "d2", name: "Brownie & Hot Chocolate", price: 245, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },
  { id: "d3", name: "Cocoa Tiramisu", price: 225, description: "", category: "Desserts", is_veg: true, image_url: "", is_spicy: false },

  // Rice And Biryani
  { id: "rb1", name: "Murgh Biryani", price: 555, description: "Served with raita & mint chutney", category: "Rice And Biryani", is_veg: false, image_url: "", is_spicy: true },
  { id: "rb2", name: "Plain Rice", price: 155, description: "", category: "Rice And Biryani", is_veg: true, image_url: "", is_spicy: false },
  { id: "rb3", name: "Subz Biryani", price: 325, description: "Served with raita & mint chutney", category: "Rice And Biryani", is_veg: true, image_url: "", is_spicy: true },
  { id: "rb4", name: "Zeera Rice", price: 175, description: "", category: "Rice And Biryani", is_veg: true, image_url: "", is_spicy: false },

  // House Specials
  { id: "hs1", name: "Sharabi Kukkad", price: 995, description: "Rum Marinated Stuffed Whole Grilled Chicken", category: "House Specials", is_veg: false, image_url: "", is_spicy: true },
  { id: "hs2", name: "Sharabi Pomfret", price: 1495, description: "Rum Marinated Stuffed Whole Grilled Fish", category: "House Specials", is_veg: false, image_url: "", is_spicy: true },
  { id: "hs3", name: "Sharabi Raan", price: 1995, description: "Rum Marinated Whole Grilled Baby Raan", category: "House Specials", is_veg: false, image_url: "", is_spicy: true },
];
