from collections import Counter

class Solution:
    def shareCandies(self, candies: list[int], k: int) -> int:
        freq = Counter(candies)
        n = len(candies)

        for i in range(k):
            freq[candies[i]] -= 1
            if freq[candies[i]] == 0:
                del freq[candies[i]]

        max_unique = len(freq)

        for i in range(k, n):
            # Outgoing from window (restored to user)
            left_candy = candies[i - k]
            freq[left_candy] += 1

            # Incoming to window (given away)
            right_candy = candies[i]
            freq[right_candy] -= 1
            if freq[right_candy] == 0:
                del freq[right_candy]

            max_unique = max(max_unique, len(freq))

        return max_unique
