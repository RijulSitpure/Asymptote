import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'guess-the-word.json')

class MasterMock:
    def __init__(self, secret):
        self.secret = secret
        self.guesses = 0
    def guess(self, word):
        self.guesses += 1
        return sum(c1 == c2 for c1, c2 in zip(self.secret, word))

class Solution:
    def findSecretWord(self, words: list[str], master: 'MasterMock') -> None:
        def matches(w1, w2):
            return sum(c1 == c2 for c1, c2 in zip(w1, w2))

        candidates = list(words)
        for _ in range(30):
            best_word = None
            min_max_bucket = float('inf')
            for w in candidates:
                buckets = [0] * 7
                for other in candidates:
                    if w != other:
                        buckets[matches(w, other)] += 1
                max_b = max(buckets)
                if max_b < min_max_bucket:
                    min_max_bucket = max_b
                    best_word = w
            m = master.guess(best_word)
            if m == 6:
                return
            candidates = [w for w in candidates if matches(w, best_word) == m]

secret = "acckzz"
words = ["acckzz","ccbazz","eiowzz","abcczz"]
mock = MasterMock(secret)
sol = Solution()
sol.findSecretWord(words, mock)
assert mock.guesses <= 10
print("✓ guess-the-word passed")
