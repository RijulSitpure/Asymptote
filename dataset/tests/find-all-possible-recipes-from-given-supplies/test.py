from solution import Solution

def run_tests():
    s = Solution()
    assert s.findAllRecipes(["bread"], [["yeast","flour"]], ["yeast","flour","corn"]) == ["bread"]
    assert s.findAllRecipes(["bread","sandwich"], [["yeast","flour"],["bread","meat"]], ["yeast","flour","meat"]) == ["bread","sandwich"]
    assert s.findAllRecipes(["bread","sandwich","burger"], [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], ["yeast","flour","meat"]) == ["bread","sandwich","burger"]
    print("All tests passed for find-all-possible-recipes-from-given-supplies!")

if __name__ == '__main__':
    run_tests()
