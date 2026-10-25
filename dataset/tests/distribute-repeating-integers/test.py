from collections import Counter

class Solution:
    def canDistribute(self, nums: list[int], quantity: list[int]) -> bool:
        counts = sorted(Counter(nums).values(), reverse=True)
        counts = counts[:50]
        quantity.sort(reverse=True)

        def backtrack(q_idx: int) -> bool:
            if q_idx == len(quantity):
                return True
            req = quantity[q_idx]
            for i in range(len(counts)):
                if counts[i] >= req:
                    counts[i] -= req
                    if backtrack(q_idx + 1):
                        return True
                    counts[i] += req
                if counts[i] == 0:
                    break
            return False

        return backtrack(0)

def test():
    sol = Solution()
    assert sol.canDistribute([1,2,3,4], [2]) == False
    assert sol.canDistribute([1,2,3,3], [2]) == True
    assert sol.canDistribute([1,1,2,2], [2,2]) == True

    print("✓ distribute-repeating-integers passed")

if __name__ == '__main__':
    test()
