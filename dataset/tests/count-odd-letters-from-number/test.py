from collections import Counter

class Solution:
    def countOddLetters(self, num: int) -> int:
        words = {
            0: "zero", 1: "one", 2: "two", 3: "three", 4: "four",
            5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
            10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen",
            14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen",
            18: "eighteen", 19: "nineteen", 20: "twenty", 30: "thirty",
            40: "forty", 50: "fifty", 60: "sixty", 70: "seventy",
            80: "eighty", 90: "ninety", 100: "hundred", 1000: "thousand"
        }
        
        def to_words(n: int) -> str:
            if n in words and n < 100:
                return words[n]
            if n < 100:
                return words[n // 10 * 10] + words[n % 10]
            if n < 1000:
                rem = to_words(n % 100) if n % 100 != 0 else ""
                return words[n // 100] + "hundred" + rem
            return ""

        text = to_words(num) if num != 0 else "zero"
        counts = Counter(text)
        return sum(1 for ch, freq in counts.items() if freq % 2 != 0)

def run_tests():
    s = Solution()
    res1 = s.countOddLetters(1) # "one" -> o:1, n:1, e:1 -> 3
    assert res1 == 3, f"Expected 3, got {res1}"
    res2 = s.countOddLetters(15) # "fifteen" -> f:2, i:1, t:1, e:2, n:1 -> odd: i, t, n -> 3
    assert res2 == 3, f"Expected 3, got {res2}"
    print("3581 count-odd-letters-from-number PASSED")

if __name__ == "__main__":
    run_tests()
