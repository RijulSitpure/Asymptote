class Solution:
    def convertWordsToDigits(self, s: str) -> str:
        word_map = {
            "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
            "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
        }
        words = s.split()
        return "".join(word_map.get(w, "") for w in words)

def run_tests():
    sol = Solution()
    assert sol.convertWordsToDigits("one two three") == "123"
    assert sol.convertWordsToDigits("zero nine five") == "095"
    assert sol.convertWordsToDigits("four") == "4"
    print("All tests passed for 3758.")

if __name__ == "__main__":
    run_tests()