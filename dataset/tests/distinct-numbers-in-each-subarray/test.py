from collections import defaultdict

class Solution:
    def distinctNumbers(self, nums: list[int], k: int) -> list[int]:
        freq = defaultdict(int)
        distinct = 0
        ans = []

        for i in range(k):
            if freq[nums[i]] == 0:
                distinct += 1
            freq[nums[i]] += 1
        ans.append(distinct)

        for i in range(k, len(nums)):
            out_val = nums[i - k]
            freq[out_val] -= 1
            if freq[out_val] == 0:
                distinct -= 1

            in_val = nums[i]
            if freq[in_val] == 0:
                distinct += 1
            freq[in_val] += 1

            ans.append(distinct)

        return ans

def test():
    sol = Solution()
    assert sol.distinctNumbers([1,2,3,2,2,1,3], 3) == [3,2,2,2,3]
    assert sol.distinctNumbers([1,1,1,1,2,3,4], 4) == [1,2,3,4]

if __name__ == '__main__':
    test()
