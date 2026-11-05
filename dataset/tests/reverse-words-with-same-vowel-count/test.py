class Solution:
    def reverseWordsWithMaxVowels(self, s: str) -> str:
        words = s.split(' ')
        vowels = set('aeiouAEIOU')
        counts = [sum(1 for ch in w if ch in vowels) for w in words]
        max_v = max(counts) if counts else 0
        
        res = []
        for w, c in zip(words, counts):
            if c == max_v and max_v > 0:
                res.append(w[::-1])
            else:
                res.append(w)
        return ' '.join(res)

def run_tests():
    sol = Solution()
    assert sol.reverseWordsWithMaxVowels("hello world") == "olleh world" # 'hello' has 2 vowels, 'world' has 1
    assert sol.reverseWordsWithMaxVowels("apple banana cherry") == "apple ananab cherry" # 'banana' has 3 vowels
    print("All tests passed for 3775.")

if __name__ == "__main__":
    run_tests()
