class Solution:
    def beautySum(self, s: str) -> int:
        n = len(s)
        total_beauty = 0
        for i in range(n):
            freq = [0] * 26
            for j in range(i, n):
                freq[ord(s[j]) - ord('a')] += 1
                mx = max(freq)
                mn = min(f for f in freq if f > 0)
                total_beauty += mx - mn
        return total_beauty

def test():
    sol = Solution()
    assert sol.beautySum("aabcb") == 5
    assert sol.beautySum("aabcbaa") == 17

    print("✓ sum-of-beauty-of-all-substrings passed")

if __name__ == '__main__':
    test()
