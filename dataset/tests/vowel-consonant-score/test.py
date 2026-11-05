class Solution:
    def vowelConsonantScore(self, s: str) -> int:
        vowels = set("aeiouAEIOU")
        score = 0
        for ch in s:
            if ch.isalpha():
                if ch in vowels:
                    score += 2
                else:
                    score -= 1
        return score

def run_tests():
    sol = Solution()
    assert sol.vowelConsonantScore("hello") == 1 # e(+2), o(+2), h(-1), l(-1), l(-1) -> 4 - 3 = 1
    assert sol.vowelConsonantScore("aeiou") == 10
    print("All tests passed for 3813.")

if __name__ == "__main__":
    run_tests()
