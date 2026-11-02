class Solution:
    def longestValidSubstring(self, word: str, forbidden: list[str]) -> int:
        forbidden_set = set(forbidden)
        n = len(word)
        ans = 0
        right_bound = n - 1
        for left in range(n - 1, -1, -1):
            limit = min(left + 10, right_bound + 1)
            for end in range(left, limit):
                if word[left:end + 1] in forbidden_set:
                    right_bound = end - 1
                    break
            if right_bound - left + 1 > ans:
                ans = right_bound - left + 1
        return ans