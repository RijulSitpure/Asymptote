from collections import Counter

class Solution:
    def maxEqualFreq(self, nums: list[int]) -> int:
        count = Counter()
        freq = Counter()
        max_f = 0
        ans = 0
        
        for i, x in enumerate(nums):
            if count[x] > 0:
                freq[count[x]] -= 1
            count[x] += 1
            freq[count[x]] += 1
            max_f = max(max_f, count[x])
            
            if max_f == 1:
                ans = i + 1
            elif freq[max_f] * max_f + 1 == i + 1 and freq[1] == 1:
                ans = i + 1
            elif freq[max_f] == 1 and (freq[max_f - 1] + 1) * (max_f - 1) + 1 == i + 1:
                ans = i + 1
                
        return ans

def test():
    sol = Solution()
    assert sol.maxEqualFreq([2, 2, 1, 1, 5, 3, 3, 5]) == 7, "test 1 failed"
    assert sol.maxEqualFreq([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5]) == 13, "test 2 failed"
    print("✓ maximum-equal-frequency passed")

if __name__ == "__main__":
    test()
