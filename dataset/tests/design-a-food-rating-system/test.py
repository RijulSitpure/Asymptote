from solution import FoodRatings
fr = FoodRatings(['kimchi', 'miso', 'sushi', 'moussaka', 'ramen', 'bulgogi'], ['korean', 'japanese', 'japanese', 'greek', 'japanese', 'korean'], [9, 12, 8, 15, 14, 7])
assert fr.highestRated('korean') == 'kimchi'
assert fr.highestRated('japanese') == 'ramen'
fr.changeRating('sushi', 16)
assert fr.highestRated('japanese') == 'sushi'
fr.changeRating('ramen', 16)
assert fr.highestRated('japanese') == 'ramen'
print("All tests passed for design-a-food-rating-system!")
