# import numpy as np
import re
import pandas as pd

movies_df = pd.read_csv('movies.csv')
mbti_df = pd.read_csv('mbti.csv')
movie_year_regex = re.compile(r'\(\s*\d{4}\s*\)')

# for all movies in mbti, delete the year from the name
mbti_df['movie'] = mbti_df['movie'].str.replace(movie_year_regex, '', regex=True)

# strip whitespace from the movie names
mbti_df['movie'] = mbti_df['movie'].str.strip()
movies_df['name'] = movies_df['name'].str.strip()

# Merge the datasets
merged_df = pd.merge(mbti_df, movies_df, how='left', left_on='movie', right_on='name')

# Identify movies that didn't find a match
unmatched_movies = merged_df[merged_df['name'].isnull()]['movie'].unique()

# Drop duplicate value ['mbti', 'enneagram', 'role', 'movie', 'year']
merged_df = merged_df.drop_duplicates(subset=['mbti', 'enneagram', 'role', 'movie', 'year'])

print(len(merged_df))

# remove the movies that didn't find a match
merged_df = merged_df[merged_df['name'].notnull()]
merged_df = merged_df.drop(columns=['name'])

print(len(merged_df))
print(merged_df.head(10))

merged_df.to_csv('new_movie_1.csv', index=False)
print("finished")