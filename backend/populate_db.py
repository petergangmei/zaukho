import os
import sys
import django
import random
import uuid
from datetime import date, timedelta, datetime

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import models
from django.contrib.auth.models import User
from zaukho_api.models import Category, Movie, TVSeries, Season, Episode, Purchase, Rental
from django.utils import timezone

# Clear existing data
def clear_data():
    print("Clearing existing data...")
    Purchase.objects.all().delete()
    Rental.objects.all().delete()
    Episode.objects.all().delete()
    Season.objects.all().delete()
    TVSeries.objects.all().delete()
    Movie.objects.all().delete()
    Category.objects.all().delete()
    print("Data cleared successfully!")

# Create categories
def create_categories():
    print("Creating categories...")
    categories = [
        {"name": "Action", "description": "Action-packed movies and shows"},
        {"name": "Comedy", "description": "Funny and humorous content"},
        {"name": "Drama", "description": "Emotional and serious storylines"},
        {"name": "Sci-Fi", "description": "Science fiction content"},
        {"name": "Horror", "description": "Scary and thrilling content"},
        {"name": "Romance", "description": "Love stories and relationships"},
        {"name": "Documentary", "description": "Real-life stories and events"},
        {"name": "Animation", "description": "Animated movies and shows"},
        {"name": "Thriller", "description": "Suspenseful and exciting content"},
        {"name": "Fantasy", "description": "Magical and mythical stories"}
    ]
    
    created_categories = []
    for category_data in categories:
        category = Category.objects.create(
            name=category_data["name"],
            description=category_data["description"]
        )
        created_categories.append(category)
    
    print(f"Created {len(created_categories)} categories")
    return created_categories

# Create movies
def create_movies(categories):
    print("Creating movies...")
    movies = [
        {
            "title": "The Last Adventure",
            "description": "An epic journey through uncharted territories.",
            "release_date": date(2023, 5, 15),
            "duration": 142,
            "price_buy": 14.99,
            "price_rent": 4.99,
            "is_featured": True
        },
        {
            "title": "Midnight Shadows",
            "description": "A thriller about a detective solving mysterious disappearances.",
            "release_date": date(2022, 10, 8),
            "duration": 128,
            "price_buy": 12.99,
            "price_rent": 3.99,
            "is_featured": False
        },
        {
            "title": "Love in Paris",
            "description": "A romantic story set in the city of love.",
            "release_date": date(2023, 2, 14),
            "duration": 115,
            "price_buy": 9.99,
            "price_rent": 2.99,
            "is_featured": True
        },
        {
            "title": "Galactic Wars",
            "description": "An intergalactic battle for the fate of the universe.",
            "release_date": date(2021, 12, 10),
            "duration": 155,
            "price_buy": 15.99,
            "price_rent": 5.99,
            "is_featured": True
        },
        {
            "title": "The Comedian",
            "description": "A stand-up comedian's journey to fame.",
            "release_date": date(2022, 7, 22),
            "duration": 105,
            "price_buy": 8.99,
            "price_rent": 2.49,
            "is_featured": False
        },
        {
            "title": "Haunted Manor",
            "description": "A family moves into a house with a dark past.",
            "release_date": date(2023, 10, 31),
            "duration": 118,
            "price_buy": 11.99,
            "price_rent": 3.49,
            "is_featured": True
        },
        {
            "title": "Ocean Depths",
            "description": "A documentary exploring the mysteries of the deep sea.",
            "release_date": date(2022, 4, 22),
            "duration": 95,
            "price_buy": 7.99,
            "price_rent": 1.99,
            "is_featured": False
        },
        {
            "title": "The Heist",
            "description": "A group of thieves plan the perfect bank robbery.",
            "release_date": date(2023, 8, 5),
            "duration": 132,
            "price_buy": 13.99,
            "price_rent": 4.49,
            "is_featured": True
        },
        {
            "title": "Animated Dreams",
            "description": "A magical journey through a world of dreams.",
            "release_date": date(2022, 6, 15),
            "duration": 88,
            "price_buy": 9.99,
            "price_rent": 2.99,
            "is_featured": False
        },
        {
            "title": "Historical Heroes",
            "description": "The untold stories of historical figures who changed the world.",
            "release_date": date(2023, 1, 20),
            "duration": 145,
            "price_buy": 12.99,
            "price_rent": 3.99,
            "is_featured": True
        },
        {
            "title": "Cyber Attack",
            "description": "A hacker tries to save the world from a global cyber threat.",
            "release_date": date(2022, 9, 12),
            "duration": 125,
            "price_buy": 10.99,
            "price_rent": 3.49,
            "is_featured": False
        },
        {
            "title": "Mountain Climber",
            "description": "An adventurer attempts to climb the world's most dangerous peaks.",
            "release_date": date(2023, 7, 8),
            "duration": 110,
            "price_buy": 9.99,
            "price_rent": 2.99,
            "is_featured": True
        },
        {
            "title": "The Detective",
            "description": "A brilliant detective solves a series of complex crimes.",
            "release_date": date(2022, 3, 25),
            "duration": 135,
            "price_buy": 11.99,
            "price_rent": 3.99,
            "is_featured": False
        },
        {
            "title": "Alien Contact",
            "description": "Scientists make first contact with an alien civilization.",
            "release_date": date(2023, 4, 15),
            "duration": 140,
            "price_buy": 14.99,
            "price_rent": 4.99,
            "is_featured": True
        },
        {
            "title": "Laugh Out Loud",
            "description": "A comedy about a family vacation gone wrong.",
            "release_date": date(2022, 8, 19),
            "duration": 98,
            "price_buy": 8.99,
            "price_rent": 2.49,
            "is_featured": False
        },
        {
            "title": "Supernatural",
            "description": "A teenager discovers they have supernatural abilities.",
            "release_date": date(2023, 9, 30),
            "duration": 122,
            "price_buy": 12.99,
            "price_rent": 3.99,
            "is_featured": True
        },
        {
            "title": "Wild Safari",
            "description": "A documentary about African wildlife.",
            "release_date": date(2022, 5, 10),
            "duration": 90,
            "price_buy": 7.99,
            "price_rent": 1.99,
            "is_featured": False
        },
        {
            "title": "The Magician",
            "description": "A street magician gets involved in a magical conspiracy.",
            "release_date": date(2023, 3, 12),
            "duration": 130,
            "price_buy": 13.99,
            "price_rent": 4.49,
            "is_featured": True
        },
        {
            "title": "Cartoon Adventure",
            "description": "An animated adventure about talking animals.",
            "release_date": date(2022, 11, 24),
            "duration": 85,
            "price_buy": 9.99,
            "price_rent": 2.99,
            "is_featured": False
        },
        {
            "title": "Ancient Secrets",
            "description": "Archaeologists discover an ancient civilization with advanced technology.",
            "release_date": date(2023, 6, 20),
            "duration": 138,
            "price_buy": 12.99,
            "price_rent": 3.99,
            "is_featured": True
        }
    ]
    
    created_movies = []
    for movie_data in movies:
        movie = Movie.objects.create(
            title=movie_data["title"],
            description=movie_data["description"],
            release_date=movie_data["release_date"],
            duration=movie_data["duration"],
            price_buy=movie_data["price_buy"],
            price_rent=movie_data["price_rent"],
            is_featured=movie_data["is_featured"]
        )
        
        # Assign 2-3 random categories to each movie
        num_categories = random.randint(2, 3)
        selected_categories = random.sample(categories, num_categories)
        for category in selected_categories:
            movie.categories.add(category)
        
        created_movies.append(movie)
    
    print(f"Created {len(created_movies)} movies")
    return created_movies

# Create TV series
def create_tv_series(categories):
    print("Creating TV series...")
    tv_series_list = [
        {
            "title": "Crime Scene",
            "description": "A detective series following complex murder investigations.",
            "release_date": date(2020, 9, 15),
            "is_featured": True
        },
        {
            "title": "Medical Heroes",
            "description": "The daily lives of doctors in a busy hospital.",
            "release_date": date(2019, 3, 22),
            "is_featured": False
        },
        {
            "title": "Space Explorers",
            "description": "A crew of astronauts explores distant planets.",
            "release_date": date(2021, 7, 10),
            "is_featured": True
        },
        {
            "title": "Legal Eagles",
            "description": "Lawyers navigate complex cases and personal drama.",
            "release_date": date(2018, 11, 5),
            "is_featured": False
        },
        {
            "title": "Fantasy Kingdom",
            "description": "A medieval fantasy world with dragons and magic.",
            "release_date": date(2022, 1, 15),
            "is_featured": True
        },
        {
            "title": "Suburban Secrets",
            "description": "The dark secrets of a seemingly perfect suburban neighborhood.",
            "release_date": date(2020, 5, 8),
            "is_featured": False
        },
        {
            "title": "Tech Startup",
            "description": "Young entrepreneurs build a tech company from scratch.",
            "release_date": date(2021, 4, 20),
            "is_featured": True
        },
        {
            "title": "Historical Dynasty",
            "description": "The rise and fall of a powerful family through generations.",
            "release_date": date(2019, 8, 12),
            "is_featured": False
        },
        {
            "title": "Supernatural Investigators",
            "description": "A team investigates paranormal phenomena around the world.",
            "release_date": date(2022, 10, 31),
            "is_featured": True
        },
        {
            "title": "Cooking Masters",
            "description": "Competitive cooking show with professional chefs.",
            "release_date": date(2020, 6, 15),
            "is_featured": False
        },
        {
            "title": "Political Drama",
            "description": "The inner workings of a presidential administration.",
            "release_date": date(2021, 1, 20),
            "is_featured": True
        },
        {
            "title": "High School Days",
            "description": "The lives of teenagers navigating high school challenges.",
            "release_date": date(2019, 9, 5),
            "is_featured": False
        },
        {
            "title": "Zombie Apocalypse",
            "description": "Survivors try to stay alive in a world overrun by zombies.",
            "release_date": date(2022, 3, 13),
            "is_featured": True
        },
        {
            "title": "Comedy Club",
            "description": "A sitcom about friends who run a comedy club.",
            "release_date": date(2020, 11, 22),
            "is_featured": False
        },
        {
            "title": "Spy Games",
            "description": "International espionage and political intrigue.",
            "release_date": date(2021, 8, 7),
            "is_featured": True
        },
        {
            "title": "Ranch Life",
            "description": "A family runs a large ranch in the American West.",
            "release_date": date(2019, 5, 18),
            "is_featured": False
        },
        {
            "title": "Superhero Squad",
            "description": "A team of superheroes protects the city from villains.",
            "release_date": date(2022, 7, 4),
            "is_featured": True
        },
        {
            "title": "Fashion World",
            "description": "The competitive world of high fashion and design.",
            "release_date": date(2020, 2, 28),
            "is_featured": False
        },
        {
            "title": "Time Travelers",
            "description": "Scientists discover a way to travel through time.",
            "release_date": date(2021, 11, 5),
            "is_featured": True
        },
        {
            "title": "Island Survival",
            "description": "Contestants compete to survive on a remote island.",
            "release_date": date(2019, 7, 1),
            "is_featured": False
        }
    ]
    
    created_tv_series = []
    for tv_data in tv_series_list:
        tv_series = TVSeries.objects.create(
            title=tv_data["title"],
            description=tv_data["description"],
            release_date=tv_data["release_date"],
            is_featured=tv_data["is_featured"]
        )
        
        # Assign 2-3 random categories to each TV series
        num_categories = random.randint(2, 3)
        selected_categories = random.sample(categories, num_categories)
        for category in selected_categories:
            tv_series.categories.add(category)
        
        created_tv_series.append(tv_series)
    
    print(f"Created {len(created_tv_series)} TV series")
    return created_tv_series

# Create seasons and episodes
def create_seasons_and_episodes(tv_series_list):
    print("Creating seasons and episodes...")
    created_seasons = []
    
    for tv_series in tv_series_list:
        # Create 1-4 seasons for each TV series
        num_seasons = random.randint(1, 4)
        
        for season_num in range(1, num_seasons + 1):
            # Calculate release date (each season 1 year apart)
            season_release = tv_series.release_date + timedelta(days=365 * (season_num - 1))
            
            season = Season.objects.create(
                tv_series=tv_series,
                season_number=season_num,
                title=f"Season {season_num}",
                release_date=season_release,
                price_buy=random.choice([19.99, 24.99, 29.99])
            )
            created_seasons.append(season)
            
            # Create 8-12 episodes for each season
            num_episodes = random.randint(8, 12)
            
            for episode_num in range(1, num_episodes + 1):
                episode_title = f"Episode {episode_num}"
                
                # Generate more descriptive titles for some episodes
                if episode_num == 1:
                    episode_title = "Pilot"
                elif episode_num == num_episodes:
                    episode_title = "Season Finale"
                
                Episode.objects.create(
                    season=season,
                    episode_number=episode_num,
                    title=episode_title,
                    description=f"Description for {tv_series.title} S{season_num}E{episode_num}",
                    duration=random.randint(40, 60),
                    price_rent=random.choice([1.99, 2.49, 2.99])
                )
    
    total_episodes = Episode.objects.count()
    print(f"Created {len(created_seasons)} seasons and {total_episodes} episodes")
    return created_seasons

# Main function to populate the database
def populate_db():
    clear_data()
    categories = create_categories()
    movies = create_movies(categories)
    tv_series = create_tv_series(categories)
    seasons = create_seasons_and_episodes(tv_series)
    
    print("Database populated successfully!")

if __name__ == "__main__":
    populate_db() 