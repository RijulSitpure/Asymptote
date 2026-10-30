from solution import Solution

def run_tests():
    s = Solution()
    assert s.addSpaces("LeetcodeHelpsMeLearn", [8, 13, 15]) == "Leetcode Helps Me Learn"
    assert s.addSpaces("icodeinpython", [1, 5, 7, 9]) == "i code in py thon"
    assert s.addSpaces("spacing", [0, 1, 2, 3, 4, 5, 6]) == " s p a c i n g"
    print("All tests passed for adding-spaces-to-a-string!")

if __name__ == '__main__':
    run_tests()
