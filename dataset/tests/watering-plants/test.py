from solution import Solution

def run_tests():
    s = Solution()
    assert s.wateringPlants([2, 2, 3, 3], 5) == 14
    assert s.wateringPlants([1, 1, 1, 4, 2, 3], 4) == 30
    assert s.wateringPlants([7, 7, 7, 7, 7, 7, 7], 8) == 49
    print("All tests passed for watering-plants!")

if __name__ == "__main__":
    run_tests()
